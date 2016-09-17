"use strict";
const orange_1 = require('orange');
const props = ['name', 'mime', 'size', 'ctime', 'mtime', 'mode',
    'gid', 'uid', 'meta', 'path', 'is_dir', 'hidden'];
class FileInfo {
    constructor(_client, attr = {}) {
        this._client = _client;
        props.forEach(m => {
            if (orange_1.has(attr, m)) {
                this[m] = attr[m];
            }
        });
        if (!(this.ctime instanceof Date)) {
            this.ctime = new Date(this.ctime);
        }
        if (!(this.mtime instanceof Date)) {
            this.mtime = new Date(this.mtime);
        }
    }
    fullPath() {
        return this.path + this.name;
    }
    url() {
    }
    open() {
        return this._client.open(this.fullPath(), {});
    }
}
exports.FileInfo = FileInfo;
