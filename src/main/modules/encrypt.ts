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
  const hmac = CryptoJS.HmacSHA256(
    ciphertext,
    CryptoJS.SHA256(password)
  ).toString();
  return hmac + iv.toString() + salt.toString() + ciphertext;
};

// TODO: Split input into ciphertext, iv, salt and deal with them saparately
// Also see Encryption Result about iv and salt
export const decrypt = (
  input: string,
  password: string,
  randomStr: string
): string => {
  const transithmac = input.substring(0, 64);
  const iv = CryptoJS.enc.Hex.parse(input.substring(64, 96));
  const salt = CryptoJS.enc.Hex.parse(input.substring(96, 128));
  const ciphertext = input.substring(128);
  const decryptedhmac = CryptoJS.HmacSHA256(
    ciphertext,
    CryptoJS.SHA256(password)
  ).toString();
  if (transithmac !== decryptedhmac) return randomStr;
  const key = CryptoJS.PBKDF2(password, salt, { keySize: 32 });
  const deciphertext = CryptoJS.AES.decrypt(ciphertext, key, {
    iv: iv,
  }).toString(CryptoJS.enc.Utf8);
  return deciphertext;
};

export const encryptFile = (filePath: string, password: string) => {
  try {
    const content = readFileSync(filePath, 'base64');
    const encryptedContent = encrypt(content, password);
    writeFileSync(filePath + '.enc', encryptedContent, 'utf8');
    return '';
  } catch (err) {
    return 'Maybe this error occured because the file you choose is bigger than limit (2GB)';
  }
};

export const decryptFile = (filePath: string, password: string) => {
  try {
    const randomStr = (
      crypto.randomInt(256) * crypto.randomInt(256)
    ).toString();
    const content = readFileSync(filePath, 'utf8');
    const decryptedContent = decrypt(content, password, randomStr);
    if (decryptedContent !== randomStr) {
      writeFileSync(
        resolve(dirname(filePath), basename(filePath, extname(filePath))),
        decryptedContent,
        'base64'
      );
      return '';
    } else
      return 'Maybe this error occured because the password you entered is wrong.';
  } catch (err) {
    return 'Maybe this error occured because the file you choose is bigger than limit (2GB)';
  }
};
