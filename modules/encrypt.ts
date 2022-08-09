import * as crypto from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import { basename, dirname, resolve, extname } from 'path';

export const encrypt = (input: string, password: string) => {
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(password, salt, 32);

  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  return `${iv.toString('hex')}:${salt.toString('hex')}:${
    cipher.update(input, 'utf8', 'hex') + cipher.final('hex')
  }`;
};

export const decrypt = (
  input: string,
  password: string,
  randomStr: string
): string => {
  const texts = input.split(':');
  const iv = Buffer.from(texts[0], 'hex');
  const salt = Buffer.from(texts[1], 'hex');
  const text = texts[2];

  const key = crypto.scryptSync(password, salt, 32);

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  try {
    return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
  } catch (err) {
    return randomStr;
  }
};

export const encryptFile = (filePath: string, password: string) => {
  const content = readFileSync(filePath, { encoding: 'utf8' });
  const encryptedContent = encrypt(content, password);
  writeFileSync(filePath + '.enc', encryptedContent);
};

export const decryptFile = (filePath: string, password: string) => {
  const randomStr = (crypto.randomInt(256) * crypto.randomInt(256)).toString();
  const content = readFileSync(filePath, { encoding: 'utf8' });
  const decryptedContent = decrypt(content, password, randomStr);
  if (decryptedContent !== randomStr) {
    writeFileSync(
      resolve(dirname(filePath), basename(filePath, extname(filePath))),
      decryptedContent
    );
    return true;
  } else return false;
};
