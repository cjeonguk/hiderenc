import decFiles from './decFiles';
import path from 'path';
import os from 'os';
import fs from 'fs';

export default (password: string) => {
  return new Promise((resolve) => {
    decFiles(path.join(os.homedir(), '.hider.datas'), password);
    const datas: { whereToUse: string; password: string }[] = [];
    setTimeout(() => {
      const file = fs.readFileSync(
        path.join(os.homedir(), '.hider.tmp'),
        'utf8'
      );
      fs.unlinkSync(path.join(os.homedir(), '.hider.tmp'));
      const lines = file.split('\n');
      for (let i = 0; i < lines.length - 1; i++) {
        datas.push({
          whereToUse: lines[i].split(':')[0],
          password: lines[i].split(':')[1],
        });
      }
      resolve(datas);
    }, 100);
  });
};
