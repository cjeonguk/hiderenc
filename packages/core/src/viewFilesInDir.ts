import tar from 'tar';
import { existsSync } from 'fs';
import { basename, extname } from 'path';

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
    const result: { name: string; isFolder: boolean }[] = [];
    for (let i = 0; i < filenames.length; i++) {
      if (filenames[i] !== '.encd') {
        const tmp1 = regex1.exec(filenames[i]);
        if (isArray(tmp1)) {
          const tmp2 = regex2.exec(filenames[i]);
          if (isArray(tmp2)) result.push({ name: tmp2[1], isFolder: true });
          else
            result.push({
              name: basename(tmp1[1], extname(tmp1[1])),
              isFolder: false,
            });
        }
      }
    }
    return result.filter(
      (item, index) =>
        index ===
        result.findIndex(
          (obj) => obj.name === item.name && obj.isFolder === item.isFolder
        )
    );
  }
};
