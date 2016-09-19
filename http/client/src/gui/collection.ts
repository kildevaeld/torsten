
import {Collection, Model, CollectionOptions, CollectionFetchOptions, isModel, IModel} from 'collection'
import {IClient, IFileInfo, OpenOptions, CreateOptions} from '../types';
import {TorstenGuiError} from './error';
import {extend, IPromise, isObject, has} from 'orange';
import {path} from '../utils'
import {Response, queryStringToParams, HttpRequest, HttpMethod} from 'orange.request'

const PARAM_TRIM_RE = /[\s'"]/g;
const URL_TRIM_RE = /[<>\s'"]/g;

interface Link {
    first?: string;
    prev?: string;
    last?: string;
    next?: string;
}

export interface QueryParameters {
    page: string;
    limit: string;
}

export interface State {
    first: number
    last: number
    current: number
    size: number
}

function parseLinkHeaders(resp: Response): Link {
    var link: Link = {};
    
    let linkHeader = <any>resp.headers.get('Link');

    if (linkHeader == null) return {};

    linkHeader = linkHeader.split(',')
    let relations = ['first', 'prev', 'next', 'last'];
    for (let i = 0, ii = linkHeader.length; i < ii; i++) {
        let linkParts = linkHeader[i].split(';'),
            url = linkParts[0].replace(URL_TRIM_RE, ''),
            params = linkParts.slice(1);
        for (let x = 0, xx = params.length; x < xx; x++) {
            let paramParts = params[x].split('='),
                key = paramParts[0].replace(PARAM_TRIM_RE, ''),
                value = paramParts[1].replace(PARAM_TRIM_RE, '');
            if (key == 'rel' && !!~relations.indexOf(value))
                link[value] = url;

        }
    }

    return link;

}

export interface FileInfoModelOptions {
    client: IClient;
}

export class FileInfoModel extends Model {
    _client: IClient;
    idAttribute = "id";
    constructor(attr: any, options: FileInfoModelOptions) {
        super(attr, options);
        this._client = options.client;
    }

    get fullPath() {
        return this.get('path') + this.get('name')
    }

    get url() {
        return this._client.endpoint + this.fullPath;
    }

    open(o?: OpenOptions): IPromise<Blob> {
        return this._client.open(this.fullPath, o)
            .then(blob => {
                return blob;
            })
    }
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

function normalizePath(path) {
    if (path == "") path = "/";
    if (path != "/" && path.substr(0, 1) != '/') {
        path = "/" + path;
    }
    return path;
}

export abstract class RestCollection<T extends IModel> extends Collection<T> {
    protected state: State
    queryParams: QueryParameters;
    protected _link: { [key: number]: string };
    
    constructor(models: any, options: FileCollectionOptions<T>) {
        super(models, options)

        this.state = { first: 1, last: -1, current: 1, size: 10 }
        this._link = {};
        this.queryParams = {
            page: 'page',
            limit: 'limit'
        };
    }

    public hasNext(): boolean {
        return this.hasPage(this.state.current + 1);
    }

    public hasPrevious(): boolean {
        return this.hasPage(this.state.current - 1);
    }

    public hasPage(page: number): boolean {
        if (this.state.last > -1) {
            return page <= this.state.last;
        }
        return false;

    }

    public getPreviousPage(options?: GetPageOptions): IPromise<any> {
        options = options ? extend({}, options) : {};
        options.page = this.state.current - 1;
        return this.getPage(options);
    }

    public getNextPage(options?: GetPageOptions): IPromise<any> {
        options = options ? extend({}, options) : {};
        options.page = this.state.current + 1;

        return this.getPage(options);
    }

    public getPage(options?: GetPageOptions): IPromise<any> {
        options = options ? extend({}, options) : {};
        if (options.page === void 0) return Promise.reject(new Error("No page"));

        if (this.state.last < options.page && this.state.last != -1) {
            options.page = this.state.last;
        } else if (options.page < this.state.first) {
            options.page = this.state.first;
        }

        return this.fetch(options);
    }

    abstract fetch(options?: CollectionFetchOptions): IPromise<FileInfoModel[]>;




}



export class FileCollection extends RestCollection<FileInfoModel> {
    protected get __classType() { return 'RestCollection' };
    Model = FileInfoModel

    private _path: string;
    private _client: IClient;
    private _fetch:boolean;

    public get path() {
        return this._path;
    }

    constructor(models: IFileInfo[] | FileInfoModel[], options: FileCollectionOptions<FileInfoModel>) {

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




    fetch(options?: FileCollectionFetchOptions): IPromise<FileInfoModel[]> {
        if (this._fetch) {
            return Promise.resolve([])
        }

        options = options ? extend({}, options) : {};
       
        let url: string;
        if (!has(options, 'page')) {
            options.page = this.state.current;
        }
        
        options.page = parseInt(<any>options.page);

        let params = options.params ? extend({}, options.params) : {};
        if (has(params, this.queryParams.page)) delete params[this.queryParams.page]

        url = this._link[options.page];
        if (!url) {
            url = this._client.endpoint;
        }

        if (!url) return Promise.reject<FileInfoModel[]>(new Error("no url specified"));

        let idx = url.indexOf('?');
        if (idx > -1) {
            params = extend(params, queryStringToParams(url.substr(idx + 1)));
            url = url.substr(0, idx);
        }

        if (!has(params, this.queryParams.page)) {
            params[this.queryParams.page] = options.page;
        }

        params[this.queryParams.limit] = this.state.size;

        this._fetch = true;
        this.trigger('before:fetch');

        let request = new HttpRequest(HttpMethod.GET, url)

        return request.params(params)
            .downloadProgress(e => {
                if (e.lengthComputable) {
                    this.trigger('fetch:progress', e)
                }
            })
            .end()
            .then(res => {
                let models = this._processResponse(res, options);
                this._fetch = false;
                this.trigger('fetch');
                
                return models;
            })

        /*return this._client.list(this.path, {
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
            });*/


    }

    upload(name: string, data: any, options: CreateOptions = {}): IPromise<FileInfoModel> {

        let fullPath = path.join(this.path, name);
        this.trigger('before:upload', fullPath, options)
        return this._client.create(fullPath, data, {
            progress: (e) => {
                this.trigger('upload:progress', e);
                if (options.progress) options.progress(e);
            }
        }).then(info => {
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


    private _processResponse(resp: Response, options: GetPageOptions) {
        let currentPage = options.page;
        let links = parseLinkHeaders(resp);

        if (links.first) this._link[this.state.first] = links.first;
        if (links.prev) this._link[currentPage - 1] = links.prev;
        if (links.next) this._link[currentPage + 1] = links.next;

        if (links.last) {
            let last = links.last;
            let idx = last.indexOf('?')

            if (idx > -1) {
                let params = queryStringToParams(last.substr(idx + 1));

                if (has(params, this.queryParams.page)) {
                    this._link[params[this.queryParams.page]] = last;
                    this.state.last = parseInt(params[this.queryParams.page]);
                }
            }

        }


        this.state.current = currentPage;

        return resp.json<{ data: any }>()
            .then(body => {
                return body.data;
            }).then(data => {
                this.add(data);
                return data;
            })
      
    }


}
