"use strict";
var orange_1 = require('orange');
var utils_1 = require('./utils');
var file_info_1 = require('./file-info');
var error_1 = require('./error');
var request = require('./request');
var orange_request_1 = require('orange.request');
function validateConfig(options) {
}
var TorstenClient = (function () {
    function TorstenClient(options) {
        validateConfig(options);
        this._options = options;
    }
    Object.defineProperty(TorstenClient.prototype, "endpoint", {
        get: function () {
            return this._options.endpoint;
        },
        enumerable: true,
        configurable: true
    });
    TorstenClient.prototype.create = function (path, data, options) {
        if (options === void 0) { options = {}; }
        if (data == null)
            return Promise.reject(error_1.createError("no data"));
        var req = orange_1.extend({}, options);
        var promise;
        if (utils_1.isNode && utils_1.isReadableStream(data)) {
        }
        else {
            promise = request.upload(this._toUrl(path), req, data);
        }
        return promise.then(function (res) { return res.json(); })
            .then(function (json) {
            if (json.message != "ok") {
                throw error_1.createError("invalid response");
            }
            return json.data;
        });
    };
    TorstenClient.prototype.stat = function (path, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var url = this._toUrl(path);
        return request.request(orange_request_1.HttpMethod.GET, url, {
            progress: options.progress,
            params: { stat: true }
        }).then(function (res) {
            return res.json();
        }).then(function (i) { return new file_info_1.FileInfo(_this, i.data); });
    };
    TorstenClient.prototype.list = function (path, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var req = request.request(orange_request_1.HttpMethod.GET, this._toUrl(path), options);
        return req.then(function (res) {
            return res.json();
        }).then(function (infos) {
            if (infos.message != 'ok')
                return [];
            return infos.data.map(function (i) { return new file_info_1.FileInfo(_this, i); });
        });
    };
    TorstenClient.prototype.open = function (path, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return this.stat(path, options)
            .then(function (info) {
            var r = { progress: options.progress };
            if (options.thumbnail) {
                r.params = r.params || {};
                r.params.thumbnail = true;
            }
            if (utils_1.isNode && options.stream) {
                var req = request.get(_this._toUrl(path));
                if (options.progress) {
                    req.on('progress', options.progress);
                }
                // if the pipe function is'nt called immediately
                // request downloads the data to a buffer
                return req.pipe(require('./stream').stream());
            }
            return request.request(orange_request_1.HttpMethod.GET, _this._toUrl(path), r)
                .then(function (r) { return r.blob(); });
        });
    };
    TorstenClient.prototype.remove = function (path) {
        var url = this._toUrl(path);
        return request.request(orange_request_1.HttpMethod.DELETE, url, {})
            .then(function (res) {
            console.log(res);
        });
    };
    TorstenClient.prototype._toUrl = function (path) {
        if (path.substr(0, 1) != "/") {
            path = "/" + path;
        }
        return this._options.endpoint + path;
    };
    return TorstenClient;
}());
exports.TorstenClient = TorstenClient;
