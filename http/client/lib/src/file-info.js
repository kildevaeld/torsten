"use strict";
var orange_1 = require('orange');
var props = ['name', 'mime', 'size', 'ctime', 'mtime', 'mode',
    'gid', 'uid', 'meta', 'path', 'is_dir', 'hidden'];
var FileInfo = (function () {
    function FileInfo(_client, attr) {
        var _this = this;
        if (attr === void 0) { attr = {}; }
        this._client = _client;
        props.forEach(function (m) {
            if (orange_1.has(attr, m)) {
                _this[m] = attr[m];
            }
        });
        if (!(this.ctime instanceof Date)) {
            this.ctime = new Date(this.ctime);
        }
        if (!(this.mtime instanceof Date)) {
            this.mtime = new Date(this.mtime);
        }
    }
    FileInfo.prototype.fullPath = function () {
        return this.path + this.name;
    };
    FileInfo.prototype.url = function () {
    };
    FileInfo.prototype.open = function () {
        return this._client.open(this.fullPath(), {});
    };
    return FileInfo;
}());
exports.FileInfo = FileInfo;
