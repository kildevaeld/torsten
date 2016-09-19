import { Collection, Model, CollectionOptions, CollectionFetchOptions, IModel } from 'collection';
import { IClient, IFileInfo, OpenOptions, CreateOptions } from '../types';
import { IPromise } from 'orange';
export interface QueryParameters {
    page: string;
    limit: string;
}
export interface State {
    first: number;
    last: number;
    current: number;
    size: number;
}
export interface FileInfoModelOptions {
    client: IClient;
}
export declare class FileInfoModel extends Model {
    _client: IClient;
    idAttribute: string;
    constructor(attr: any, options: FileInfoModelOptions);
    fullPath: any;
    url: string;
    open(o?: OpenOptions): IPromise<Blob>;
}
export interface FileCollectionFetchOptions extends CollectionFetchOptions {
    page?: number;
}
export interface FileCollectionOptions<T extends IModel> extends CollectionOptions<T> {
    path: string;
    client: IClient;
    showHidden?: boolean;
    showDirectories?: boolean;
}
export interface GetPageOptions extends FileCollectionFetchOptions {
    page?: number;
}
export declare abstract class RestCollection<T extends IModel> extends Collection<T> {
    protected state: State;
    queryParams: QueryParameters;
    protected _link: {
        [key: number]: string;
    };
    constructor(models: any, options: FileCollectionOptions<T>);
    hasNext(): boolean;
    hasPrevious(): boolean;
    hasPage(page: number): boolean;
    getPreviousPage(options?: GetPageOptions): IPromise<any>;
    getNextPage(options?: GetPageOptions): IPromise<any>;
    getPage(options?: GetPageOptions): IPromise<any>;
    abstract fetch(options?: CollectionFetchOptions): IPromise<FileInfoModel[]>;
}
export declare class FileCollection extends RestCollection<FileInfoModel> {
    protected __classType: string;
    Model: typeof FileInfoModel;
    private _path;
    private _client;
    private _fetch;
    path: string;
    constructor(models: IFileInfo[] | FileInfoModel[], options: FileCollectionOptions<FileInfoModel>);
    fetch(options?: FileCollectionFetchOptions): IPromise<FileInfoModel[]>;
    upload(name: string, data: any, options?: CreateOptions): IPromise<FileInfoModel>;
    protected _prepareModel(value: any): FileInfoModel;
    private _processResponse(resp, options);
}
