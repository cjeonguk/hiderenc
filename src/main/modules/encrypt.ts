import crypto from 'crypto';
import {
  readFileSync,
  writeFileSync,
  createReadStream,
  createWriteStream,
  unlinkSync,
} from 'fs';
import tar from 'tar';
import { basename, dirname, resolve, extname } from 'path';

export const encFiles = (
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

export const decFiles = (filePath: string, password: string) => {
  const fileNames: string[] = [];
  tar.list({
    file: filePath,
    onentry: (entry) => fileNames.push(entry.path.toString()),
    sync: true,
  });
  tar.extract(
    {
      file: filePath,
      cwd: dirname(filePath),
      sync: true,
    },
    ['.encd']
  );
  const data = readFileSync(resolve(dirname(filePath), '.encd'), 'utf8');
  const hashedPw = data.slice(0, 64);
  const iv = Buffer.from(data.slice(64, 96), 'hex');
  const salt = Buffer.from(data.slice(96, 128), 'hex');
  if (
    hashedPw ===
    crypto
      .createHash('sha256')
      .update(password + salt)
      .digest('hex')
  ) {
    const key = crypto.pbkdf2Sync(password, salt, 100, 32, 'sha256');
    tar.extract({ file: filePath, cwd: dirname(filePath), sync: true });
    unlinkSync(resolve(dirname(filePath), '.encd'));
    for (let i = 0; i < fileNames.length; i++) {
      if (fileNames[i] !== '.encd') {
        const rs = createReadStream(resolve(dirname(filePath), fileNames[i]));
        rs.pipe(crypto.createDecipheriv('aes-256-cbc', key, iv)).pipe(
          createWriteStream(
            resolve(
              dirname(filePath),
              basename(fileNames[i], extname(fileNames[i]))
            )
          )
        );
        rs.on('end', () => {
          unlinkSync(resolve(dirname(filePath), fileNames[i]));
        });
      }
    }
    return true;
  } else {
    unlinkSync(resolve(dirname(filePath), '.encd'));
    return false;
  }
};
