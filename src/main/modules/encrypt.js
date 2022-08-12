"use strict";
exports.__esModule = true;
exports.decryptFile = exports.encryptFile = exports.decrypt = exports.encrypt = void 0;
var crypto = require("crypto");
var fs_1 = require("fs");
var path_1 = require("path");
var encrypt = function (input, password) {
    var salt = crypto.randomBytes(16);
    var key = crypto.scryptSync(password, salt, 32);
    var iv = crypto.randomBytes(16);
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    return "".concat(iv.toString('hex'), ":").concat(salt.toString('hex'), ":").concat(cipher.update(input, 'utf8', 'hex') + cipher.final('hex'));
};
exports.encrypt = encrypt;
var decrypt = function (input, password, randomStr) {
    var texts = input.split(':');
    var iv = Buffer.from(texts[0], 'hex');
    var salt = Buffer.from(texts[1], 'hex');
    var text = texts[2];
    var key = crypto.scryptSync(password, salt, 32);
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    try {
        return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
    }
    catch (err) {
        return randomStr;
    }
};
exports.decrypt = decrypt;
var encryptFile = function (filePath, password) {
    var content = (0, fs_1.readFileSync)(filePath, { encoding: 'utf8' });
    var encryptedContent = (0, exports.encrypt)(content, password);
    (0, fs_1.writeFileSync)(filePath + '.enc', encryptedContent);
};
exports.encryptFile = encryptFile;
var decryptFile = function (filePath, password) {
    var randomStr = (crypto.randomInt(256) * crypto.randomInt(256)).toString();
    var content = (0, fs_1.readFileSync)(filePath, { encoding: 'utf8' });
    var decryptedContent = (0, exports.decrypt)(content, password, randomStr);
    if (decryptedContent !== randomStr) {
        (0, fs_1.writeFileSync)((0, path_1.resolve)((0, path_1.dirname)(filePath), (0, path_1.basename)(filePath, (0, path_1.extname)(filePath))), decryptedContent);
        return true;
    }
    else
        return false;
};
exports.decryptFile = decryptFile;
