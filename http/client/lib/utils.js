"use strict";
const orange_1 = require('orange');
class ReadableStream {
}
exports.ReadableStream = ReadableStream;
exports.isNode = !(new Function("try {return this===window;}catch(e){ return false;}"))();
var orange_2 = require('orange');
exports.isObject = orange_2.isObject;
exports.isString = orange_2.isString;
exports.isFunction = orange_2.isFunction;
function isBuffer(a) {
    if (exports.isNode)
        Buffer.isBuffer(a);
    return false;
}
exports.isBuffer = isBuffer;
function isFormData(a) {
    if (exports.isNode)
        return false;
    return a instanceof FormData;
}
exports.isFormData = isFormData;
function isReadableStream(a) {
    if (typeof a.read === 'function' && a.pipe === 'function') {
        return true;
    }
    return false;
}
exports.isReadableStream = isReadableStream;
function isFile(a) {
    if (exports.isNode)
        return false;
    if (a instanceof File)
        return true;
    return false;
}
exports.isFile = isFile;
function fileReaderReady(reader) {
    return new orange_1.Promise(function (resolve, reject) {
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function () {
            reject(reader.error);
        };
    });
}
exports.fileReaderReady = fileReaderReady;
function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    return fileReaderReady(reader);
}
exports.readBlobAsArrayBuffer = readBlobAsArrayBuffer;
function readBlobAsText(blob) {
    var reader = new FileReader();
    reader.readAsText(blob);
    return fileReaderReady(reader);
}
exports.readBlobAsText = readBlobAsText;
function readBlobAsDataURL(blob) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    return fileReaderReady(reader);
}
exports.readBlobAsDataURL = readBlobAsDataURL;
var path;
(function (path_1) {
    path_1.DELIMITER = "/";
    function join(...parts) {
        let out = [];
        for (let i = 0, ii = parts.length; i < ii; i++) {
            var s = 0, e = parts[i].length;
            if (parts[i] === path_1.DELIMITER || parts[i] === '')
                continue;
            if (parts[i][0] === path_1.DELIMITER)
                s = 1;
            if (parts[i][e - 1] === path_1.DELIMITER)
                e--;
            out.push(parts[i].substring(s, e));
        }
        return path_1.DELIMITER + out.join(path_1.DELIMITER);
    }
    path_1.join = join;
    function base(path) {
        if (!path)
            return "";
        let split = path.split(path_1.DELIMITER);
        return split[split.length - 1];
    }
    path_1.base = base;
    function dir(path) {
        if (!path)
            return "";
        let split = path.split(path_1.DELIMITER);
        split.pop();
        return join(...split);
    }
    path_1.dir = dir;
})(path = exports.path || (exports.path = {}));
