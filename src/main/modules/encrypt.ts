import CryptoJS from 'crypto-js';
import crypto from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import { basename, dirname, resolve, extname } from 'path';

export const encrypt = (input: string, password: string) => {
  const ciphertext = CryptoJS.AES.encrypt(input, password).toString();
  return ciphertext;
};

export const decrypt = (
  input: string,
  password: string,
  randomStr: string
): string => {
  try {
    const deciphertext = CryptoJS.AES.decrypt(input, password).toString(
      CryptoJS.enc.Utf8
    );
    return deciphertext;
  } catch (err) {
    return randomStr;
  }
};

export const encryptFile = (filePath: string, password: string) => {
  const content = readFileSync(filePath, 'base64');
  const encryptedContent = encrypt(content, password);
  writeFileSync(filePath + '.enc', encryptedContent, 'base64');
};

export const decryptFile = (filePath: string, password: string) => {
  const randomStr = (crypto.randomInt(256) * crypto.randomInt(256)).toString();
  const content = readFileSync(filePath, 'base64');
  const decryptedContent = decrypt(content, password, randomStr);
  if (decryptedContent !== randomStr) {
    writeFileSync(
      resolve(dirname(filePath), basename(filePath, extname(filePath))),
      decryptedContent,
      'base64'
    );
    return true;
  } else return false;
};
