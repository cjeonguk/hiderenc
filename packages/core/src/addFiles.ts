import tar from 'tar';
import { dirname, relative, resolve } from 'path';
import crypto from 'crypto';
import {
  readFileSync,
  createReadStream,
  createWriteStream,
  unlinkSync,
  lstatSync,
  readdirSync,
} from 'fs';

export default (
  encryptedFilePath: string,
  password: string,
  filePaths: string[]
) => {
  try {
    tar.extract(
      { file: encryptedFilePath, cwd: dirname(encryptedFilePath), sync: true },
      ['.encd']
    );
    const data = readFileSync(
      resolve(dirname(encryptedFilePath), '.encd'),
      'utf8'
    );
    const hashedPw = data.slice(0, 64);
    const iv = Buffer.from(data.slice(64, 96), 'hex');
    const salt = Buffer.from(data.slice(96, 128), 'hex');
    unlinkSync(resolve(dirname(encryptedFilePath), '.encd'));
    if (
      hashedPw ===
      crypto
        .createHash('sha256')
        .update(password + salt)
        .digest('hex')
    ) {
      const key = crypto.pbkdf2Sync(password, salt, 100, 32, 'sha256');
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
      for (let i = 0; i < filePaths.length; i++) {
        const rs = createReadStream(filePaths[i]);
        rs.pipe(crypto.createCipheriv('aes-256-cbc', key, iv)).pipe(
          createWriteStream(filePaths[i] + '.encf')
        );
        rs.on('end', () => {
          tar.update({ file: encryptedFilePath, sync: true, cwd: rootdir }, [
            relative(rootdir, filePaths[i]) + '.encf',
          ]);
          unlinkSync(filePaths[i] + '.encf');
        });
      }
      return 0;
    } else return 1;
  } catch (err) {
    return 2;
  }
};
