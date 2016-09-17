"use strict";
const collection_1 = require('collection');
const error_1 = require('./error');
const orange_1 = require('orange');
const utils_1 = require('../utils');
class FileInfoModel extends collection_1.Model {
    constructor(attr, options) {
        super(attr, options);
        this._client = options.client;
    }
    get fullPath() {
        return this.get('path') + this.get('name');
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
class FileCollection extends collection_1.Collection {
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
        options = options ? orange_1.extend({}, options) : {};
        this.trigger('before:fetch');
        return this._client.list(this.path, {
            progress: (e) => {
                if (e.lengthComputable) {
                    console.log(e.loaded, e.total);
                    this.trigger('progress', e);
                }
            }
        })
            .then(files => {
            this[options.reset ? 'reset' : 'set'](files, options);
            this.trigger('fetch');
            return this.models;
        });
    }
    create(name, data, options = {}) {
        let fullPath = utils_1.path.join(this.path, name);
        return this._client.create(fullPath, data, {
            progress: (e) => {
                this.trigger('progress', e);
                if (options.progress)
                    options.progress(e);
            }
        }).then(info => {
            let model = new FileInfoModel(info, {
                client: this._client
            });
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
}
exports.FileCollection = FileCollection;
