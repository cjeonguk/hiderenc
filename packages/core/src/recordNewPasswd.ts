import fs from 'fs';
import path from 'path';
import os from 'os';
import encFiles from './encFiles';
import decFiles from './decFiles';

export default (whereToUse: string, newPassword: string, password: string) => {
  decFiles(path.join(os.homedir(), '.hider.datas'), password);
  setTimeout(() => {
    fs.appendFileSync(
      path.join(os.homedir(), '.hider.tmp'),
      `${whereToUse}:${newPassword}\n`
    );
    encFiles(
      [path.join(os.homedir(), '.hider.tmp')],
      password,
      path.join(os.homedir(), '.hider.datas')
    );
    setTimeout(() => fs.unlinkSync(path.join(os.homedir(), '.hider.tmp')), 100);
  }, 100);
};
