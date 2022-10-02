import tar from 'tar';
import crypto from 'crypto';
import path from 'path';
import { homedir } from 'os';
import { unlinkSync, readFileSync } from 'fs';

export default (password: string) => {
  tar.extract(
    { file: path.join(homedir(), '.hider.datas'), cwd: homedir(), sync: true },
    ['.encd']
  );
  const data = readFileSync(path.join(homedir(), '.encd'), 'utf8');
  const hashedPw = data.slice(0, 64);
  const salt = Buffer.from(data.slice(96, 128), 'hex');
  if (
    hashedPw ===
    crypto
      .createHash('sha256')
      .update(password + salt)
      .digest('hex')
  ) {
    unlinkSync(path.join(homedir(), '.encd'));
    return true;
  } else {
    unlinkSync(path.join(homedir(), '.encd'));
    return false;
  }
};
