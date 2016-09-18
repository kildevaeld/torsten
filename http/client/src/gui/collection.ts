
import {Collection, Model, CollectionOptions, CollectionFetchOptions, isModel} from 'collection'
import {IClient, IFileInfo, OpenOptions, CreateOptions} from '../types';
import {TorstenGuiError} from './error';
import {extend, IPromise, isObject} from 'orange';
import {path} from '../utils'
export interface FileInfoModelOptions {
    client: IClient;
}

export class FileInfoModel extends Model {
    _client: IClient;
    constructor(attr: any, options: FileInfoModelOptions) {
        super(attr, options);
        this._client = options.client;
    }

    get fullPath() {
        return this.get('path') + this.get('name')
    }

    open(o?: OpenOptions): IPromise<Blob> {
        return this._client.open(this.fullPath, o)
            .then(blob => {
                return blob;
            })
    }
}

export interface FileCollectionOptions extends CollectionOptions<FileInfoModel> {
    path: string;
    client: IClient;
    showHidden?: boolean;
    showDirectories?: boolean;
}

function normalizePath(path) {
    if (path == "") path = "/";
    if (path != "/" && path.substr(0, 1) != '/') {
        path = "/" + path;
    }
    return path;
}

export class FileCollection extends Collection<FileInfoModel> {
    protected get __classType() { return 'RestCollection' };
    Model = FileInfoModel

    private _path: string;
    private _client: IClient;
    public get path() {
        return this._path;
    }

    constructor(models: IFileInfo[] | FileInfoModel[], options: FileCollectionOptions) {

        super(models, options);
        options = options || <any>{}
        if (!options.client) {
            throw new TorstenGuiError("No client");
        }
        if (!options.path || options.path == "") {
            options.path = "/";
        }

        this._client = options.client;

        this._path = normalizePath(options.path);

        //this._url = this._client.endpoint + path;

    }

    fetch(options?: CollectionFetchOptions): IPromise<FileInfoModel[]> {
        options = options ? extend({}, options) : {};

        this.trigger('before:fetch');

        return this._client.list(this.path, {
            progress: (e) => {
                if (e.lengthComputable) {
                    this.trigger('fetch:progress', e)
                }
            }
        })
            .then(files => {
                this[options.reset ? 'reset' : 'set'](files, options);
                this.trigger('fetch');
                return this.models;
            });


    }

    upload(name: string, data:any, options:CreateOptions={}): IPromise<FileInfoModel> {

        let fullPath = path.join(this.path, name);
        this.trigger('before:upload', fullPath, options)
        return this._client.create(fullPath, data, {
            progress: (e) => {
                this.trigger('upload:progress', e);
                if (options.progress) options.progress(e);
            }
        }).then( info => {
            let model = new FileInfoModel(info, {
                client: this._client
            })

            this.trigger('upload', model);
            this.add(model);

            return model;
        })

    }

    protected _prepareModel(value: any): FileInfoModel {
        if (isModel(value)) return value;
        if (isObject(value)) return new this.Model(value, {
            //parse: true,
            client: this._client
        });
        throw new Error('Value not an Object or an instance of a model, but was: ' + typeof value);
    }


}