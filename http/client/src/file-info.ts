
import { IFileInfo } from './types';
import { IClient } from './types';
import { IPromise, has } from 'orange';

const props = ['name', 'mime', 'size', 'ctime', 'mtime', 'mode',
    'gid', 'uid', 'meta', 'path', 'is_dir', 'hidden'];

export class FileInfo implements IFileInfo {
    name: string;
    mime: string;
    size: number;
    ctime: Date;
    mtime: Date;
    mode: number;
    gid: string;
    uid: string;
    meta: any;
    path: string;
    is_dir: boolean;
    hidden: boolean;

    get fullPath() {
        return this.path + this.name
    }

    constructor(attr: any = {}) {
        
        props.forEach(m => {
            if (has(attr, m)) {
                this[m] = attr[m];
            }
        });

        if (!(this.ctime instanceof Date)) {
            this.ctime = new Date(<any>this.ctime);
        }

        if (!(this.mtime instanceof Date)) {
            this.mtime = new Date(<any>this.mtime);
        }
    }

}
