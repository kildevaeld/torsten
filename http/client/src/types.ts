import {IPromise} from 'orange';
import {HttpMethod} from 'orange.request';

export interface TorstenResponse {
    message: string;
    data?: any;
}

export interface IClient {
    endpoint: string;
    create(path:string, data:any, options:CreateOptions): IPromise<IFileInfo>;
    open(path: string, options:OpenOptions): IPromise<Blob>;
    stat(path:string, options?:GetOptions): IPromise<IFileInfo>;
    list(path:string, options?:ListOptions): IPromise<IFileInfo[]>;
    remove(path: string, options?: RemoveOptions): IPromise<TorstenResponse>
}

export interface Request {
    mime?: string;
    headers?: any
    params?: any
    data?: any
    size?: number;
    progress?: (e: ProgressEvent) => void;
}

export interface Requester {
    request(method:HttpMethod, url:string, req:Request, data:any): IPromise<any>
    upload(url:string, req:Request): Promise<any>
}

export interface IFileInfo {
    name: string;
    mime: string;
    size: number;
    ctime: Date;
    mtime: Date;
    mode: number;
    gid: string;
    uid: string;
    meta: any;
}

export interface CreateOptions {
    mime?: string;
    size?: number;
    progress?: (e:ProgressEvent) => void
}

export interface GetOptions {
    progress?: (e:ProgressEvent) => void
}

export interface OpenOptions extends GetOptions {
    stream?:boolean
    thumbnail?:boolean;
}

export interface ListOptions {
    page?:number;
    limit?:number;
    progress?: (e:ProgressEvent) => void
    raw?: boolean;
}

export interface RemoveOptions {}

export interface TorstenClientOptions {
    endpoint: string; 
}
