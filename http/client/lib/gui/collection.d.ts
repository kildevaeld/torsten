import { Collection, Model, CollectionOptions, CollectionFetchOptions } from 'collection';
import { IClient, IFileInfo, OpenOptions, CreateOptions } from '../types';
import { IPromise } from 'orange';
export interface FileInfoModelOptions {
    client: IClient;
}
export declare class FileInfoModel extends Model {
    _client: IClient;
    constructor(attr: any, options: FileInfoModelOptions);
    fullPath: any;
    open(o?: OpenOptions): IPromise<Blob>;
}
export interface FileCollectionOptions extends CollectionOptions<FileInfoModel> {
    path: string;
    client: IClient;
    showHidden?: boolean;
    showDirectories?: boolean;
}
export declare class FileCollection extends Collection<FileInfoModel> {
    protected __classType: string;
    Model: typeof FileInfoModel;
    private _path;
    private _client;
    path: string;
    constructor(models: IFileInfo[] | FileInfoModel[], options: FileCollectionOptions);
    fetch(options?: CollectionFetchOptions): IPromise<FileInfoModel[]>;
    upload(name: string, data: any, options?: CreateOptions): IPromise<FileInfoModel>;
    protected _prepareModel(value: any): FileInfoModel;
}
