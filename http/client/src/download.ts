
import {HttpRequest, HttpMethod, BodyType, Response} from 'orange.request'
import {IPromise} from 'orange'
import {Request} from './types';
import {isString, isBuffer, isFormData, isObject, isFile} from './utils';


export function request(method: HttpMethod, url: string, r: Request = {}): IPromise<Response> {
    let req = new HttpRequest(method, url);
    
    if (r.params) req.params(r.params);
    if (r.headers) req.header(r.headers);

    req.header("User-Agent", "torsten-client/0.0.1")
    
    return req.downloadProgress(r.progress)
        .end(r.data).then((res) => {
            return res;
        });
}


export function upload(url: string, r: Request, data): IPromise<Response> {
    
    let req = new HttpRequest(HttpMethod.POST, url);
    req.uploadProgress(r.progress)
    if (r.params) req.params(r.params);
    if (r.headers) req.header(r.headers);

    let mimeType
    req.header("User-Agent", "torsten-client/0.0.1")

    if (isString(data)) {
        req.header('Content-Length', data.length)
        mimeType = r.mime || "text/plain";
    } else if (isBuffer(data)) {
        req.header('Content-Length', data.length);
    } else if (isObject(data) && !isFile(data) && !isFormData(data)) {
        try {
            data = JSON.stringify(data);
            req.header('Content-Length', data.length);
            mimeType = "application/json";
        } catch (e) {
            return Promise.reject<any>(e);
        }
    }
    
    if (isFile(data)) {
        let form = new FormData();
        form.append('file', data);
        data = form;
    }

    if (mimeType && !isFormData(data)) {
        req.header('Content-Type', mimeType);
    }
   
   
    return req.end(data);

}