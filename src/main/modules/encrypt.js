"use strict";
exports.__esModule = true;
exports.decryptFile = exports.encryptFile = exports.decrypt = exports.encrypt = void 0;
var CryptoJS = require("crypto-js");
var crypto = require("crypto");
var fs_1 = require("fs");
var path_1 = require("path");
var encrypt = function (input, password) {
    var ciphertext = CryptoJS.AES.encrypt(input, password).toString();
    return ciphertext;
};
exports.encrypt = encrypt;
var decrypt = function (input, password, randomStr) {
    try {
        var deciphertext = CryptoJS.AES.decrypt(input, password).toString(CryptoJS.enc.Utf8);
        return deciphertext;
    }
    catch (err) {
        return randomStr;
    }
};
exports.decrypt = decrypt;
var encryptFile = function (filePath, password) {
    var content = (0, fs_1.readFileSync)(filePath, 'base64');
    var encryptedContent = (0, exports.encrypt)(content, password);
    (0, fs_1.writeFileSync)(filePath + '.enc', encryptedContent, 'base64');
};
exports.encryptFile = encryptFile;
var decryptFile = function (filePath, password) {
    var randomStr = (crypto.randomInt(256) * crypto.randomInt(256)).toString();
    var content = (0, fs_1.readFileSync)(filePath, 'base64');
    var decryptedContent = (0, exports.decrypt)(content, password, randomStr);
    if (decryptedContent !== randomStr) {
        (0, fs_1.writeFileSync)((0, path_1.resolve)((0, path_1.dirname)(filePath), (0, path_1.basename)(filePath, (0, path_1.extname)(filePath))), decryptedContent, 'base64');
        return true;
    }
    else
        return false;
};
exports.decryptFile = decryptFile;
