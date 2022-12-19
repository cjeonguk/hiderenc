import crypto from 'crypto';
import {
  writeFileSync,
  createReadStream,
  createWriteStream,
  unlinkSync,
  lstatSync,
  readdirSync,
} from 'fs';
import tar from 'tar';
import { dirname, resolve, relative } from 'path';
import { homedir } from 'os';

export default (
  filePaths: string[],
  password: string,
  resultFilePath = resolve(homedir(), 'encrypted.enc')
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
  let rootdir = dirname(filePaths[0]);
  for (let i = 1; i < filePaths.length; i++) {
    let latestSlashIndex = 0;
    for (
      let j = 0;
      j < filePaths[i].length &&
      j < rootdir.length &&
      Array.from(filePaths)[i][j] === Array.from(rootdir)[j];
      j++
    ) {
      if (Array.from(rootdir)[j] === '/') latestSlashIndex = j;
    }
    rootdir = rootdir.slice(0, latestSlashIndex);
  }
  for (let i = 0; i < filePaths.length; i++) {
    if (lstatSync(filePaths[i]).isDirectory()) {
      const filesInDir = readdirSync(filePaths[i], 'utf8');
      for (let j = 0; j < filesInDir.length; j++) {
        filePaths.push(resolve(filePaths[i], filesInDir[j]));
      }
      filePaths.splice(i, 1);
      i--;
    }
  }
  unlinkSync(resolve(dirname(resultFilePath), '.encd'));
  for (let i = 0; i < filePaths.length; i++) {
    const rs = createReadStream(filePaths[i]);
    rs.pipe(crypto.createCipheriv('aes-256-cbc', key, iv)).pipe(
      createWriteStream(filePaths[i] + '.encf')
    );
    rs.on('end', () => {
      tar.update({ file: resultFilePath, sync: true, cwd: rootdir }, [
        relative(rootdir, filePaths[i]) + '.encf',
      ]);
      unlinkSync(filePaths[i] + '.encf');
    });
  }
};
