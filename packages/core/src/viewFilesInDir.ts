import tar from 'tar';
import { existsSync } from 'fs';

function isArray<T>(value: T | null): value is T {
  if (value === null) return false;
  return true;
}

// folderPath format: 'foo/bar/' or 'foo/' ... (needs to end with '/')
export default (encryptedFilePath: string, folderPath: string) => {
  if (!existsSync(encryptedFilePath)) return [];
  else {
    const filenames: string[] = [];
    tar.t({
      file: encryptedFilePath,
      sync: true,
      onentry: (entry) => filenames.push(entry.path),
    });
    const regex1 = new RegExp(`^${folderPath}(.+)`);
    const regex2 = new RegExp(`^${folderPath}(.+)/`);
    const result: [string, boolean][] = []; // name, isFolder (if true, it is folder)
    for (let i = 0; i < filenames.length; i++) {
      const tmp1 = regex1.exec(filenames[i]);
      if (isArray(tmp1)) {
        const tmp2 = regex2.exec(filenames[i]);
        if (isArray(tmp2)) result.push([tmp2[1], true]);
        else result.push([tmp1[1], false]);
      }
    }
    return result.filter(
      (item, index) =>
        index === result.findIndex((arr) => arr.toString() === item.toString())
    );
  }
};
