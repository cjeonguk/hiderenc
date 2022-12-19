import { basename, dirname, resolve, extname } from 'path';
import crypto from 'crypto';
import tar from 'tar';
import {
  readFileSync,
  createReadStream,
  createWriteStream,
  unlinkSync,
  mkdirSync,
} from 'fs';

export default (
  filePath: string,
  password: string,
  outputPath = dirname(filePath)
) => {
  try {
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
          if (dirname(fileNames[i]) !== '.')
            mkdirSync(resolve(outputPath, dirname(fileNames[i])), {
              recursive: true,
            });
          const rs = createReadStream(resolve(dirname(filePath), fileNames[i]));
          rs.pipe(crypto.createDecipheriv('aes-256-cbc', key, iv)).pipe(
            createWriteStream(
              resolve(
                outputPath,
                dirname(fileNames[i]),
                basename(fileNames[i], extname(fileNames[i]))
              )
            )
          );
          rs.on('end', () => {
            unlinkSync(resolve(dirname(filePath), fileNames[i]));
          });
        }
      }
      return 0;
    } else {
      unlinkSync(resolve(dirname(filePath), '.encd'));
      return 1;
    }
  } catch (err) {
    console.log(err);
    return 2;
  }
};
