import crypto from 'crypto';
import {
  writeFileSync,
  createReadStream,
  createWriteStream,
  unlinkSync,
} from 'fs';
import tar from 'tar';
import { basename, dirname, resolve } from 'path';

export default (
  filePaths: string[],
  password: string,
  resultFilePath = 'encrypted.enc'
) => {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(16);
  const key = crypto.pbkdf2Sync(password, salt, 100, 32, 'sha256');
  const hashedPw = crypto
    .createHash('sha256')
    .update(password + salt)
    .digest('hex');
  writeFileSync(
    resolve(dirname(resultFilePath), '.encd'),
    `${hashedPw}${iv.toString('hex')}${salt.toString('hex')}`,
    'utf8'
  );
  tar.create(
    { file: resultFilePath, sync: true, cwd: dirname(resultFilePath) },
    ['.encd']
  );
  unlinkSync(resolve(dirname(resultFilePath), '.encd'));
  for (let i = 0; i < filePaths.length; i++) {
    const rs = createReadStream(filePaths[i]);
    rs.pipe(crypto.createCipheriv('aes-256-cbc', key, iv)).pipe(
      createWriteStream(filePaths[i] + '.encf')
    );
    rs.on('end', () => {
      tar.update(
        { file: resultFilePath, sync: true, cwd: dirname(filePaths[i]) },
        [basename(filePaths[i]) + '.encf']
      );
      unlinkSync(filePaths[i] + '.encf');
    });
  }
};
