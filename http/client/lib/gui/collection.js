"use strict";
const collection_1 = require('collection');
const error_1 = require('./error');
const orange_1 = require('orange');
const utils_1 = require('../utils');
const orange_request_1 = require('orange.request');
const PARAM_TRIM_RE = /[\s'"]/g;
const URL_TRIM_RE = /[<>\s'"]/g;
function parseLinkHeaders(resp) {
    var link = {};
    let linkHeader = resp.headers.get('Link');
    if (linkHeader == null)
        return {};
    linkHeader = linkHeader.split(',');
    let relations = ['first', 'prev', 'next', 'last'];
    for (let i = 0, ii = linkHeader.length; i < ii; i++) {
        let linkParts = linkHeader[i].split(';'), url = linkParts[0].replace(URL_TRIM_RE, ''), params = linkParts.slice(1);
        for (let x = 0, xx = params.length; x < xx; x++) {
            let paramParts = params[x].split('='), key = paramParts[0].replace(PARAM_TRIM_RE, ''), value = paramParts[1].replace(PARAM_TRIM_RE, '');
            if (key == 'rel' && !!~relations.indexOf(value))
                link[value] = url;
        }
    }
    return link;
}
class FileInfoModel extends collection_1.Model {
    constructor(attr, options) {
        super(attr, options);
        this.idAttribute = "id";
        this._client = options.client;
    }
    get fullPath() {
        return this.get('path') + this.get('name');
    }
    get url() {
        return this._client.endpoint + this.fullPath;
    }
    open(o) {
        return this._client.open(this.fullPath, o)
            .then(blob => {
            return blob;
        });
    }
}
exports.FileInfoModel = FileInfoModel;
function normalizePath(path) {
    if (path == "")
        path = "/";
    if (path != "/" && path.substr(0, 1) != '/') {
        path = "/" + path;
    }
    return path;
}
class RestCollection extends collection_1.Collection {
    constructor(models, options) {
        super(models, options);
        this.state = { first: 1, last: -1, current: 1, size: 10 };
        this._link = {};
        this.queryParams = {
            page: 'page',
            limit: 'limit'
        };
    }
    hasNext() {
        return this.hasPage(this.state.current + 1);
    }
    hasPrevious() {
        return this.hasPage(this.state.current - 1);
    }
    hasPage(page) {
        if (this.state.last > -1) {
            return page <= this.state.last;
        }
        return false;
    }
    getPreviousPage(options) {
        options = options ? orange_1.extend({}, options) : {};
        options.page = this.state.current - 1;
        return this.getPage(options);
    }
    getNextPage(options) {
        options = options ? orange_1.extend({}, options) : {};
        options.page = this.state.current + 1;
        return this.getPage(options);
    }
    getPage(options) {
        options = options ? orange_1.extend({}, options) : {};
        if (options.page === void 0)
            return Promise.reject(new Error("No page"));
        if (this.state.last < options.page && this.state.last != -1) {
            options.page = this.state.last;
        }
        else if (options.page < this.state.first) {
            options.page = this.state.first;
        }
        return this.fetch(options);
    }
}
exports.RestCollection = RestCollection;
class FileCollection extends RestCollection {
    constructor(models, options) {
        super(models, options);
        this.Model = FileInfoModel;
        options = options || {};
        if (!options.client) {
            throw new error_1.TorstenGuiError("No client");
        }
        if (!options.path || options.path == "") {
            options.path = "/";
        }
        this._client = options.client;
        this._path = normalizePath(options.path);
        //this._url = this._client.endpoint + path;
    }
    get __classType() { return 'RestCollection'; }
    ;
    get path() {
        return this._path;
    }
    fetch(options) {
        if (this._fetch) {
            return Promise.resolve([]);
        }
        options = options ? orange_1.extend({}, options) : {};
        let url;
        if (!orange_1.has(options, 'page')) {
            options.page = this.state.current;
        }
        options.page = parseInt(options.page);
        let params = options.params ? orange_1.extend({}, options.params) : {};
        if (orange_1.has(params, this.queryParams.page))
            delete params[this.queryParams.page];
        url = this._link[options.page];
        if (!url) {
            url = this._client.endpoint;
        }
        if (!url)
            return Promise.reject(new Error("no url specified"));
        let idx = url.indexOf('?');
        if (idx > -1) {
            params = orange_1.extend(params, orange_request_1.queryStringToParams(url.substr(idx + 1)));
            url = url.substr(0, idx);
        }
        if (!orange_1.has(params, this.queryParams.page)) {
            params[this.queryParams.page] = options.page;
        }
        params[this.queryParams.limit] = this.state.size;
        this._fetch = true;
        this.trigger('before:fetch');
        let request = new orange_request_1.HttpRequest(orange_request_1.HttpMethod.GET, url);
        return request.params(params)
            .downloadProgress(e => {
            if (e.lengthComputable) {
                this.trigger('fetch:progress', e);
            }
        })
            .end()
            .then(res => {
            let models = this._processResponse(res, options);
            this._fetch = false;
            this.trigger('fetch');
            return models;
        });
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
    upload(name, data, options = {}) {
        let fullPath = utils_1.path.join(this.path, name);
        this.trigger('before:upload', fullPath, options);
        return this._client.create(fullPath, data, {
            progress: (e) => {
                this.trigger('upload:progress', e);
                if (options.progress)
                    options.progress(e);
            }
        }).then(info => {
            let model = new FileInfoModel(info, {
                client: this._client
            });
            this.trigger('upload', model);
            this.add(model);
            return model;
        });
    }
    _prepareModel(value) {
        if (collection_1.isModel(value))
            return value;
        if (orange_1.isObject(value))
            return new this.Model(value, {
                //parse: true,
                client: this._client
            });
        throw new Error('Value not an Object or an instance of a model, but was: ' + typeof value);
    }
    _processResponse(resp, options) {
        let currentPage = options.page;
        let links = parseLinkHeaders(resp);
        if (links.first)
            this._link[this.state.first] = links.first;
        if (links.prev)
            this._link[currentPage - 1] = links.prev;
        if (links.next)
            this._link[currentPage + 1] = links.next;
        if (links.last) {
            let last = links.last;
            let idx = last.indexOf('?');
            if (idx > -1) {
                let params = orange_request_1.queryStringToParams(last.substr(idx + 1));
                if (orange_1.has(params, this.queryParams.page)) {
                    this._link[params[this.queryParams.page]] = last;
                    this.state.last = parseInt(params[this.queryParams.page]);
                }
            }
        }
        this.state.current = currentPage;
        return resp.json()
            .then(body => {
            return body.data;
        }).then(data => {
            this.add(data);
            return data;
        });
    }
}
exports.FileCollection = FileCollection;
