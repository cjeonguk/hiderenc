import CryptoJS from 'crypto-js';
import crypto from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import { basename, dirname, resolve, extname } from 'path';

export const encrypt = (input: string, password: string) => {
  const iv = CryptoJS.lib.WordArray.random(16);
  const salt = CryptoJS.lib.WordArray.random(16);
  const key = CryptoJS.PBKDF2(password, salt, { keySize: 32 });
  const ciphertext = CryptoJS.AES.encrypt(input, key, {
    iv: iv,
  }).toString();
  return `${ciphertext}:${iv.toString()}:${salt.toString()}`;
};

// TODO: Split input into ciphertext, iv, salt and deal with them saparately
// Also see Encryption Result about iv and salt
export const decrypt = (
  input: string,
  password: string,
  randomStr: string
): string => {
  try {
    const texts = input.split(':');
    const ciphertext = texts[0];
    const iv = CryptoJS.enc.Hex.parse(texts[1]);
    const salt = CryptoJS.enc.Hex.parse(texts[2]);
    const key = CryptoJS.PBKDF2(password, salt, { keySize: 32 });
    const deciphertext = CryptoJS.AES.decrypt(ciphertext, key, {
      iv: iv,
    }).toString(CryptoJS.enc.Utf8);
    return deciphertext;
  } catch (err) {
    return randomStr;
  }
};

export const encryptFile = (filePath: string, password: string) => {
  const content = readFileSync(filePath, 'base64');
  const encryptedContent = encrypt(content, password);
  writeFileSync(filePath + '.enc', encryptedContent, 'utf8');
};

export const decryptFile = (filePath: string, password: string) => {
  const randomStr = (crypto.randomInt(256) * crypto.randomInt(256)).toString();
  const content = readFileSync(filePath, 'utf8');
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
