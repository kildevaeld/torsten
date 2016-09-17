import { IFileInfo } from './types';
import { IClient } from './types';
import { IPromise } from 'orange';
export declare class FileInfo implements IFileInfo {
    private _client;
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
    fullPath(): string;
    url(): void;
    constructor(_client: IClient, attr?: any);
    open(): IPromise<Blob>;
}
