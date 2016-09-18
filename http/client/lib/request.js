"use strict";
const orange_request_1 = require('orange.request');
const utils_1 = require('./utils');
function request(method, url, r = {}) {
    let req = new orange_request_1.HttpRequest(method, url);
    if (r.params)
        req.params(r.params);
    if (r.headers)
        req.header(r.headers);
    req.header("User-Agent", "torsten-client/0.0.1");
    return req.downloadProgress(r.progress)
        .end(r.data).then((res) => {
        return res;
    });
}
exports.request = request;
function upload(url, r, data) {
    let req = new orange_request_1.HttpRequest(orange_request_1.HttpMethod.POST, url);
    req.uploadProgress(r.progress);
    if (r.params)
        req.params(r.params);
    if (r.headers)
        req.header(r.headers);
    let mimeType;
    req.header("User-Agent", "torsten-client/0.0.1");
    if (utils_1.isString(data)) {
        req.header('Content-Length', data.length);
        mimeType = r.mime || "text/plain";
    }
    else if (utils_1.isBuffer(data)) {
        req.header('Content-Length', data.length);
    }
    else if (utils_1.isObject(data) && !utils_1.isFile(data) && !utils_1.isFormData(data)) {
        try {
            data = JSON.stringify(data);
            req.header('Content-Length', data.length);
            mimeType = "application/json";
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    if (utils_1.isFile(data)) {
        let form = new FormData();
        form.append('file', data);
        data = form;
    }
    if (mimeType && !utils_1.isFormData(data)) {
        req.header('Content-Type', mimeType);
    }
    return req.end(data);
}
exports.upload = upload;
