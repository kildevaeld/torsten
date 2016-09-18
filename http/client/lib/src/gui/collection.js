"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var collection_1 = require('collection');
var error_1 = require('./error');
var orange_1 = require('orange');
var utils_1 = require('../utils');
var FileInfoModel = (function (_super) {
    __extends(FileInfoModel, _super);
    function FileInfoModel(attr, options) {
        _super.call(this, attr, options);
        this._client = options.client;
    }
    Object.defineProperty(FileInfoModel.prototype, "fullPath", {
        get: function () {
            return this.get('path') + this.get('name');
        },
        enumerable: true,
        configurable: true
    });
    FileInfoModel.prototype.open = function (o) {
        return this._client.open(this.fullPath, o)
            .then(function (blob) {
            return blob;
        });
    };
    return FileInfoModel;
}(collection_1.Model));
exports.FileInfoModel = FileInfoModel;
function normalizePath(path) {
    if (path == "")
        path = "/";
    if (path != "/" && path.substr(0, 1) != '/') {
        path = "/" + path;
    }
    return path;
}
var FileCollection = (function (_super) {
    __extends(FileCollection, _super);
    function FileCollection(models, options) {
        _super.call(this, models, options);
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
    Object.defineProperty(FileCollection.prototype, "__classType", {
        get: function () { return 'RestCollection'; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FileCollection.prototype, "path", {
        get: function () {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    FileCollection.prototype.fetch = function (options) {
        var _this = this;
        options = options ? orange_1.extend({}, options) : {};
        this.trigger('before:fetch');
        return this._client.list(this.path, {
            progress: function (e) {
                if (e.lengthComputable) {
                    _this.trigger('fetch:progress', e);
                }
            }
        })
            .then(function (files) {
            _this[options.reset ? 'reset' : 'set'](files, options);
            _this.trigger('fetch');
            return _this.models;
        });
    };
    FileCollection.prototype.upload = function (name, data, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var fullPath = utils_1.path.join(this.path, name);
        this.trigger('before:upload', fullPath, options);
        return this._client.create(fullPath, data, {
            progress: function (e) {
                _this.trigger('upload:progress', e);
                if (options.progress)
                    options.progress(e);
            }
        }).then(function (info) {
            var model = new FileInfoModel(info, {
                client: _this._client
            });
            _this.trigger('upload', model);
            _this.add(model);
            return model;
        });
    };
    FileCollection.prototype._prepareModel = function (value) {
        if (collection_1.isModel(value))
            return value;
        if (orange_1.isObject(value))
            return new this.Model(value, {
                //parse: true,
                client: this._client
            });
        throw new Error('Value not an Object or an instance of a model, but was: ' + typeof value);
    };
    return FileCollection;
}(collection_1.Collection));
exports.FileCollection = FileCollection;
