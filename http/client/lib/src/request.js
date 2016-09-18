"use strict";
var orange_request_1 = require('orange.request');
var utils_1 = require('./utils');
function request(method, url, r) {
    if (r === void 0) { r = {}; }
    var req = new orange_request_1.HttpRequest(method, url);
    if (r.params)
        req.params(r.params);
    if (r.headers)
        req.header(r.headers);
    req.header("User-Agent", "torsten-client/0.0.1");
    return req.downloadProgress(r.progress)
        .end(r.data).then(function (res) {
        return res;
    });
}
exports.request = request;
function upload(url, r, data) {
    var req = new orange_request_1.HttpRequest(orange_request_1.HttpMethod.POST, url);
    req.uploadProgress(r.progress);
    if (r.params)
        req.params(r.params);
    if (r.headers)
        req.header(r.headers);
    var mimeType;
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
        var form = new FormData();
        form.append('file', data);
        data = form;
    }
    if (mimeType && !utils_1.isFormData(data)) {
        req.header('Content-Type', mimeType);
    }
    return req.end(data);
}
exports.upload = upload;
