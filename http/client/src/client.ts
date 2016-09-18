import {TorstenClientOptions, CreateOptions, GetOptions, ListOptions, 
    Requester, OpenOptions, IFileInfo, IClient} from './types';
import {extend, isObject, IPromise} from 'orange';
import {isString, isFormData, isReadableStream, isNode, isBuffer} from './utils';
import {FileInfo} from './file-info';
import {createError} from './error';

import * as request from './request'
import {HttpMethod} from 'orange.request';


interface Request {
    mime?: string;
    headers?: any
    params?: any
    data?: any
    size?: number;
    progress?: (e: ProgressEvent) => void;
}

function validateConfig(options: TorstenClientOptions) {

}



export class TorstenClient implements IClient {
    private _options: TorstenClientOptions;
    constructor(options: TorstenClientOptions) {
        validateConfig(options);
        this._options = options;
    }

    get endpoint() {
        return this._options.endpoint;
    }

    create(path: string, data: any, options: CreateOptions = {}): IPromise<IFileInfo> {
        if (data == null) return Promise.reject<IFileInfo>(createError("no data"))

        let req: Request = extend({}, options);
        
        let promise: IPromise<any>;
        if (isNode && isReadableStream(data)) {
            //promise = this._doStream(path, req);
        } else {
            promise = request.upload(this._toUrl(path), req, data);
        }
       
        return promise.then( res => res.json() )
        .then( json => {
            if (json.message != "ok") {
                throw createError("invalid response");
            }
            return json.data;
        })
    }

    stat(path: string, options: GetOptions = {}): IPromise<IFileInfo> {
      
        let url = this._toUrl(path);
        return request.request(HttpMethod.GET,url, {
            progress: options.progress,
            params: {stat: true}
        }).then( res => {
            return res.json<{data:IFileInfo}>();
        }).then( i => new FileInfo(this, i.data))

    }

    list(path: string, options: ListOptions = {}): IPromise<IFileInfo[]> {
        var req = request.request(HttpMethod.GET,this._toUrl(path), options)

        return req.then(res => {
            return res.json<{data:FileInfo[];message:string;}>();
        }).then( infos => {
            if (infos.message != 'ok') return [];
            return infos.data.map( i => new FileInfo(this, i) );
        })
    }

    open(path: string, options: OpenOptions = {}): IPromise<Blob> {
        return this.stat(path, options)
            .then<any>(info => {

                let r: Request  = {progress: options.progress};
                if (options.thumbnail) {
                    r.params = r.params||{};
                    r.params.thumbnail = true;
                }

                if (isNode && options.stream) {
                    let req = request.get(this._toUrl(path))

                    if (options.progress) {
                        req.on('progress', options.progress);
                    }
                    // if the pipe function is'nt called immediately
                    // request downloads the data to a buffer
                    return req.pipe(require('./stream').stream());
                }

                return request.request(HttpMethod.GET, this._toUrl(path), r)
                .then( r => r.blob())
                
            });
    }

    remove(path:string): IPromise<void> {
        let url = this._toUrl(path)
        return request.request(HttpMethod.DELETE, url, {})
        .then( res => {
            console.log(res)
        })
    }

   

    private _toUrl(path: string) {
        if (path.substr(0, 1) != "/") {
            path = "/" + path;
        }
        return this._options.endpoint + path;
    }


    /*
    private _doStream(path: string, r: Request): Promise<request.Response> {
        let url = this._toUrl(path);
        let req = request.post(path)
        if (r.params) req.query(r.params);
        if (r.headers) req.set(r.headers);

        if (r.mime) {
            req.set('Content-Type', r.mime);
        }
        if (r.size) {
            req.set('Content-Length', "" + r.size);
        }

        if (r.progress) {
            req.on('upload', r.progress);
        }

        r.data.pipe(req);
        return req;
    }
    */
}