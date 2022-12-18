import fs from 'fs';
import path from 'path';
import os from 'os';
import encFiles from './encFiles';
import decFiles from './decFiles';

export default (whereToUse: string, password: string) => {
  return new Promise((resolve) => {
    decFiles(path.join(os.homedir(), '.hider.datas'), password);
    setTimeout(() => {
      if (fs.existsSync(path.join(os.homedir(), '.hider.tmp'))) {
        const data = fs.readFileSync(
          path.join(os.homedir(), '.hider.tmp'),
          'utf8'
        );
        const dataList = data.split('\n');
        const dataList2: string[] = [];
        let found = false;
        for (let i = 0; i < dataList.length - 1; i++) {
          if (dataList[i].split(':')[0] === whereToUse) {
            found = true;
          } else dataList2.push(dataList[i]);
        }
        dataList2.push('');
        fs.writeFileSync(
          path.join(os.homedir(), '.hider.tmp'),
          dataList2.join('\n'),
          'utf8'
        );
        encFiles(
          [path.join(os.homedir(), '.hider.tmp')],
          password,
          path.join(os.homedir(), '.hider.datas')
        );
        setTimeout(
          () => fs.unlinkSync(path.join(os.homedir(), '.hider.tmp')),
          100
        );
        resolve(found);
      } else resolve(false);
    }, 100);
  });
};
