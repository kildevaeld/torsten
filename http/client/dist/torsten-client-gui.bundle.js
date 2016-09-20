(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("http"), require("url"), (function webpackLoadOptionalExternalModule() { try { return require("stream"); } catch(e) {} }()), require("buffer"), require("events"), require("util"), require("tty"), require("fs"), require("net"));
	else if(typeof define === 'function' && define.amd)
		define(["http", "url", "stream", "buffer", "events", "util", "tty", "fs", "net"], factory);
	else if(typeof exports === 'object')
		exports["views"] = factory(require("http"), require("url"), (function webpackLoadOptionalExternalModule() { try { return require("stream"); } catch(e) {} }()), require("buffer"), require("events"), require("util"), require("tty"), require("fs"), require("net"));
	else
		root["torsten"] = root["torsten"] || {}, root["torsten"]["views"] = factory(root["http"], root["url"], root["stream"], root["buffer"], root["events"], root["util"], root["tty"], root["fs"], root["net"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_35__, __WEBPACK_EXTERNAL_MODULE_38__, __WEBPACK_EXTERNAL_MODULE_41__, __WEBPACK_EXTERNAL_MODULE_45__, __WEBPACK_EXTERNAL_MODULE_46__, __WEBPACK_EXTERNAL_MODULE_49__, __WEBPACK_EXTERNAL_MODULE_64__, __WEBPACK_EXTERNAL_MODULE_67__, __WEBPACK_EXTERNAL_MODULE_68__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(1));
	__export(__webpack_require__(59));
	__export(__webpack_require__(87));
	__export(__webpack_require__(92));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var collection_1 = __webpack_require__(2);
	var error_1 = __webpack_require__(18);
	var orange_1 = __webpack_require__(20);
	var utils_1 = __webpack_require__(28);
	var orange_request_1 = __webpack_require__(29);
	var PARAM_TRIM_RE = /[\s'"]/g;
	var URL_TRIM_RE = /[<>\s'"]/g;
	function parseLinkHeaders(resp) {
	    var link = {};
	    var linkHeader = resp.headers.get('Link');
	    if (linkHeader == null) return {};
	    linkHeader = linkHeader.split(',');
	    var relations = ['first', 'prev', 'next', 'last'];
	    for (var i = 0, ii = linkHeader.length; i < ii; i++) {
	        var linkParts = linkHeader[i].split(';'),
	            url = linkParts[0].replace(URL_TRIM_RE, ''),
	            params = linkParts.slice(1);
	        for (var x = 0, xx = params.length; x < xx; x++) {
	            var paramParts = params[x].split('='),
	                key = paramParts[0].replace(PARAM_TRIM_RE, ''),
	                value = paramParts[1].replace(PARAM_TRIM_RE, '');
	            if (key == 'rel' && !!~relations.indexOf(value)) link[value] = url;
	        }
	    }
	    return link;
	}

	var FileInfoModel = function (_collection_1$Model) {
	    _inherits(FileInfoModel, _collection_1$Model);

	    function FileInfoModel(attr, options) {
	        _classCallCheck(this, FileInfoModel);

	        var _this = _possibleConstructorReturn(this, (FileInfoModel.__proto__ || Object.getPrototypeOf(FileInfoModel)).call(this, attr, options));

	        _this.idAttribute = "id";
	        _this._client = options.client;
	        return _this;
	    }

	    _createClass(FileInfoModel, [{
	        key: 'open',
	        value: function open(o) {
	            return this._client.open(this.fullPath, o).then(function (blob) {
	                return blob;
	            });
	        }
	    }, {
	        key: 'fullPath',
	        get: function get() {
	            return this.get('path') + this.get('name');
	        }
	    }, {
	        key: 'url',
	        get: function get() {
	            return this._client.endpoint + this.fullPath;
	        }
	    }]);

	    return FileInfoModel;
	}(collection_1.Model);

	exports.FileInfoModel = FileInfoModel;
	function normalizePath(path) {
	    if (path == "") path = "/";
	    if (path != "/" && path.substr(0, 1) != '/') {
	        path = "/" + path;
	    }
	    return path;
	}

	var RestCollection = function (_collection_1$Collect) {
	    _inherits(RestCollection, _collection_1$Collect);

	    function RestCollection(models, options) {
	        _classCallCheck(this, RestCollection);

	        var _this2 = _possibleConstructorReturn(this, (RestCollection.__proto__ || Object.getPrototypeOf(RestCollection)).call(this, models, options));

	        _this2.state = { first: 1, last: -1, current: 1, size: 10 };
	        _this2._link = {};
	        _this2.queryParams = {
	            page: 'page',
	            limit: 'limit'
	        };
	        return _this2;
	    }

	    _createClass(RestCollection, [{
	        key: 'hasNext',
	        value: function hasNext() {
	            return this.hasPage(this.state.current + 1);
	        }
	    }, {
	        key: 'hasPrevious',
	        value: function hasPrevious() {
	            return this.hasPage(this.state.current - 1);
	        }
	    }, {
	        key: 'hasPage',
	        value: function hasPage(page) {
	            if (this.state.last > -1) {
	                return page <= this.state.last;
	            }
	            return false;
	        }
	    }, {
	        key: 'getPreviousPage',
	        value: function getPreviousPage(options) {
	            options = options ? orange_1.extend({}, options) : {};
	            options.page = this.state.current - 1;
	            return this.getPage(options);
	        }
	    }, {
	        key: 'getNextPage',
	        value: function getNextPage(options) {
	            options = options ? orange_1.extend({}, options) : {};
	            options.page = this.state.current + 1;
	            return this.getPage(options);
	        }
	    }, {
	        key: 'getPage',
	        value: function getPage(options) {
	            options = options ? orange_1.extend({}, options) : {};
	            if (options.page === void 0) return Promise.reject(new Error("No page"));
	            if (this.state.last < options.page && this.state.last != -1) {
	                options.page = this.state.last;
	            } else if (options.page < this.state.first) {
	                options.page = this.state.first;
	            }
	            return this.fetch(options);
	        }
	    }]);

	    return RestCollection;
	}(collection_1.Collection);

	exports.RestCollection = RestCollection;

	var FileCollection = function (_RestCollection) {
	    _inherits(FileCollection, _RestCollection);

	    function FileCollection(models, options) {
	        _classCallCheck(this, FileCollection);

	        var _this3 = _possibleConstructorReturn(this, (FileCollection.__proto__ || Object.getPrototypeOf(FileCollection)).call(this, models, options));

	        _this3.Model = FileInfoModel;
	        options = options || {};
	        if (!options.client) {
	            throw new error_1.TorstenGuiError("No client");
	        }
	        if (!options.path || options.path == "") {
	            options.path = "/";
	        }
	        _this3._client = options.client;
	        _this3._path = normalizePath(options.path);
	        //this._url = this._client.endpoint + path;
	        return _this3;
	    }

	    _createClass(FileCollection, [{
	        key: 'fetch',
	        value: function fetch(options) {
	            var _this4 = this;

	            if (this._fetch) {
	                return Promise.resolve([]);
	            }
	            options = options ? orange_1.extend({}, options) : {};
	            var url = void 0;
	            if (!orange_1.has(options, 'page')) {
	                options.page = this.state.current;
	            }
	            options.page = parseInt(options.page);
	            var params = options.params ? orange_1.extend({}, options.params) : {};
	            if (orange_1.has(params, this.queryParams.page)) delete params[this.queryParams.page];
	            url = this._link[options.page];
	            if (!url) {
	                url = this._client.endpoint;
	            }
	            if (!url) return Promise.reject(new Error("no url specified"));
	            var idx = url.indexOf('?');
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
	            var request = new orange_request_1.HttpRequest(orange_request_1.HttpMethod.GET, url);
	            return request.params(params).downloadProgress(function (e) {
	                if (e.lengthComputable) {
	                    _this4.trigger('fetch:progress', e);
	                }
	            }).end().then(function (res) {
	                var models = _this4._processResponse(res, options);
	                _this4._fetch = false;
	                _this4.trigger('fetch');
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
	    }, {
	        key: 'upload',
	        value: function upload(name, data) {
	            var _this5 = this;

	            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	            var fullPath = utils_1.path.join(this.path, name);
	            this.trigger('before:upload', fullPath, options);
	            return this._client.create(fullPath, data, {
	                progress: function progress(e) {
	                    _this5.trigger('upload:progress', e);
	                    if (options.progress) options.progress(e);
	                }
	            }).then(function (info) {
	                var model = new FileInfoModel(info, {
	                    client: _this5._client
	                });
	                _this5.trigger('upload', model);
	                _this5.add(model);
	                return model;
	            });
	        }
	    }, {
	        key: '_prepareModel',
	        value: function _prepareModel(value) {
	            if (collection_1.isModel(value)) return value;
	            if (orange_1.isObject(value)) return new this.Model(value, {
	                //parse: true,
	                client: this._client
	            });
	            throw new Error('Value not an Object or an instance of a model, but was: ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)));
	        }
	    }, {
	        key: '_processResponse',
	        value: function _processResponse(resp, options) {
	            var _this6 = this;

	            var currentPage = options.page;
	            var links = parseLinkHeaders(resp);
	            if (links.first) this._link[this.state.first] = links.first;
	            if (links.prev) this._link[currentPage - 1] = links.prev;
	            if (links.next) this._link[currentPage + 1] = links.next;
	            if (links.last) {
	                var last = links.last;
	                var idx = last.indexOf('?');
	                if (idx > -1) {
	                    var params = orange_request_1.queryStringToParams(last.substr(idx + 1));
	                    if (orange_1.has(params, this.queryParams.page)) {
	                        this._link[params[this.queryParams.page]] = last;
	                        this.state.last = parseInt(params[this.queryParams.page]);
	                    }
	                }
	            }
	            this.state.current = currentPage;
	            return resp.json().then(function (body) {
	                return body.data;
	            }).then(function (data) {
	                _this6.add(data);
	                return data;
	            });
	        }
	    }, {
	        key: '__classType',
	        get: function get() {
	            return 'RestCollection';
	        }
	    }, {
	        key: 'path',
	        get: function get() {
	            return this._path;
	        }
	    }]);

	    return FileCollection;
	}(RestCollection);

	exports.FileCollection = FileCollection;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(3));
	__export(__webpack_require__(10));
	__export(__webpack_require__(11));
	__export(__webpack_require__(12));
	__export(__webpack_require__(13));
	__export(__webpack_require__(17));

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var object_1 = __webpack_require__(4);
	var model_1 = __webpack_require__(10);
	var objects_1 = __webpack_require__(7);
	var arrays_1 = __webpack_require__(8);
	var utils_1 = __webpack_require__(6);
	function isCollection(a) {
	    if (a == null) return false;
	    return a instanceof Collection || a.__classType == 'Collection' || a.__classType == 'RestCollection';
	}
	exports.isCollection = isCollection;
	var setOptions = { add: true, remove: true, merge: true };
	var addOptions = { add: true, remove: false };
	var Collection = function (_super) {
	    __extends(Collection, _super);
	    function Collection(models, options) {
	        if (options === void 0) {
	            options = {};
	        }
	        _super.call(this);
	        this.options = options;
	        if (this.options.model) {
	            this.Model = this.options.model;
	        }
	        if (models) {
	            this.add(models);
	        }
	    }
	    Object.defineProperty(Collection.prototype, "__classType", {
	        get: function get() {
	            return 'Collection';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    Object.defineProperty(Collection.prototype, "length", {
	        get: function get() {
	            return this.models.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Collection.prototype, "Model", {
	        get: function get() {
	            if (!this._model) {
	                this._model = model_1.Model;
	            }
	            return this._model;
	        },
	        set: function set(con) {
	            this._model = con;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Collection.prototype, "models", {
	        get: function get() {
	            return this._models || (this._models = []);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Collection.prototype.add = function (models, options) {
	        var _this = this;
	        if (options === void 0) {
	            options = {};
	        }
	        if (!Array.isArray(models)) {
	            if (!(models instanceof this.Model)) {
	                models = this._prepareModel(models);
	            }
	        } else {
	            models = models.map(function (item) {
	                return item instanceof _this.Model ? item : _this._prepareModel(item);
	            });
	        }
	        this.set(models, objects_1.extend({ merge: false }, options, addOptions));
	    };
	    Collection.prototype.set = function (items, options) {
	        if (options === void 0) {
	            options = {};
	        }
	        options = objects_1.extend({}, setOptions, options);
	        if (options.parse) items = this.parse(items, options);
	        var singular = !Array.isArray(items);
	        var models = singular ? items ? [items] : [] : items.slice();
	        var i, l, id, model, attrs, existing, sort;
	        var at = options.at;
	        var sortable = this.comparator && at == null && options.sort !== false;
	        var sortAttr = typeof this.comparator === 'string' ? this.comparator : null;
	        var toAdd = [],
	            toRemove = [],
	            modelMap = {};
	        var add = options.add,
	            merge = options.merge,
	            remove = options.remove;
	        var order = !sortable && add && remove ? [] : null;
	        for (i = 0, l = models.length; i < l; i++) {
	            model = models[i];
	            model = this._prepareModel(model);
	            id = model.get(model.idAttribute) || model.uid;
	            if (existing = this.get(id)) {
	                if (remove) modelMap[existing.uid] = true;
	                if (merge) {
	                    attrs = model.toJSON();
	                    existing.set(attrs, options);
	                    if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
	                }
	                models[i] = existing;
	            } else if (add) {
	                models[i] = model;
	                if (!model) continue;
	                toAdd.push(model);
	                this._addReference(model, options);
	            }
	            model = existing || model;
	            if (order && !modelMap[model.id]) order.push(model);
	            modelMap[model.uid] = true;
	        }
	        if (remove) {
	            for (i = 0, l = this.length; i < l; ++i) {
	                if (!modelMap[(model = this.models[i]).uid]) toRemove.push(model);
	            }
	            if (toRemove.length) this.remove(toRemove, options);
	        }
	        if (toAdd.length || order && order.length) {
	            if (sortable) sort = true;
	            if (at != null) {
	                for (i = 0, l = toAdd.length; i < l; i++) {
	                    this.models.splice(at + i, 0, toAdd[i]);
	                }
	            } else {
	                if (order) this.models.length = 0;
	                var orderedModels = order || toAdd;
	                for (i = 0, l = orderedModels.length; i < l; i++) {
	                    this.models.push(orderedModels[i]);
	                }
	            }
	        }
	        if (sort) this.sort({ silent: true });
	        if (!options.silent) {
	            for (i = 0, l = toAdd.length; i < l; i++) {
	                (model = toAdd[i]).trigger('add', model, this, options);
	            }
	            if (sort || order && order.length) this.trigger('sort', this, options);
	            if (toAdd.length || toRemove.length) this.trigger('update', this, options);
	        }
	        return singular ? models[0] : models;
	    };
	    Collection.prototype.remove = function (models, options) {
	        if (options === void 0) {
	            options = {};
	        }
	        var singular = !Array.isArray(models);
	        models = singular ? [models] : models.slice();
	        var i, l, index, model;
	        for (i = 0, l = models.length; i < l; i++) {
	            model = models[i] = this.get(models[i]);
	            if (!model) continue;
	            index = this.indexOf(model);
	            this.models.splice(index, 1);
	            if (!options.silent) {
	                options.index = index;
	                model.trigger('remove', model, this, options);
	            }
	            this._removeReference(model, options);
	        }
	        return singular ? models[0] : models;
	    };
	    Collection.prototype.get = function (id) {
	        return this.find(id);
	    };
	    Collection.prototype.at = function (index) {
	        return this.models[index];
	    };
	    Collection.prototype.clone = function (options) {
	        options = options || this.options;
	        return new this.constructor(this.models, options);
	    };
	    Collection.prototype.sort = function (options) {
	        if (options === void 0) {
	            options = {};
	        }
	        if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
	        if (typeof this.comparator === 'string' || this.comparator.length === 1) {
	            this._models = this.sortBy(this.comparator, this);
	        } else {
	            this.models.sort(this.comparator.bind(this));
	        }
	        if (!options.silent) this.trigger('sort', this, options);
	        return this;
	    };
	    Collection.prototype.sortBy = function (key, context) {
	        return arrays_1.sortBy(this._models, key, context);
	    };
	    Collection.prototype.push = function (model, options) {
	        if (options === void 0) {
	            options = {};
	        }
	        return this.add(model, objects_1.extend({ at: this.length }, options));
	    };
	    Collection.prototype.reset = function (models, options) {
	        var _this = this;
	        if (options === void 0) {
	            options = {};
	        }
	        this.forEach(function (model) {
	            _this._removeReference(model, options);
	        });
	        options.previousModels = this.models;
	        this._reset();
	        models = this.add(models, options);
	        if (!options.silent) this.trigger('reset', this, options);
	        return models;
	    };
	    Collection.prototype.create = function (values, options) {
	        if (options === void 0) {
	            options = { add: true };
	        }
	        var model = new this.Model(values, options);
	        if (options.add) this.add(model);
	        return model;
	    };
	    Collection.prototype.parse = function (models, options) {
	        if (options === void 0) {
	            options = {};
	        }
	        return models;
	    };
	    Collection.prototype.find = function (nidOrFn) {
	        var model;
	        if (typeof nidOrFn === 'function') {
	            model = arrays_1.find(this.models, nidOrFn);
	        } else {
	            model = arrays_1.find(this.models, function (model) {
	                return model.id == nidOrFn || model.uid == nidOrFn || nidOrFn === model;
	            });
	        }
	        return model;
	    };
	    Collection.prototype.forEach = function (iterator, ctx) {
	        for (var i = 0, l = this.models.length; i < l; i++) {
	            iterator.call(ctx || this, this.models[i], i);
	        }
	        return this;
	    };
	    Collection.prototype.map = function (iterator, thisArgs) {
	        var out = [];
	        for (var i = 0, ii = this.length; i < ii; i++) {
	            out.push(iterator.call(thisArgs, this.models[i], i, this));
	        }
	        return out;
	    };
	    Collection.prototype.filter = function (fn) {
	        var out = [];
	        this.forEach(function (m, i) {
	            if (fn(m, i)) out.push(m);
	        });
	        return out;
	    };
	    Collection.prototype.indexOf = function (model) {
	        return this.models.indexOf(model);
	    };
	    Collection.prototype.toJSON = function () {
	        return this.models.map(function (m) {
	            return m.toJSON();
	        });
	    };
	    Collection.prototype._prepareModel = function (value) {
	        if (model_1.isModel(value)) return value;
	        if (objects_1.isObject(value)) return new this.Model(value, { parse: true });
	        throw new Error('Value not an Object or an instance of a model, but was: ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)));
	    };
	    Collection.prototype._removeReference = function (model, options) {
	        if (this === model.collection) delete model.collection;
	        this.stopListening(model);
	    };
	    Collection.prototype._addReference = function (model, options) {
	        if (!model.collection) model.collection = this;
	        this.listenTo(model, 'all', this._onModelEvent);
	    };
	    Collection.prototype._reset = function () {
	        this._models = [];
	    };
	    Collection.prototype._onModelEvent = function (event, model, collection, options) {
	        if ((event === 'add' || event === 'remove') && collection !== this) return;
	        if (event === 'destroy') this.remove(model, options);
	        utils_1.callFunc(this.trigger, this, arrays_1.slice(arguments));
	    };
	    Collection.prototype.destroy = function () {
	        var _this = this;
	        this.models.forEach(function (m) {
	            if (typeof m.destroy === 'function' && m.collection == _this) m.destroy();
	        });
	        _super.prototype.destroy.call(this);
	    };
	    return Collection;
	}(object_1.BaseObject);
	exports.Collection = Collection;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var eventsjs_1 = __webpack_require__(5);
	var utils_1 = __webpack_require__(6);
	var BaseObject = function (_super) {
	    __extends(BaseObject, _super);
	    function BaseObject() {
	        _super.apply(this, arguments);
	    }
	    BaseObject.extend = function (proto, stat) {
	        return utils_1.inherits(this, proto, stat);
	    };
	    return BaseObject;
	}(eventsjs_1.EventEmitter);
	exports.BaseObject = BaseObject;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var idCounter = 0;
	function getID() {
	    return "" + ++idCounter;
	}
	var EventEmitterError = function (_super) {
	    __extends(EventEmitterError, _super);
	    function EventEmitterError(message, method, klass, ctx) {
	        _super.call(this, message);
	        this.message = message;
	        this.method = method;
	        this.klass = klass;
	        this.ctx = ctx;
	    }
	    EventEmitterError.prototype.toString = function () {
	        var prefix = "EventEmitterError";
	        if (this.method && this.method != "") {
	            prefix = "EventEmitter#" + this.method;
	        }
	        return prefix + ": " + this.message;
	    };
	    return EventEmitterError;
	}(Error);
	exports.EventEmitterError = EventEmitterError;
	function callFunc(fn, args) {
	    if (args === void 0) {
	        args = [];
	    }
	    var l = fn.length,
	        i = -1,
	        a1 = args[0],
	        a2 = args[1],
	        a3 = args[2],
	        a4 = args[3];
	    switch (args.length) {
	        case 0:
	            while (++i < l) {
	                fn[i].handler.call(fn[i].ctx);
	            }return;
	        case 1:
	            while (++i < l) {
	                fn[i].handler.call(fn[i].ctx, a1);
	            }return;
	        case 2:
	            while (++i < l) {
	                fn[i].handler.call(fn[i].ctx, a1, a2);
	            }return;
	        case 3:
	            while (++i < l) {
	                fn[i].handler.call(fn[i].ctx, a1, a2, a3);
	            }return;
	        case 4:
	            while (++i < l) {
	                fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4);
	            }return;
	        default:
	            while (++i < l) {
	                fn[i].handler.apply(fn[i].ctx, args);
	            }return;
	    }
	}
	exports.callFunc = callFunc;
	function isFunction(a) {
	    return typeof a === 'function';
	}
	exports.isFunction = isFunction;
	function isEventEmitter(a) {
	    return a && (a instanceof EventEmitter || isFunction(a.on) && isFunction(a.once) && isFunction(a.off) && isFunction(a.trigger));
	}
	exports.isEventEmitter = isEventEmitter;
	var EventEmitter = function () {
	    function EventEmitter() {}
	    Object.defineProperty(EventEmitter.prototype, "listeners", {
	        get: function get() {
	            return this._listeners;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    EventEmitter.prototype.on = function (event, fn, ctx, once) {
	        if (once === void 0) {
	            once = false;
	        }
	        var events = (this._listeners || (this._listeners = {}))[event] || (this._listeners[event] = []);
	        events.push({
	            name: event,
	            once: once,
	            handler: fn,
	            ctx: ctx || this
	        });
	        return this;
	    };
	    EventEmitter.prototype.once = function (event, fn, ctx) {
	        return this.on(event, fn, ctx, true);
	    };
	    EventEmitter.prototype.off = function (eventName, fn) {
	        this._listeners = this._listeners || {};
	        if (eventName == null) {
	            this._listeners = {};
	        } else if (this._listeners[eventName]) {
	            var events = this._listeners[eventName];
	            if (fn == null) {
	                this._listeners[eventName] = [];
	            } else {
	                for (var i = 0; i < events.length; i++) {
	                    var event_1 = events[i];
	                    if (events[i].handler == fn) {
	                        this._listeners[eventName].splice(i, 1);
	                    }
	                }
	            }
	        }
	        return this;
	    };
	    EventEmitter.prototype.trigger = function (eventName) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        this._listeners = this._listeners || {};
	        var events = (this._listeners[eventName] || []).concat(this._listeners['all'] || []).concat(this._listeners["*"] || []);
	        if (EventEmitter.debugCallback) EventEmitter.debugCallback(this.constructor.name, this.name, eventName, args, events);
	        var event,
	            a,
	            len = events.length,
	            index;
	        var calls = [];
	        var alls = [];
	        for (var i = 0, ii = events.length; i < ii; i++) {
	            event = events[i];
	            a = args;
	            if (events[i].name == 'all' || events[i].name == '*') {
	                alls.push(events[i]);
	            } else {
	                calls.push(events[i]);
	            }
	            if (events[i].once === true) {
	                index = this._listeners[events[i].name].indexOf(events[i]);
	                this._listeners[events[i].name].splice(index, 1);
	            }
	        }
	        if (alls.length) {
	            var a_1 = [eventName].concat(args);
	            this._executeListener(alls, a_1);
	        }
	        if (calls.length) this._executeListener(calls, args);
	        return this;
	    };
	    EventEmitter.prototype._executeListener = function (func, args) {
	        EventEmitter.executeListenerFunction(func, args);
	    };
	    EventEmitter.prototype.listenTo = function (obj, event, fn, ctx, once) {
	        if (once === void 0) {
	            once = false;
	        }
	        if (!isEventEmitter(obj)) {
	            if (EventEmitter.throwOnError) throw new EventEmitterError("obj is not an EventEmitter", once ? "listenToOnce" : "listenTo", this, obj);
	            return this;
	        }
	        var listeningTo, id, meth;
	        listeningTo = this._listeningTo || (this._listeningTo = {});
	        id = obj.listenId || (obj.listenId = getID());
	        listeningTo[id] = obj;
	        meth = once ? 'once' : 'on';
	        obj[meth](event, fn, this);
	        return this;
	    };
	    EventEmitter.prototype.listenToOnce = function (obj, event, fn, ctx) {
	        return this.listenTo(obj, event, fn, ctx, true);
	    };
	    EventEmitter.prototype.stopListening = function (obj, event, callback) {
	        if (obj && !isEventEmitter(obj)) {
	            if (EventEmitter.throwOnError) throw new EventEmitterError("obj is not an EventEmitter", "stopListening", this, obj);
	            return this;
	        }
	        var listeningTo = this._listeningTo;
	        if (!listeningTo) return this;
	        var remove = !event && !callback;
	        if (!callback && (typeof event === "undefined" ? "undefined" : _typeof(event)) === 'object') callback = this;
	        if (obj) (listeningTo = {})[obj.listenId] = obj;
	        for (var id in listeningTo) {
	            obj = listeningTo[id];
	            obj.off(event, callback, this);
	            if (remove || !Object.keys(obj.listeners).length) delete this._listeningTo[id];
	        }
	        return this;
	    };
	    EventEmitter.prototype.destroy = function () {
	        this.stopListening();
	        this.off();
	    };
	    EventEmitter.throwOnError = true;
	    EventEmitter.executeListenerFunction = function (func, args) {
	        callFunc(func, args);
	    };
	    return EventEmitter;
	}();
	exports.EventEmitter = EventEmitter;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var objects_1 = __webpack_require__(7);
	var arrays_1 = __webpack_require__(8);
	var strings_1 = __webpack_require__(9);
	var idCounter = 0;
	var nativeBind = Function.prototype.bind;
	function ajax() {
	    var e;
	    if (window.hasOwnProperty('XMLHttpRequest')) {
	        return new XMLHttpRequest();
	    }
	    try {
	        return new ActiveXObject('msxml2.xmlhttp.6.0');
	    } catch (_error) {
	        e = _error;
	    }
	    try {
	        return new ActiveXObject('msxml2.xmlhttp.3.0');
	    } catch (_error) {
	        e = _error;
	    }
	    try {
	        return new ActiveXObject('msxml2.xmlhttp');
	    } catch (_error) {
	        e = _error;
	    }
	    return e;
	}
	exports.ajax = ajax;
	;
	function uniqueId(prefix) {
	    if (prefix === void 0) {
	        prefix = '';
	    }
	    return prefix + ++idCounter;
	}
	exports.uniqueId = uniqueId;
	function proxy(from, to, fns) {
	    if (!Array.isArray(fns)) fns = [fns];
	    fns.forEach(function (fn) {
	        if (typeof to[fn] === 'function') {
	            from[fn] = bind(to[fn], to);
	        }
	    });
	}
	exports.proxy = proxy;
	function bind(method, context) {
	    var args = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        args[_i - 2] = arguments[_i];
	    }
	    if (typeof method !== 'function') throw new Error('method not at function');
	    if (nativeBind != null) return nativeBind.call.apply(nativeBind, [method, context].concat(args));
	    args = args || [];
	    var fnoop = function fnoop() {};
	    var fBound = function fBound() {
	        var ctx = this instanceof fnoop ? this : context;
	        return callFunc(method, ctx, args.concat(arrays_1.slice(arguments)));
	    };
	    fnoop.prototype = this.prototype;
	    fBound.prototype = new fnoop();
	    return fBound;
	}
	exports.bind = bind;
	function callFunc(fn, ctx, args) {
	    if (args === void 0) {
	        args = [];
	    }
	    switch (args.length) {
	        case 0:
	            return fn.call(ctx);
	        case 1:
	            return fn.call(ctx, args[0]);
	        case 2:
	            return fn.call(ctx, args[0], args[1]);
	        case 3:
	            return fn.call(ctx, args[0], args[1], args[2]);
	        case 4:
	            return fn.call(ctx, args[0], args[1], args[2], args[3]);
	        case 5:
	            return fn.call(ctx, args[0], args[1], args[2], args[3], args[4]);
	        default:
	            return fn.apply(ctx, args);
	    }
	}
	exports.callFunc = callFunc;
	function equal(a, b) {
	    return eq(a, b, [], []);
	}
	exports.equal = equal;
	function triggerMethodOn(obj, eventName, args) {
	    var ev = strings_1.camelcase("on-" + eventName.replace(':', '-'));
	    if (obj[ev] && typeof obj[ev] === 'function') {
	        callFunc(obj[ev], obj, args);
	    }
	    if (typeof obj.trigger === 'function') {
	        args = [eventName].concat(args);
	        callFunc(obj.trigger, obj, args);
	    }
	}
	exports.triggerMethodOn = triggerMethodOn;
	function getOption(option, objs) {
	    for (var _i = 0, objs_1 = objs; _i < objs_1.length; _i++) {
	        var o = objs_1[_i];
	        if (objects_1.isObject(o) && o[option]) return o[option];
	    }
	    return null;
	}
	exports.getOption = getOption;
	function inherits(parent, protoProps, staticProps) {
	    var child;
	    if (protoProps && objects_1.has(protoProps, 'constructor')) {
	        child = protoProps.constructor;
	    } else {
	        child = function child() {
	            return parent.apply(this, arguments);
	        };
	    }
	    objects_1.extend(child, parent, staticProps);
	    var Surrogate = function Surrogate() {
	        this.constructor = child;
	    };
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate();
	    if (protoProps) objects_1.extend(child.prototype, protoProps);
	    child.__super__ = parent.prototype;
	    return child;
	}
	exports.inherits = inherits;
	exports.nextTick = function () {
	    var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
	    var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;
	    if (canSetImmediate) {
	        return function (f) {
	            return window.setImmediate(f);
	        };
	    }
	    if (canPost) {
	        var queue = [];
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);
	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }
	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	}();
	function eq(a, b, aStack, bStack) {
	    if (a === b) return a !== 0 || 1 / a == 1 / b;
	    if (a == null || b == null) return a === b;
	    var className = toString.call(a);
	    if (className != toString.call(b)) return false;
	    switch (className) {
	        case '[object String]':
	            return a == String(b);
	        case '[object Number]':
	            return a !== +a ? b !== +b : a === 0 ? 1 / a === 1 / b : a === +b;
	        case '[object Date]':
	        case '[object Boolean]':
	            return +a == +b;
	        case '[object RegExp]':
	            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
	    }
	    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') return false;
	    var length = aStack.length;
	    while (length--) {
	        if (aStack[length] == a) return bStack[length] == b;
	    }
	    var aCtor = a.constructor,
	        bCtor = b.constructor;
	    if (aCtor !== bCtor && !(typeof aCtor === 'function' && aCtor instanceof aCtor && typeof bCtor === 'function' && bCtor instanceof bCtor)) {
	        return false;
	    }
	    aStack.push(a);
	    bStack.push(b);
	    var size = 0,
	        result = true;
	    if (className === '[object Array]') {
	        size = a.length;
	        result = size === b.length;
	        if (result) {
	            while (size--) {
	                if (!(result = eq(a[size], b[size], aStack, bStack))) break;
	            }
	        }
	    } else {
	        for (var key in a) {
	            if (objects_1.has(a, key)) {
	                size++;
	                if (!(result = objects_1.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
	            }
	        }
	        if (result) {
	            for (key in b) {
	                if (objects_1.has(b, key) && !size--) break;
	            }
	            result = !size;
	        }
	    }
	    aStack.pop();
	    bStack.pop();
	    return result;
	}
	;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var utils_1 = __webpack_require__(6);
	var __has = Object.prototype.hasOwnProperty;
	function objToPaths(obj, separator) {
	    if (separator === void 0) {
	        separator = ".";
	    }
	    var ret = {};
	    for (var key in obj) {
	        var val = obj[key];
	        if (val && (val.constructor === Object || val.constructor === Array) && !isEmpty(val)) {
	            var obj2 = objToPaths(val);
	            for (var key2 in obj2) {
	                var val2 = obj2[key2];
	                ret[key + separator + key2] = val2;
	            }
	        } else {
	            ret[key] = val;
	        }
	    }
	    return ret;
	}
	exports.objToPaths = objToPaths;
	function isObject(obj) {
	    return obj === Object(obj);
	}
	exports.isObject = isObject;
	function isEmpty(obj) {
	    return Object.keys(obj).length === 0;
	}
	exports.isEmpty = isEmpty;
	function extend(obj) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    if (!isObject(obj)) return obj;
	    var o, k;
	    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
	        o = args_1[_a];
	        if (!isObject(o)) continue;
	        for (k in o) {
	            if (has(o, k)) obj[k] = o[k];
	        }
	    }
	    return obj;
	}
	exports.extend = extend;
	function assign(target) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert first argument to object');
	    }
	    var to = Object(target);
	    for (var i = 0, ii = args.length; i < ii; i++) {
	        var nextSource = args[i];
	        if (nextSource === undefined || nextSource === null) {
	            continue;
	        }
	        nextSource = Object(nextSource);
	        var keysArray = Object.keys(Object(nextSource));
	        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	            var nextKey = keysArray[nextIndex];
	            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	            if (desc !== undefined && desc.enumerable) {
	                to[nextKey] = nextSource[nextKey];
	            }
	        }
	    }
	    return to;
	}
	exports.assign = assign;
	function has(obj, prop) {
	    return __has.call(obj, prop);
	}
	exports.has = has;
	function pick(obj, props) {
	    var out = {},
	        prop;
	    for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
	        prop = props_1[_i];
	        if (has(obj, prop)) out[prop] = obj[prop];
	    }
	    return out;
	}
	exports.pick = pick;
	function omit(obj, props) {
	    var out = {};
	    for (var key in obj) {
	        if (!!~props.indexOf(key)) continue;
	        out[key] = obj[key];
	    }
	    return out;
	}
	exports.omit = omit;
	function result(obj, prop, ctx, args) {
	    var ret = obj[prop];
	    return typeof ret === 'function' ? utils_1.callFunc(ret, ctx, args || []) : ret;
	}
	exports.result = result;
	function values(obj) {
	    var output = [];
	    for (var k in obj) {
	        if (has(obj, k)) {
	            output.push(obj[k]);
	        }
	    }return output;
	}
	exports.values = values;
	function intersectionObjects(a, b, predicate) {
	    var results = [],
	        aElement,
	        existsInB;
	    for (var i = 0, ii = a.length; i < ii; i++) {
	        aElement = a[i];
	        existsInB = (b, function (bElement) {
	            return predicate(bElement, aElement);
	        });
	        if (existsInB) {
	            results.push(aElement);
	        }
	    }
	    return results;
	}
	function intersection(results) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    var lastArgument = args[args.length - 1];
	    var arrayCount = args.length;
	    var areEqualFunction = utils_1.equal;
	    if (typeof lastArgument === "function") {
	        areEqualFunction = lastArgument;
	        arrayCount--;
	    }
	    for (var i = 0; i < arrayCount; i++) {
	        var array = args[i];
	        results = intersectionObjects(results, array, areEqualFunction);
	        if (results.length === 0) break;
	    }
	    return results;
	}
	exports.intersection = intersection;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var utils_1 = __webpack_require__(6);
	var __slice = Array.prototype.slice;
	function isArray(array) {
	    return Array.isArray(array);
	}
	exports.isArray = isArray;
	function unique(array) {
	    return array.filter(function (e, i) {
	        for (i += 1; i < array.length; i += 1) {
	            if (utils_1.equal(e, array[i])) {
	                return false;
	            }
	        }
	        return true;
	    });
	}
	exports.unique = unique;
	function any(array, predicate) {
	    for (var i = 0, ii = array.length; i < ii; i++) {
	        if (predicate(array[i])) return true;
	    }
	    return false;
	}
	exports.any = any;
	function indexOf(array, item) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        if (array[i] === item) return i;
	    }return -1;
	}
	exports.indexOf = indexOf;
	function find(array, callback, ctx) {
	    var v;
	    for (var i = 0, ii = array.length; i < ii; i++) {
	        if (callback.call(ctx, array[i])) return array[i];
	    }
	    return null;
	}
	exports.find = find;
	function filter(array, callback, ctx) {
	    return array.filter(function (e, i) {
	        return callback.call(ctx, e, i);
	    });
	}
	exports.filter = filter;
	function slice(array, begin, end) {
	    return __slice.call(array, begin, end);
	}
	exports.slice = slice;
	function flatten(arr) {
	    return arr.reduce(function (flat, toFlatten) {
	        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
	    }, []);
	}
	exports.flatten = flatten;
	function sortBy(obj, value, context) {
	    var iterator = typeof value === 'function' ? value : function (obj) {
	        return obj[value];
	    };
	    return obj.map(function (value, index, list) {
	        return {
	            value: value,
	            index: index,
	            criteria: iterator.call(context, value, index, list)
	        };
	    }).sort(function (left, right) {
	        var a = left.criteria,
	            b = right.criteria;
	        if (a !== b) {
	            if (a > b || a === void 0) return 1;
	            if (a < b || b === void 0) return -1;
	        }
	        return left.index - right.index;
	    }).map(function (item) {
	        return item.value;
	    });
	}
	exports.sortBy = sortBy;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	function isString(a) {
	    return typeof a === 'string';
	}
	exports.isString = isString;
	function camelcase(input) {
	    return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
	        return group1.toUpperCase();
	    });
	}
	exports.camelcase = camelcase;
	;
	function truncate(str, length) {
	    var n = str.substring(0, Math.min(length, str.length));
	    return n + (n.length == str.length ? '' : '...');
	}
	exports.truncate = truncate;
	function humanFileSize(bytes, si) {
	    if (si === void 0) {
	        si = false;
	    }
	    var thresh = si ? 1000 : 1024;
	    if (Math.abs(bytes) < thresh) {
	        return bytes + ' B';
	    }
	    var units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
	    var u = -1;
	    do {
	        bytes /= thresh;
	        ++u;
	    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
	    return bytes.toFixed(1) + ' ' + units[u];
	}
	exports.humanFileSize = humanFileSize;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var object_1 = __webpack_require__(4);
	var utils_1 = __webpack_require__(6);
	var objects_1 = __webpack_require__(7);
	function isModel(a) {
	    if (a == null) return false;
	    return a instanceof Model || a.__classType === 'Model' || a.__classType === 'RestModel';
	}
	exports.isModel = isModel;
	var Model = function (_super) {
	    __extends(Model, _super);
	    function Model(attributes, options) {
	        if (attributes === void 0) {
	            attributes = {};
	        }
	        if (options === void 0) {
	            options = {};
	        }
	        _super.call(this);
	        options = options || {};
	        this._attributes = {};
	        this.options = options;
	        if (options.parse) attributes = this.parse(attributes);
	        this.set(attributes, { silent: true, array: false });
	        this.uid = utils_1.uniqueId('uid');
	        this._changed = {};
	        this.collection = options.collection;
	        this.idAttribute = options.idAttribute || this.idAttribute || 'id';
	    }
	    Object.defineProperty(Model.prototype, "__classType", {
	        get: function get() {
	            return 'Model';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    Object.defineProperty(Model.prototype, "id", {
	        get: function get() {
	            if (this.idAttribute in this._attributes) return this._attributes[this.idAttribute];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Model.prototype, "isNew", {
	        get: function get() {
	            return this.id == null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Model.prototype, "isDirty", {
	        get: function get() {
	            return this.hasChanged();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Model.prototype.set = function (key, val, options) {
	        if (options === void 0) {
	            options = {};
	        }
	        var attr,
	            attrs = {},
	            unset,
	            changes,
	            silent,
	            changing,
	            prev,
	            current;
	        if (key == null) return this;
	        if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
	            attrs = key;
	            options = val;
	        } else {
	            attrs[key] = val;
	        }
	        options || (options = {});
	        unset = options.unset;
	        silent = options.silent;
	        changes = [];
	        changing = this._changing;
	        this._changing = true;
	        if (!changing) {
	            this._previousAttributes = objects_1.extend(Object.create(null), this._attributes);
	            this._changed = {};
	        }
	        current = this._attributes, prev = this._previousAttributes;
	        for (attr in attrs) {
	            val = attrs[attr];
	            if (!utils_1.equal(current[attr], val)) changes.push(attr);
	            if (!utils_1.equal(prev[attr], val)) {
	                this._changed[attr] = val;
	            } else {
	                delete this._changed[attr];
	            }
	            unset ? delete current[attr] : current[attr] = val;
	        }
	        if (!silent) {
	            if (changes.length) this._pending = !!options;
	            for (var i = 0, l = changes.length; i < l; i++) {
	                this.trigger('change:' + changes[i], this, current[changes[i]], options);
	            }
	        }
	        if (changing) return this;
	        if (!silent) {
	            while (this._pending) {
	                options = this._pending;
	                this._pending = false;
	                this.trigger('change', this, options);
	            }
	        }
	        this._pending = false;
	        this._changing = false;
	        return this;
	    };
	    Model.prototype.get = function (key) {
	        return this._attributes[key];
	    };
	    Model.prototype.unset = function (key, options) {
	        this.set(key, void 0, objects_1.extend({}, options, { unset: true }));
	    };
	    Model.prototype.has = function (attr) {
	        return this.get(attr) != null;
	    };
	    Model.prototype.hasChanged = function (attr) {
	        if (attr == null) return !!Object.keys(this.changed).length;
	        return objects_1.has(this.changed, attr);
	    };
	    Model.prototype.clear = function (options) {
	        var attrs = {};
	        for (var key in this._attributes) {
	            attrs[key] = void 0;
	        }return this.set(attrs, objects_1.extend({}, options, { unset: true }));
	    };
	    Object.defineProperty(Model.prototype, "changed", {
	        get: function get() {
	            return objects_1.extend({}, this._changed);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Model.prototype.changedAttributes = function (diff) {
	        if (!diff) return this.hasChanged() ? objects_1.extend(Object.create(null), this.changed) : false;
	        var val,
	            changed = {};
	        var old = this._changing ? this._previousAttributes : this._attributes;
	        for (var attr in diff) {
	            if (utils_1.equal(old[attr], val = diff[attr])) continue;
	            (changed || (changed = {}))[attr] = val;
	        }
	        return changed;
	    };
	    Model.prototype.previous = function (attr) {
	        if (attr == null || !this._previousAttributes) return null;
	        return this._previousAttributes[attr];
	    };
	    Model.prototype.previousAttributes = function () {
	        return objects_1.extend(Object.create(null), this._previousAttributes);
	    };
	    Model.prototype.toJSON = function () {
	        return JSON.parse(JSON.stringify(this._attributes));
	    };
	    Model.prototype.clone = function () {
	        return new this.constructor(this._attributes, this.options);
	    };
	    Model.prototype.parse = function (attr, options) {
	        return attr;
	    };
	    Model.prototype.remove = function (options) {
	        this.trigger('remove', this, this.collection, options);
	    };
	    Model.prototype.pick = function (attr) {
	        var attrs = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            attrs[_i - 1] = arguments[_i];
	        }
	        if (arguments.length === 1) {
	            if (!Array.isArray(attr)) {
	                attrs = [attr];
	            } else {
	                attrs = attr;
	            }
	        } else {
	            attrs = [attr].concat(attrs);
	        }
	        var out = {};
	        for (var i = 0, ii = attrs.length; i < ii; i++) {
	            if (this.has(attrs[i])) out[attrs[i]] = this.get(attrs[i]);
	        }
	        return out;
	    };
	    return Model;
	}(object_1.BaseObject);
	exports.Model = Model;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var utils_1 = __webpack_require__(6);
	var objects_1 = __webpack_require__(7);
	var model_1 = __webpack_require__(10);
	function objToPaths(obj, separator, array) {
	    if (separator === void 0) {
	        separator = ".";
	    }
	    if (array === void 0) {
	        array = true;
	    }
	    var ret = {};
	    if (!obj) return obj;
	    for (var key in obj) {
	        var val = obj[key];
	        if (val && (val.constructor === Object || array && val.constructor === Array) && !objects_1.isEmpty(val)) {
	            var obj2 = objToPaths(val);
	            for (var key2 in obj2) {
	                var val2 = obj2[key2];
	                ret[key + separator + key2] = val2;
	            }
	        } else {
	            ret[key] = val;
	        }
	    }
	    return ret;
	}
	exports.objToPaths = objToPaths;
	function isOnNestedModel(obj, path, separator) {
	    if (separator === void 0) {
	        separator = ".";
	    }
	    var fields = path ? path.split(separator) : [];
	    if (!obj) return false;
	    var result = obj;
	    for (var i = 0, n = fields.length; i < n; i++) {
	        if (model_1.isModel(result)) return true;
	        if (!result) return false;
	        result = result[fields[i]];
	    }
	    return false;
	}
	function getNested(obj, path, return_exists, separator) {
	    if (separator === void 0) {
	        separator = ".";
	    }
	    if (!obj) return null;
	    var fields = path ? path.split(separator) : [];
	    var result = obj;
	    return_exists || return_exists === false;
	    for (var i = 0, n = fields.length; i < n; i++) {
	        if (return_exists && !objects_1.has(result, fields[i])) {
	            return false;
	        }
	        result = model_1.isModel(result) ? result.get(fields[i]) : result[fields[i]];
	        if (result == null && i < n - 1) {
	            result = {};
	        }
	        if (typeof result === 'undefined') {
	            if (return_exists) {
	                return true;
	            }
	            return result;
	        }
	    }
	    if (return_exists) {
	        return true;
	    }
	    return result;
	}
	exports.getNested = getNested;
	function setNested(obj, path, val, options) {
	    options = options || {};
	    if (!obj) return null;
	    var separator = options.separator || ".";
	    var fields = path ? path.split(separator) : [];
	    var result = obj;
	    for (var i = 0, n = fields.length; i < n && result !== undefined; i++) {
	        var field = fields[i];
	        if (i === n - 1) {
	            options.unset ? delete result[field] : result[field] = val;
	        } else {
	            if (typeof result[field] === 'undefined' || !objects_1.isObject(result[field])) {
	                if (options.unset) {
	                    delete result[field];
	                    return;
	                }
	                var nextField = fields[i + 1];
	                result[field] = /^\d+$/.test(nextField) ? [] : {};
	            }
	            result = result[field];
	            if (model_1.isModel(result)) {
	                var rest = fields.slice(i + 1);
	                return result.set(rest.join('.'), val, options);
	            }
	        }
	    }
	}
	function deleteNested(obj, path) {
	    setNested(obj, path, null, {
	        unset: true
	    });
	}
	var NestedModel = function (_super) {
	    __extends(NestedModel, _super);
	    function NestedModel() {
	        _super.apply(this, arguments);
	    }
	    NestedModel.prototype.get = function (attr) {
	        return getNested(this._attributes, attr);
	    };
	    NestedModel.prototype.set = function (key, val, options) {
	        var _this = this;
	        var attr, attrs, unset, changes, silent, changing, prev, current;
	        if (key == null) return this;
	        if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
	            attrs = key;
	            options = val || {};
	        } else {
	            (attrs = {})[key] = val;
	        }
	        options || (options = {});
	        unset = options.unset;
	        silent = options.silent;
	        changes = [];
	        changing = this._changing;
	        this._changing = true;
	        if (!changing) {
	            this._previousAttributes = objects_1.extend({}, this._attributes);
	            this._changed = {};
	        }
	        current = this._attributes, prev = this._previousAttributes;
	        var separator = NestedModel.keyPathSeparator;
	        attrs = objToPaths(attrs, separator, options.array);
	        var alreadyTriggered = {};
	        if (!this._nestedListener) this._nestedListener = {};
	        for (attr in attrs) {
	            val = attrs[attr];
	            var curVal = getNested(current, attr);
	            if (!utils_1.equal(curVal, val)) {
	                changes.push(attr);
	                this._changed[attr] = val;
	            }
	            if (!utils_1.equal(getNested(prev, attr), val)) {
	                setNested(this.changed, attr, val, options);
	            } else {
	                deleteNested(this.changed, attr);
	            }
	            if (model_1.isModel(curVal)) {
	                var fn = this._nestedListener[attr];
	                if (fn) {
	                    curVal.off('change', fn);
	                    delete this._nestedListener[attr];
	                }
	            }
	            if (unset) {
	                deleteNested(current, attr);
	            } else {
	                if (!isOnNestedModel(current, attr, separator)) {
	                    if (model_1.isModel(val)) {
	                        var fn = function fn(model) {
	                            if (model.changed == undefined || objects_1.isEmpty(model.changed)) return;
	                            for (var key_1 in model.changed) {
	                                _this._changed[attr + separator + key_1] = model.changed[key_1];
	                                _this.trigger('change:' + attr + separator + key_1, model.changed[key_1]);
	                            }
	                            _this.trigger('change', _this, options);
	                        };
	                        this._nestedListener[attr] = fn;
	                        val.on('change', fn);
	                    }
	                } else {
	                    alreadyTriggered[attr] = true;
	                }
	                setNested(current, attr, val, options);
	            }
	        }
	        if (!silent) {
	            if (changes.length) this._pending = true;
	            for (var i = 0, l = changes.length; i < l; i++) {
	                var key_2 = changes[i];
	                if (!alreadyTriggered.hasOwnProperty(key_2) || !alreadyTriggered[key_2]) {
	                    alreadyTriggered[key_2] = true;
	                    this.trigger('change:' + key_2, this, getNested(current, key_2), options);
	                }
	                var fields = key_2.split(separator);
	                for (var n = fields.length - 1; n > 0; n--) {
	                    var parentKey = fields.slice(0, n).join(separator),
	                        wildcardKey = parentKey + separator + '*';
	                    if (!alreadyTriggered.hasOwnProperty(wildcardKey) || !alreadyTriggered[wildcardKey]) {
	                        alreadyTriggered[wildcardKey] = true;
	                        this.trigger('change:' + wildcardKey, this, getNested(current, parentKey), options);
	                    }
	                    if (!alreadyTriggered.hasOwnProperty(parentKey) || !alreadyTriggered[parentKey]) {
	                        alreadyTriggered[parentKey] = true;
	                        this.trigger('change:' + parentKey, this, getNested(current, parentKey), options);
	                    }
	                }
	            }
	        }
	        if (changing) return this;
	        if (!silent) {
	            while (this._pending) {
	                this._pending = false;
	                this.trigger('change', this, options);
	            }
	        }
	        this._pending = false;
	        this._changing = false;
	        return this;
	    };
	    NestedModel.prototype.clear = function (options) {
	        var attrs = {};
	        var shallowAttributes = objToPaths(this._attributes);
	        for (var key in shallowAttributes) {
	            attrs[key] = void 0;
	        }return this.set(attrs, objects_1.extend({}, options, {
	            unset: true
	        }));
	    };
	    NestedModel.prototype.hasChanged = function (attr) {
	        if (attr == null) {
	            return !Object.keys(this.changed).length;
	        }
	        return getNested(this.changed, attr) !== undefined;
	    };
	    NestedModel.prototype.changedAttributes = function (diff) {
	        if (!diff) return this.hasChanged() ? objToPaths(this.changed) : false;
	        var old = this._changing ? this._previousAttributes : this._attributes;
	        diff = objToPaths(diff);
	        old = objToPaths(old);
	        var val,
	            changed = false;
	        for (var attr in diff) {
	            if (utils_1.equal(old[attr], val = diff[attr])) continue;
	            (changed || (changed = {}))[attr] = val;
	        }
	        return changed;
	    };
	    NestedModel.prototype.previous = function (attr) {
	        if (attr == null || !this._previousAttributes) {
	            return null;
	        }
	        return getNested(this._previousAttributes, attr);
	    };
	    NestedModel.prototype.previousAttributes = function () {
	        return objects_1.extend({}, this._previousAttributes);
	    };
	    NestedModel.prototype.pick = function (attr) {
	        var attrs = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            attrs[_i - 1] = arguments[_i];
	        }
	        if (arguments.length === 1) {
	            attr = !Array.isArray(attr) ? [attr] : attr;
	        } else {
	            attrs = [attr].concat(attrs);
	        }
	        var out = {};
	        for (var i = 0, ii = attrs.length; i < ii; i++) {
	            if (this.has(attrs[i])) {
	                setNested(out, attrs[i], this.get(attrs[i]));
	            }
	        }
	        return out;
	    };
	    NestedModel.prototype.destroy = function () {
	        for (var key in this._nestedListener) {
	            var fn = this._nestedListener[key];
	            if (fn) {
	                var m = this.get(key);
	                if (m) m.off(key, fn);
	            }
	        }
	        _super.prototype.destroy.call(this);
	    };
	    NestedModel.keyPathSeparator = '.';
	    return NestedModel;
	}(model_1.Model);
	exports.NestedModel = NestedModel;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var objects_1 = __webpack_require__(7);
	var collection_1 = __webpack_require__(3);
	var rest_model_1 = __webpack_require__(13);
	var promises_1 = __webpack_require__(14);
	var persistence_1 = __webpack_require__(15);
	function isRestCollection(a) {
	    if (a == null) return false;
	    return a instanceof RestCollection || a.__classType == 'RestCollection';
	}
	exports.isRestCollection = isRestCollection;
	var RestCollection = function (_super) {
	    __extends(RestCollection, _super);
	    function RestCollection(models, options) {
	        if (options === void 0) {
	            options = {};
	        }
	        _super.call(this, models, options);
	        if (options.url) this.url = options.url;
	        this.options.queryParameter = this.options.queryParameter || 'q';
	    }
	    Object.defineProperty(RestCollection.prototype, "__classType", {
	        get: function get() {
	            return 'RestCollection';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    RestCollection.prototype.getURL = function () {
	        return typeof this.url === 'function' ? this.url() : this.url;
	    };
	    RestCollection.prototype.fetch = function (options) {
	        var _this = this;
	        options = options ? objects_1.extend({}, options) : {};
	        var url = this.getURL();
	        if (url == null) return promises_1.Promise.reject(new Error('Url or rootURL no specified'));
	        options.url = url;
	        this.trigger('before:fetch');
	        return this.sync(persistence_1.RestMethod.Read, this, options).then(function (results) {
	            _this[options.reset ? 'reset' : 'set'](results.content, options);
	            _this.trigger('fetch');
	            return _this;
	        }).catch(function (e) {
	            _this.trigger('error', e);
	            throw e;
	        });
	    };
	    RestCollection.prototype.create = function (value, options) {
	        var _this = this;
	        options = options ? objects_1.extend({}, options) : {};
	        var model;
	        var url = this.getURL();
	        if (url == null) throw new Error('Url or rootURL no specified');
	        options.url = url;
	        if (rest_model_1.isRestModel(value)) {
	            model = value;
	        } else {
	            model = new this.Model(value, { parse: true, url: this.getURL() });
	        }
	        if (options.wait === void 0) options.wait = true;
	        if (!options.wait) this.add(model, options);
	        this.trigger('before:create', this, model, value, options);
	        model.save().then(function () {
	            if (!options.wait) _this.add(model, options);
	            _this.trigger('create', _this, model, value, options);
	            if (options.complete) options.complete(null, model);
	        }).catch(function (e) {
	            _this.trigger('error', e);
	            if (options.complete) options.complete(e, null);
	        });
	        return model;
	    };
	    RestCollection.prototype.query = function (term, options) {
	        var _this = this;
	        if (options === void 0) {
	            options = {};
	        }
	        var params = (_a = {}, _a[this.options.queryParameter] = term, _a);
	        var url = this.getURL();
	        if (url == null) return promises_1.Promise.reject(new Error('Url or rootURL no specified'));
	        options.url = url;
	        if (!options.params) options.params = {};
	        objects_1.extend(options.params, params);
	        this.trigger('before:query');
	        return this.sync(persistence_1.RestMethod.Read, this, options).then(function (results) {
	            _this.reset(results.content, options);
	            _this.trigger('query');
	            return _this.models;
	        }).catch(function (e) {
	            _this.trigger('error', e);
	            throw e;
	        });
	        var _a;
	    };
	    RestCollection.prototype.sync = function (method, model, options) {
	        return persistence_1.sync(method, model, options);
	    };
	    return RestCollection;
	}(collection_1.Collection);
	exports.RestCollection = RestCollection;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var objects_1 = __webpack_require__(7);
	var promises_1 = __webpack_require__(14);
	var model_1 = __webpack_require__(10);
	var nested_model_1 = __webpack_require__(11);
	var persistence_1 = __webpack_require__(15);
	function isRestModel(a) {
	    if (a == null) return false;
	    return a instanceof model_1.Model || a.__classType === 'RestModel';
	}
	exports.isRestModel = isRestModel;
	function normalize_path(url, id) {
	    var i,
	        p = "";
	    if ((i = url.indexOf('?')) >= 0) {
	        p = url.substr(i);
	        url = url.substr(0, i);
	    }
	    if (url[url.length - 1] !== '/') url += '/';
	    return url + id + p;
	}
	exports.normalize_path = normalize_path;
	var RestModel = function (_super) {
	    __extends(RestModel, _super);
	    function RestModel(attr, options) {
	        if (options === void 0) {
	            options = {};
	        }
	        _super.call(this, attr, options);
	        this.idAttribute = 'id';
	        if (options.url) {
	            this.rootURL = options.url;
	        }
	    }
	    Object.defineProperty(RestModel.prototype, "__classType", {
	        get: function get() {
	            return 'RestModel';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    RestModel.prototype.getURL = function (id) {
	        var url = this.rootURL;
	        if (this.collection && this.collection.getURL()) {
	            url = this.collection.getURL();
	        }
	        id = id || this.id;
	        if (id && url) {
	            url = normalize_path(url, this.id);
	        }
	        return url;
	    };
	    RestModel.prototype.fetch = function (options) {
	        var _this = this;
	        options = options ? objects_1.extend({}, options) : {};
	        var url = this.getURL();
	        if (url == null) return promises_1.Promise.reject(new Error('Url or rootURL no specified'));
	        options.url = url;
	        this.trigger('before:fetch', this, options);
	        return this.sync(persistence_1.RestMethod.Read, this, options).then(function (result) {
	            if (result) _this.set(_this.parse(result.content, options), options);
	            _this.trigger('fetch', _this, result, options);
	            return _this;
	        }).catch(function (e) {
	            _this.trigger('error', _this, e);
	            if (e) {
	                throw e;
	            }
	            return _this;
	        });
	    };
	    RestModel.prototype.save = function (options) {
	        var _this = this;
	        options = options ? objects_1.extend({}, options) : {};
	        this.trigger('before:save', this, options);
	        var method = persistence_1.RestMethod[this.isNew ? 'Create' : options.changed ? 'Patch' : "Update"];
	        var url = this.getURL(this.id);
	        if (url == null) return promises_1.Promise.reject(new Error('Url or rootURL no specified'));
	        options.url = url;
	        return this.sync(method, this, options).then(function (result) {
	            _this.set(result.content, options);
	            _this.trigger('save', _this, result, options);
	            return _this;
	        }).catch(function (e) {
	            _this.trigger('error', _this, e);
	            throw e;
	        });
	    };
	    RestModel.prototype.remove = function (options) {
	        var _this = this;
	        options = options ? objects_1.extend({}, options) : {};
	        if (this.isNew) {
	            _super.prototype.remove.call(this, options);
	            return promises_1.Promise.resolve(this);
	        }
	        var url = this.getURL(this.id);
	        if (url == null) return promises_1.Promise.reject(new Error('Url or rootURL no specified'));
	        this.trigger('before:remove', this, options);
	        if (!options.wait) _super.prototype.remove.call(this, options);
	        options.url = url;
	        return this.sync(persistence_1.RestMethod.Delete, this, options).then(function (result) {
	            if (!options.wait) _super.prototype.remove.call(_this, options);
	            return _this;
	        }).catch(function (e) {
	            _this.trigger('error', _this, e);
	            throw e;
	        });
	    };
	    RestModel.prototype.sync = function (method, model, options) {
	        return persistence_1.sync(method, model, options);
	    };
	    return RestModel;
	}(nested_model_1.NestedModel);
	exports.RestModel = RestModel;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var objects_1 = __webpack_require__(7);
	var arrays_1 = __webpack_require__(8);
	var utils_1 = __webpack_require__(6);
	exports.Promise = typeof window === 'undefined' ? global.Promise : window.Promise;
	function isPromise(obj) {
	    return obj && typeof obj.then === 'function';
	}
	exports.isPromise = isPromise;
	function toPromise(obj) {
	    if (!obj) {
	        return obj;
	    }
	    if (isPromise(obj)) {
	        return obj;
	    }
	    if ("function" == typeof obj) {
	        return thunkToPromise.call(this, obj);
	    }
	    if (Array.isArray(obj)) {
	        return arrayToPromise.call(this, obj);
	    }
	    if (objects_1.isObject(obj)) {
	        return objectToPromise.call(this, obj);
	    }
	    return exports.Promise.resolve(obj);
	}
	exports.toPromise = toPromise;
	function thunkToPromise(fn) {
	    var ctx = this;
	    return new exports.Promise(function (resolve, reject) {
	        fn.call(ctx, function (err, res) {
	            if (err) return reject(err);
	            if (arguments.length > 2) res = arrays_1.slice(arguments, 1);
	            resolve(res);
	        });
	    });
	}
	exports.thunkToPromise = thunkToPromise;
	function arrayToPromise(obj) {
	    return exports.Promise.all(obj.map(toPromise, this));
	}
	exports.arrayToPromise = arrayToPromise;
	function objectToPromise(obj) {
	    var results = new obj.constructor();
	    var keys = Object.keys(obj);
	    var promises = [];
	    for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var promise = toPromise.call(this, obj[key]);
	        if (promise && isPromise(promise)) defer(promise, key);else results[key] = obj[key];
	    }
	    return exports.Promise.all(promises).then(function () {
	        return results;
	    });
	    function defer(promise, key) {
	        results[key] = undefined;
	        promises.push(promise.then(function (res) {
	            results[key] = res;
	        }));
	    }
	}
	exports.objectToPromise = objectToPromise;
	function deferred(fn, ctx) {
	    var args = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        args[_i - 2] = arguments[_i];
	    }
	    var ret = {};
	    ret.promise = new exports.Promise(function (resolve, reject) {
	        ret.resolve = resolve;
	        ret.reject = reject;
	        ret.done = function (err, result) {
	            if (err) return reject(err);else resolve(result);
	        };
	    });
	    return ret;
	}
	exports.deferred = deferred;
	;
	function callback(promise, callback, ctx) {
	    promise.then(function (result) {
	        callback.call(ctx, null, result);
	    }).catch(function (err) {
	        callback.call(ctx, err);
	    });
	}
	exports.callback = callback;
	function delay(timeout) {
	    var defer = deferred();
	    timeout == null ? utils_1.nextTick(defer.resolve) : setTimeout(defer.resolve, timeout);
	    return defer.promise;
	}
	exports.delay = delay;
	;
	function eachAsync(array, iterator, context, accumulate) {
	    if (accumulate === void 0) {
	        accumulate = false;
	    }
	    return mapAsync(array, iterator, context, accumulate).then(function () {
	        return void 0;
	    });
	}
	exports.eachAsync = eachAsync;
	function mapAsync(array, iterator, context, accumulate) {
	    if (accumulate === void 0) {
	        accumulate = false;
	    }
	    return new exports.Promise(function (resolve, reject) {
	        var i = 0,
	            len = array.length,
	            errors = [],
	            results = [];
	        function next(err, result) {
	            if (err && !accumulate) return reject(err);
	            if (err) errors.push(err);
	            if (i === len) return errors.length ? reject(arrays_1.flatten(errors)) : resolve(results);
	            var ret = iterator.call(context, array[i++]);
	            if (isPromise(ret)) {
	                ret.then(function (r) {
	                    results.push(r);next(null, r);
	                }, next);
	            } else if (ret instanceof Error) {
	                next(ret);
	            } else {
	                next(null);
	            }
	        }
	        next(null);
	    });
	}
	exports.mapAsync = mapAsync;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var promises_1 = __webpack_require__(14);
	var utils_1 = __webpack_require__(6);
	var request_1 = __webpack_require__(16);
	var HttpError = function (_super) {
	    __extends(HttpError, _super);
	    function HttpError(status, message, body) {
	        _super.call(this, message);
	        this.message = message;
	        this.status = status;
	        this.body = body;
	    }
	    return HttpError;
	}(Error);
	exports.HttpError = HttpError;
	(function (RestMethod) {
	    RestMethod[RestMethod["Create"] = 0] = "Create";
	    RestMethod[RestMethod["Update"] = 1] = "Update";
	    RestMethod[RestMethod["Read"] = 2] = "Read";
	    RestMethod[RestMethod["Patch"] = 3] = "Patch";
	    RestMethod[RestMethod["Delete"] = 4] = "Delete";
	})(exports.RestMethod || (exports.RestMethod = {}));
	var RestMethod = exports.RestMethod;
	;
	var xmlRe = /^(?:application|text)\/xml/;
	var jsonRe = /^application\/json/;
	var getData = function getData(accepts, xhr) {
	    if (accepts == null) accepts = xhr.getResponseHeader('content-type');
	    if (xmlRe.test(accepts)) {
	        return xhr.responseXML;
	    } else if (jsonRe.test(accepts) && xhr.responseText !== '') {
	        return JSON.parse(xhr.responseText);
	    } else {
	        return xhr.responseText;
	    }
	};
	var isValid = function isValid(xhr) {
	    return xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 || xhr.status === 0 && window.location.protocol === 'file:';
	};
	function sync(method, model, options) {
	    var http;
	    switch (method) {
	        case RestMethod.Create:
	            http = 'POST';
	            break;
	        case RestMethod.Update:
	            http = "PUT";
	            break;
	        case RestMethod.Patch:
	            http = "PATCH";
	            break;
	        case RestMethod.Delete:
	            http = "DELETE";
	            break;
	        case RestMethod.Read:
	            http = "GET";
	            break;
	        default:
	            return promises_1.Promise.reject(new Error("Sync: does not recognise method: " + method));
	    }
	    var xhr = utils_1.ajax();
	    var query,
	        url = options.url;
	    if (options.params) query = request_1.queryParam(options.params);
	    if (query) {
	        var sep = options.url.indexOf('?') === -1 ? '?' : '&';
	        url += sep + query;
	    }
	    return new promises_1.Promise(function (resolve, reject) {
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState !== 4) return;
	            var data;
	            try {
	                data = getData(options.headers['Accept'], xhr);
	            } catch (e) {
	                return reject(new Error('Could not serialize response'));
	            }
	            var response = {
	                method: method,
	                status: xhr.status,
	                content: data
	            };
	            utils_1.proxy(response, xhr, ['getAllResponseHeaders', 'getResponseHeader']);
	            if (isValid(xhr)) {
	                return resolve(response);
	            } else {
	                var error = new HttpError(xhr.status, xhr.statusText, data);
	                return reject(error);
	            }
	        };
	        xhr.open(http, url, true);
	        if (!(options.headers && options.headers['Accept'])) {
	            options.headers = {
	                Accept: "application/json"
	            };
	        }
	        xhr.setRequestHeader('Content-Type', "application/json");
	        if (options.headers) for (var key in options.headers) {
	            xhr.setRequestHeader(key, options.headers[key]);
	        }
	        if (options.beforeSend) options.beforeSend(xhr);
	        xhr.send(JSON.stringify(model.toJSON()));
	    });
	}
	exports.sync = sync;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var strings_1 = __webpack_require__(9);
	var objects_1 = __webpack_require__(7);
	var promises_1 = __webpack_require__(14);
	var utils_1 = __webpack_require__(6);
	(function (HttpMethod) {
	    HttpMethod[HttpMethod["GET"] = 0] = "GET";
	    HttpMethod[HttpMethod["PUT"] = 1] = "PUT";
	    HttpMethod[HttpMethod["POST"] = 2] = "POST";
	    HttpMethod[HttpMethod["DELETE"] = 3] = "DELETE";
	    HttpMethod[HttpMethod["HEAD"] = 4] = "HEAD";
	})(exports.HttpMethod || (exports.HttpMethod = {}));
	var HttpMethod = exports.HttpMethod;
	function isResponse(a) {
	    return objects_1.isObject(status) && objects_1.has(a, 'status') && objects_1.has(a, 'statusText') && objects_1.has(a, 'body');
	}
	exports.isResponse = isResponse;
	var HttpError = function (_super) {
	    __extends(HttpError, _super);
	    function HttpError(status, message, body) {
	        _super.call(this, message);
	        if (arguments.length === 1) {
	            if (isResponse(status)) {
	                this.status = status.status;
	                this.message = status.statusText;
	                this.body = status.body;
	            } else {
	                this.status = status;
	            }
	        } else {
	            this.status = status;
	            this.message = message;
	            this.body = body;
	        }
	    }
	    return HttpError;
	}(Error);
	exports.HttpError = HttpError;
	var ResponseError = function (_super) {
	    __extends(ResponseError, _super);
	    function ResponseError(message) {
	        _super.call(this, message);
	    }
	    return ResponseError;
	}(Error);
	exports.ResponseError = ResponseError;
	function queryStringToParams(qs) {
	    var kvp,
	        k,
	        v,
	        ls,
	        params = {},
	        decode = decodeURIComponent;
	    var kvps = qs.split('&');
	    for (var i = 0, l = kvps.length; i < l; i++) {
	        var param = kvps[i];
	        kvp = param.split('='), k = kvp[0], v = kvp[1];
	        if (v == null) v = true;
	        k = decode(k), v = decode(v), ls = params[k];
	        if (Array.isArray(ls)) ls.push(v);else if (ls) params[k] = [ls, v];else params[k] = v;
	    }
	    return params;
	}
	exports.queryStringToParams = queryStringToParams;
	function queryParam(obj) {
	    return Object.keys(obj).reduce(function (a, k) {
	        a.push(k + '=' + encodeURIComponent(obj[k]));return a;
	    }, []).join('&');
	}
	exports.queryParam = queryParam;
	var jsonRe = /^application\/json/,
	    fileProto = /^file:/;
	var isValid = function isValid(xhr, url) {
	    return xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 || xhr.status === 0 && fileProto.test(url) || xhr.status === 0 && window.location.protocol === 'file:';
	};
	var Request = function () {
	    function Request(_method, _url) {
	        this._method = _method;
	        this._url = _url;
	        this._params = {};
	        this._headers = { 'X-Requested-With': 'XMLHttpRequest' };
	        this._xhr = utils_1.ajax();
	    }
	    Request.prototype.uploadProgress = function (fn) {
	        this._xhr.upload.addEventListener('progress', fn);
	        return this;
	    };
	    Request.prototype.downloadProgress = function (fn) {
	        this._xhr.addEventListener('progress', fn);
	        return this;
	    };
	    Request.prototype.header = function (field, value) {
	        if (strings_1.isString(field) && strings_1.isString(value)) {
	            this._headers[field] = value;
	        } else if (objects_1.isObject(field)) {
	            objects_1.extend(this._headers, field);
	        }
	        return this;
	    };
	    Request.prototype.params = function (key, value) {
	        if (arguments.length === 1 && objects_1.isObject(key)) {
	            objects_1.extend(this._params, key);
	        } else if (arguments.length === 2) {
	            this._params[key] = value;
	        }
	        return this;
	    };
	    Request.prototype.withCredentials = function (ret) {
	        this._xhr.withCredentials = ret;
	        return this;
	    };
	    Request.prototype.json = function (data, throwOnInvalid) {
	        var _this = this;
	        if (throwOnInvalid === void 0) {
	            throwOnInvalid = false;
	        }
	        this.header('content-type', 'application/json; charset=utf-8');
	        if (!strings_1.isString(data)) {
	            data = JSON.stringify(data);
	        }
	        return this.end(data, throwOnInvalid).then(function (resp) {
	            var accepts = _this._xhr.getResponseHeader('content-type');
	            if (jsonRe.test(accepts) && resp.body != "") {
	                var json = JSON.parse(resp.body);
	                var jResp = resp;
	                jResp.body = json;
	                return jResp;
	            } else {
	                throw new ResponseError("type error");
	            }
	        });
	    };
	    Request.prototype.end = function (data, throwOnInvalid) {
	        var _this = this;
	        if (throwOnInvalid === void 0) {
	            throwOnInvalid = false;
	        }
	        data = data || this._data;
	        var defer = promises_1.deferred();
	        this._xhr.addEventListener('readystatechange', function () {
	            if (_this._xhr.readyState !== XMLHttpRequest.DONE) return;
	            var resp = {
	                status: _this._xhr.status,
	                statusText: _this._xhr.statusText,
	                body: null,
	                headers: {},
	                isValid: false,
	                contentLength: 0,
	                contentType: null
	            };
	            var headers = _this._xhr.getAllResponseHeaders().split('\r\n');
	            if (headers.length) {
	                for (var i = 0, ii = headers.length; i < ii; i++) {
	                    if (headers[i] === '') continue;
	                    var split = headers[i].split(':');
	                    resp.headers[split[0].trim()] = split[1].trim();
	                }
	            }
	            resp.contentType = resp.headers['Content-Type'];
	            resp.contentLength = parseInt(resp.headers['Content-Length']);
	            if (isNaN(resp.contentLength)) resp.contentLength = 0;
	            resp.body = _this._xhr.response;
	            resp.isValid = isValid(_this._xhr, _this._url);
	            if (!resp.isValid && throwOnInvalid) {
	                return defer.reject(new HttpError(resp));
	            }
	            defer.resolve(resp);
	        });
	        var method = HttpMethod[this._method];
	        var url = this._url;
	        if (data && data === Object(data) && this._method == HttpMethod.GET) {
	            var sep = url.indexOf('?') === -1 ? '?' : '&';
	            var d = sep + queryParam(data);
	            url += d;
	        }
	        url = this._apply_params(url);
	        this._xhr.open(method, url, true);
	        for (var key in this._headers) {
	            this._xhr.setRequestHeader(key, this._headers[key]);
	        }
	        this._xhr.send(data);
	        return defer.promise;
	    };
	    Request.prototype._apply_params = function (url) {
	        var params = {};
	        var idx = url.indexOf('?');
	        if (idx > -1) {
	            params = objects_1.extend(params, queryStringToParams(url.substr(idx + 1)));
	            url = url.substr(0, idx);
	        }
	        objects_1.extend(params, this._params);
	        if (!objects_1.isEmpty(params)) {
	            var sep = url.indexOf('?') === -1 ? '?' : '&';
	            url += sep + queryParam(params);
	        }
	        return url;
	    };
	    return Request;
	}();
	exports.Request = Request;
	exports.request = {};
	['get', 'post', 'put', 'delete', 'patch', 'head'].forEach(function (m) {
	    exports.request[m === 'delete' ? 'del' : m] = function (url) {
	        var mm = HttpMethod[m.toUpperCase()];
	        return new Request(mm, url);
	    };
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var collection_1 = __webpack_require__(3);
	var rest_collection_1 = __webpack_require__(12);
	var promises_1 = __webpack_require__(14);
	var persistence_1 = __webpack_require__(15);
	var objects_1 = __webpack_require__(7);
	var request_1 = __webpack_require__(16);
	var PARAM_TRIM_RE = /[\s'"]/g;
	var URL_TRIM_RE = /[<>\s'"]/g;
	function queryStringToParams(qs) {
	    var kvp,
	        k,
	        v,
	        ls,
	        params = {},
	        decode = decodeURIComponent;
	    var kvps = qs.split('&');
	    for (var i = 0, l = kvps.length; i < l; i++) {
	        var param = kvps[i];
	        kvp = param.split('='), k = kvp[0], v = kvp[1];
	        if (v == null) v = true;
	        k = decode(k), v = decode(v), ls = params[k];
	        if (Array.isArray(ls)) ls.push(v);else if (ls) params[k] = [ls, v];else params[k] = v;
	    }
	    return params;
	}
	var PaginatedCollection = function (_super) {
	    __extends(PaginatedCollection, _super);
	    function PaginatedCollection(models, options) {
	        if (options === void 0) {
	            options = {};
	        }
	        _super.call(this, models, options);
	        this._state = { first: 1, last: -1, current: 1, size: 10 };
	        this._link = {};
	        this.queryParams = {
	            page: 'page',
	            size: 'pageSize'
	        };
	        if (options.queryParams) {
	            objects_1.extend(this.queryParams, options.queryParams);
	        }
	        if (options.firstPage) this._state.first = options.firstPage;
	        if (options.pageSize) this._state.size = options.pageSize;
	        this._state.current = this._state.first;
	        this._page = new collection_1.Collection();
	        this._page.Model = this.Model;
	    }
	    Object.defineProperty(PaginatedCollection.prototype, "page", {
	        get: function get() {
	            return this._page;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PaginatedCollection.prototype.hasNext = function () {
	        return this.hasPage(this._state.current + 1);
	    };
	    PaginatedCollection.prototype.hasPrevious = function () {
	        return this.hasPage(this._state.current - 1);
	    };
	    PaginatedCollection.prototype.hasPage = function (page) {
	        if (this._state.last > -1) {
	            return page <= this._state.last;
	        }
	        return false;
	    };
	    PaginatedCollection.prototype.getPreviousPage = function (options) {
	        options = options ? objects_1.extend({}, options) : {};
	        options.page = this._state.current - 1;
	        return this.getPage(options);
	    };
	    PaginatedCollection.prototype.getNextPage = function (options) {
	        options = options ? objects_1.extend({}, options) : {};
	        options.page = this._state.current + 1;
	        return this.getPage(options);
	    };
	    PaginatedCollection.prototype.getPage = function (options) {
	        options = options ? objects_1.extend({}, options) : {};
	        if (options.page === void 0) return promises_1.Promise.reject(new Error("No page"));
	        if (this._state.last < options.page && this._state.last != -1) {
	            options.page = this._state.last;
	        } else if (options.page < this._state.first) {
	            options.page = this._state.first;
	        }
	        return this.fetch(options);
	    };
	    PaginatedCollection.prototype.fetch = function (options) {
	        var _this = this;
	        if (options === void 0) {
	            options = {};
	        }
	        options = options ? objects_1.extend({}, options) : {};
	        var url;
	        if (!objects_1.has(options, 'page')) {
	            options.page = this._state.current;
	        }
	        var params = options.params ? objects_1.extend({}, options.params) : {};
	        if (objects_1.has(params, this.queryParams.page)) delete params[this.queryParams.page];
	        url = this._link[options.page];
	        if (!url) {
	            url = this.getURL();
	        }
	        if (!url) return promises_1.Promise.reject(new Error("no url specified"));
	        var idx = url.indexOf('?');
	        if (idx > -1) {
	            params = objects_1.extend(params, queryStringToParams(url.substr(idx + 1)));
	            url = url.substr(0, idx);
	        }
	        if (!objects_1.has(params, this.queryParams.page)) {
	            params[this.queryParams.page] = options.page;
	        }
	        options.params = params;
	        options.url = url;
	        this.trigger('before:fetch', this, options);
	        params[this.queryParams.size] = this._state.size;
	        if (!this._link[options.page + '']) {
	            this._link[options.page] = url + '?' + request_1.queryParam({ page: options.page });
	        }
	        return this.sync(persistence_1.RestMethod.Read, this, options).then(function (resp) {
	            _this._processResponse(resp, options);
	            _this.trigger('fetch', _this, resp, options);
	            return _this;
	        }).catch(function (e) {
	            _this.trigger('error', e);
	            throw e;
	        });
	    };
	    PaginatedCollection.prototype._processResponse = function (resp, options) {
	        var currentPage = options.page;
	        var links = this._parseLinkHeaders(resp);
	        if (links.first) this._link[this._state.first] = links.first;
	        if (links.prev) this._link[currentPage - 1] = links.prev;
	        if (links.next) this._link[currentPage + 1] = links.next;
	        if (links.last) {
	            var last = links.last;
	            var idx = last.indexOf('?');
	            if (idx > -1) {
	                var params = queryStringToParams(last.substr(idx + 1));
	                if (objects_1.has(params, this.queryParams.page)) {
	                    this._link[params[this.queryParams.page]] = last;
	                    this._state.last = parseInt(params[this.queryParams.page]);
	                }
	            }
	        }
	        this._state.current = currentPage;
	        var data = resp.content;
	        if (data && !Array.isArray(data)) data = [data];
	        if (!data) return this;
	        data = this.parse(data);
	        for (var i = 0, ii = data.length; i < ii; i++) {
	            data[i] = this._prepareModel(data[i]);
	        }
	        this.add(data);
	        return this;
	    };
	    PaginatedCollection.prototype._parseLinkHeaders = function (resp) {
	        var link = {};
	        if (typeof resp['getResponseHeader'] !== 'function') {
	            return link;
	        }
	        var linkHeader = resp['getResponseHeader']('Link');
	        if (!linkHeader) return link;
	        linkHeader = linkHeader.split(',');
	        var relations = ['first', 'prev', 'next', 'last'];
	        for (var i = 0, ii = linkHeader.length; i < ii; i++) {
	            var linkParts = linkHeader[i].split(';'),
	                url = linkParts[0].replace(URL_TRIM_RE, ''),
	                params = linkParts.slice(1);
	            for (var x = 0, xx = params.length; x < xx; x++) {
	                var paramParts = params[x].split('='),
	                    key = paramParts[0].replace(PARAM_TRIM_RE, ''),
	                    value = paramParts[1].replace(PARAM_TRIM_RE, '');
	                if (key == 'rel' && !!~relations.indexOf(value)) link[value] = url;
	            }
	        }
	        return link;
	    };
	    return PaginatedCollection;
	}(rest_collection_1.RestCollection);
	exports.PaginatedCollection = PaginatedCollection;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var error_1 = __webpack_require__(19);

	var TorstenGuiError = function (_error_1$TorstenClien) {
	  _inherits(TorstenGuiError, _error_1$TorstenClien);

	  function TorstenGuiError() {
	    _classCallCheck(this, TorstenGuiError);

	    return _possibleConstructorReturn(this, (TorstenGuiError.__proto__ || Object.getPrototypeOf(TorstenGuiError)).apply(this, arguments));
	  }

	  return TorstenGuiError;
	}(error_1.TorstenClientError);

	exports.TorstenGuiError = TorstenGuiError;

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TorstenClientError = function (_Error) {
	    _inherits(TorstenClientError, _Error);

	    function TorstenClientError(message) {
	        _classCallCheck(this, TorstenClientError);

	        var _this = _possibleConstructorReturn(this, (TorstenClientError.__proto__ || Object.getPrototypeOf(TorstenClientError)).call(this, message));

	        _this.message = message;
	        return _this;
	    }

	    return TorstenClientError;
	}(Error);

	exports.TorstenClientError = TorstenClientError;
	function createError(msg) {
	    return new TorstenClientError(msg);
	}
	exports.createError = createError;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(21));
	__export(__webpack_require__(22));
	__export(__webpack_require__(25));
	__export(__webpack_require__(23));
	__export(__webpack_require__(26));
	__export(__webpack_require__(24));
	__export(__webpack_require__(27));

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	} : function (obj) {
	    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	};

	function isObject(obj) {
	    return obj === Object(obj);
	}
	exports.isObject = isObject;
	function isString(a) {
	    return typeof a === 'string';
	}
	exports.isString = isString;
	function isNumber(a) {
	    return typeof a === 'number';
	}
	exports.isNumber = isNumber;
	function isRegExp(a) {
	    return a && a instanceof RegExp;
	}
	exports.isRegExp = isRegExp;
	function isDate(a) {
	    return a && a instanceof Date;
	}
	exports.isDate = isDate;
	function isArray(a) {
	    return Array.isArray(a);
	}
	exports.isArray = isArray;
	function isFunction(a) {
	    return typeof a === 'function';
	}
	exports.isFunction = isFunction;
	var idCounter = 0;
	/** Generate an unique id with an optional prefix
	 * @param { string } prefix
	 * @return { string }
	 */
	function uniqueId() {
	    var prefix = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	    return prefix + ++idCounter;
	}
	exports.uniqueId = uniqueId;
	function equal(a, b) {
	    return eq(a, b, [], []);
	}
	exports.equal = equal;
	function getOption(option, objs) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = objs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var o = _step.value;

	            if (isObject(o) && o[option]) return o[option];
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    return null;
	}
	exports.getOption = getOption;
	exports.nextTick = function () {
	    var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
	    var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;
	    if (canSetImmediate) {
	        return function (f) {
	            return window.setImmediate(f);
	        };
	    }
	    if (canPost) {
	        var queue = [];
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);
	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }
	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	}();
	function xmlHttpRequest() {
	    var e;
	    if (window.hasOwnProperty('XMLHttpRequest')) {
	        return new XMLHttpRequest();
	    }
	    try {
	        return new ActiveXObject('msxml2.xmlhttp.6.0');
	    } catch (_error) {
	        e = _error;
	    }
	    try {
	        return new ActiveXObject('msxml2.xmlhttp.3.0');
	    } catch (_error) {
	        e = _error;
	    }
	    try {
	        return new ActiveXObject('msxml2.xmlhttp');
	    } catch (_error) {
	        e = _error;
	    }
	    throw e;
	}
	exports.xmlHttpRequest = xmlHttpRequest;
	var _has = Object.prototype.hasOwnProperty;
	function eq(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a == 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    //if (a instanceof _) a = a._wrapped;
	    //if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className != toString.call(b)) return false;
	    switch (className) {
	        // Strings, numbers, dates, and booleans are compared by value.
	        case '[object String]':
	            // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	            // equivalent to `new String("5")`.
	            return a == String(b);
	        case '[object Number]':
	            // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
	            // other numeric values.
	            return a !== +a ? b !== +b : a === 0 ? 1 / a === 1 / b : a === +b;
	        case '[object Date]':
	        case '[object Boolean]':
	            // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	            // millisecond representations. Note that invalid dates with millisecond representations
	            // of `NaN` are not equivalent.
	            return +a == +b;
	        // RegExps are compared by their source patterns and flags.
	        case '[object RegExp]':
	            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
	    }
	    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') return false;
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	    var length = aStack.length;
	    while (length--) {
	        // Linear search. Performance is inversely proportional to the number of
	        // unique nested structures.
	        if (aStack[length] == a) return bStack[length] == b;
	    }
	    // Objects with different constructors are not equivalent, but `Object`s
	    // from different frames are.
	    var aCtor = a.constructor,
	        bCtor = b.constructor;
	    if (aCtor !== bCtor && !(typeof aCtor === 'function' && aCtor instanceof aCtor && typeof bCtor === 'function' && bCtor instanceof bCtor)) {
	        return false;
	    }
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	    var size = 0,
	        result = true;
	    // Recursively compare objects and arrays.
	    if (className === '[object Array]') {
	        // Compare array lengths to determine if a deep comparison is necessary.
	        size = a.length;
	        result = size === b.length;
	        if (result) {
	            // Deep compare the contents, ignoring non-numeric properties.
	            while (size--) {
	                if (!(result = eq(a[size], b[size], aStack, bStack))) break;
	            }
	        }
	    } else {
	        // Deep compare objects.
	        for (var key in a) {
	            if (_has.call(a, key)) {
	                // Count the expected number of properties.
	                size++;
	                // Deep compare each member.
	                if (!(result = _has.call(b, key) && eq(a[key], b[key], aStack, bStack))) break;
	            }
	        }
	        // Ensure that both objects contain the same number of properties.
	        if (result) {
	            for (key in b) {
	                if (_has.call(b, key) && !size--) break;
	            }
	            result = !size;
	        }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return result;
	}
	;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _toConsumableArray(arr) {
	    if (Array.isArray(arr)) {
	        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	            arr2[i] = arr[i];
	        }return arr2;
	    } else {
	        return Array.from(arr);
	    }
	}

	var arrays_1 = __webpack_require__(23);
	var strings_1 = __webpack_require__(24);
	var objects_1 = __webpack_require__(25);
	var nativeBind = Function.prototype.bind;
	function proxy(from, to, fns) {
	    if (!Array.isArray(fns)) fns = [fns];
	    fns.forEach(function (fn) {
	        if (typeof to[fn] === 'function') {
	            from[fn] = bind(to[fn], to);
	        }
	    });
	}
	exports.proxy = proxy;
	function bind(method, context) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        args[_key - 2] = arguments[_key];
	    }

	    if (typeof method !== 'function') throw new Error('method not at function');
	    if (nativeBind != null) return nativeBind.call.apply(nativeBind, [method, context].concat(_toConsumableArray(args)));
	    args = args || [];
	    var fnoop = function fnoop() {};
	    var fBound = function fBound() {
	        var ctx = this instanceof fnoop ? this : context;
	        return callFunc(method, ctx, args.concat(arrays_1.slice(arguments)));
	    };
	    fnoop.prototype = this.prototype;
	    fBound.prototype = new fnoop();
	    return fBound;
	}
	exports.bind = bind;
	function callFunc(fn, ctx) {
	    var args = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

	    switch (args.length) {
	        case 0:
	            return fn.call(ctx);
	        case 1:
	            return fn.call(ctx, args[0]);
	        case 2:
	            return fn.call(ctx, args[0], args[1]);
	        case 3:
	            return fn.call(ctx, args[0], args[1], args[2]);
	        case 4:
	            return fn.call(ctx, args[0], args[1], args[2], args[3]);
	        case 5:
	            return fn.call(ctx, args[0], args[1], args[2], args[3], args[4]);
	        default:
	            return fn.apply(ctx, args);
	    }
	}
	exports.callFunc = callFunc;
	function triggerMethodOn(obj, eventName, args) {
	    var ev = strings_1.camelcase("on-" + eventName.replace(':', '-'));
	    if (obj[ev] && typeof obj[ev] === 'function') {
	        callFunc(obj[ev], obj, args);
	    }
	    if (typeof obj.trigger === 'function') {
	        args = [eventName].concat(args);
	        callFunc(obj.trigger, obj, args);
	    }
	}
	exports.triggerMethodOn = triggerMethodOn;
	function inherits(parent, protoProps, staticProps) {
	    var child;
	    // The constructor function for the new subclass is either defined by you
	    // (the "constructor" property in your `extend` definition), or defaulted
	    // by us to simply call the parent's constructor.
	    if (protoProps && objects_1.has(protoProps, 'constructor')) {
	        child = protoProps.constructor;
	    } else {
	        child = function child() {
	            return parent.apply(this, arguments);
	        };
	    }
	    // Add static properties to the constructor function, if supplied.
	    objects_1.extend(child, parent, staticProps);
	    // Set the prototype chain to inherit from `parent`, without calling
	    // `parent`'s constructor function.
	    var Surrogate = function Surrogate() {
	        this.constructor = child;
	    };
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate();
	    // Add prototype properties (instance properties) to the subclass,
	    // if supplied.
	    if (protoProps) objects_1.extend(child.prototype, protoProps);
	    // Set a convenience property in case the parent's prototype is needed
	    // later.
	    child.__super__ = parent.prototype;
	    return child;
	}
	exports.inherits = inherits;

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	/*class KeyValuePair<K, V> {
	    key: K;
	    value: V;
	    constructor(key: K, value: V) {
	        this.key = key;
	        this.value = value;
	    }
	}
	export class Map<K, V> { // class MapDDD<K,V> implements Map
	    // -------------- Fields -----------------------
	    private keyAndValues: Array<KeyValuePair<K, V>>;
	    // ---------------------------------------------
	    constructor() {
	        this.keyAndValues = [];
	    }
	    // --- Public Methods ---
	    getKeysOfValue(value: V) {
	        var keysToReturn: Array<K> = [];
	        var valueToFind = value;
	        this.keyAndValues.forEach(function (value: KeyValuePair<K, V>, index: number, array: KeyValuePair<K, V>[]): void {
	            if (value.value === valueToFind) {
	                keysToReturn.push(value.key);
	            }
	        });
	        return keysToReturn;
	    }

	    // Standard:
	    clear(): void {
	        this.keyAndValues = [];
	    }
	    delete(key: K): boolean {
	        var found = false;
	        this.keyAndValues.forEach(function (value: KeyValuePair<K, V>, index: number, array: KeyValuePair<K, V>[]): void {
	            if (found) return;
	            if (key === value.key) {
	                array = array.slice(0, index).concat(array.slice(index + 1));
	                found = true;
	            }
	        });
	        return found;
	    }
	    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
	        this.keyAndValues.forEach(function (value: KeyValuePair<K, V>, index: number, array: KeyValuePair<K, V>[]): void {
	            callbackfn.apply(thisArg, [value.value, value.key, this]);
	        }, this);
	    }
	    get(key: K): V {
	        var valueToReturn: V = undefined;
	        this.keyAndValues.forEach(function (value: KeyValuePair<K, V>, index: number, array: KeyValuePair<K, V>[]): void {
	            if (valueToReturn !== undefined) return;
	            if (key === value.key) {
	                valueToReturn = value.value;
	            }
	        });
	        return valueToReturn;
	    }
	    has(key: K): boolean {
	        var found = false;
	        this.keyAndValues.forEach(function (value: KeyValuePair<K, V>, index: number, array: KeyValuePair<K, V>[]): void {
	            if (found) return;
	            if (key === value.key) {
	                found = true;
	            }
	        });
	        return found;
	    }
	    set(key: K, value: V): Map<K, V> {
	        var found = false;
	        var valueToSet = value;
	        this.keyAndValues.forEach(function (value: KeyValuePair<K, V>, index: number, array: KeyValuePair<K, V>[]): void {
	            if (found) return;
	            if (key === value.key) {
	                found = true;
	                value.value = valueToSet;
	            }
	        });
	        if (!found) {
	            this.keyAndValues.push(new KeyValuePair<K, V>(key, valueToSet));
	        }
	        return this;
	    }
	    // ----------------------

	    // Getters:
	    // Standard:
	    get size() {
	        return this.keyAndValues.length;
	    }
	}*/
	// Return a new array with duplicates removed

	function unique(array) {
	    var seen = new Map();
	    return array.filter(function (e, i) {
	        if (seen.has(e)) return false;
	        /*for (i += 1; i < array.length; i += 1) {
	          if (equal(e, array[i])) {
	            return false;
	          }
	        }*/
	        seen.set(e, true);
	        return true;
	    });
	}
	exports.unique = unique;
	function any(array, predicate) {
	    for (var i = 0, ii = array.length; i < ii; i++) {
	        if (predicate(array[i])) return true;
	    }
	    return false;
	}
	exports.any = any;
	function indexOf(array, item) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        if (array[i] === item) return i;
	    }return -1;
	}
	exports.indexOf = indexOf;
	function find(array, callback, ctx) {
	    var v = void 0;
	    for (var i = 0, ii = array.length; i < ii; i++) {
	        if (callback.call(ctx, array[i])) return array[i];
	    }
	    return null;
	}
	exports.find = find;
	function slice(array, begin, end) {
	    return Array.prototype.slice.call(array, begin, end);
	}
	exports.slice = slice;
	function flatten(arr) {
	    return arr.reduce(function (flat, toFlatten) {
	        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
	    }, []);
	}
	exports.flatten = flatten;
	function sortBy(obj, value, context) {
	    var iterator = typeof value === 'function' ? value : function (obj) {
	        return obj[value];
	    };
	    return obj.map(function (value, index, list) {
	        return {
	            value: value,
	            index: index,
	            criteria: iterator.call(context, value, index, list)
	        };
	    }).sort(function (left, right) {
	        var a = left.criteria,
	            b = right.criteria;
	        if (a !== b) {
	            if (a > b || a === void 0) return 1;
	            if (a < b || b === void 0) return -1;
	        }
	        return left.index - right.index;
	    }).map(function (item) {
	        return item.value;
	    });
	}
	exports.sortBy = sortBy;

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	function camelcase(input) {
	    return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
	        return group1.toUpperCase();
	    });
	}
	exports.camelcase = camelcase;
	;
	function truncate(str, length) {
	    var n = str.substring(0, Math.min(length, str.length));
	    return n + (n.length == str.length ? '' : '...');
	}
	exports.truncate = truncate;
	function humanFileSize(bytes) {
	    var si = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	    var thresh = si ? 1000 : 1024;
	    if (Math.abs(bytes) < thresh) {
	        return bytes + ' B';
	    }
	    var units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
	    var u = -1;
	    do {
	        bytes /= thresh;
	        ++u;
	    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
	    return bytes.toFixed(1) + ' ' + units[u];
	}
	exports.humanFileSize = humanFileSize;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var utils_1 = __webpack_require__(21);
	var arrays_1 = __webpack_require__(23);
	/**
	 * Takes a nested object and returns a shallow object keyed with the path names
	 * e.g. { "level1.level2": "value" }
	 *
	 * @param  {Object}      Nested object e.g. { level1: { level2: 'value' } }
	 * @return {Object}      Shallow object with path names e.g. { 'level1.level2': 'value' }
	 */
	function objToPaths(obj) {
	    var separator = arguments.length <= 1 || arguments[1] === undefined ? "." : arguments[1];

	    var ret = {};
	    for (var key in obj) {
	        var val = obj[key];
	        if (val && (val.constructor === Object || val.constructor === Array) && !isEmpty(val)) {
	            //Recursion for embedded objects
	            var obj2 = objToPaths(val);
	            for (var key2 in obj2) {
	                var val2 = obj2[key2];
	                ret[key + separator + key2] = val2;
	            }
	        } else {
	            ret[key] = val;
	        }
	    }
	    return ret;
	}
	exports.objToPaths = objToPaths;
	function isEmpty(obj) {
	    return Object.keys(obj).length === 0;
	}
	exports.isEmpty = isEmpty;
	function extend(obj) {
	    if (!utils_1.isObject(obj)) return obj;
	    var o = void 0,
	        k = void 0;

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	    }

	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            o = _step.value;

	            if (!utils_1.isObject(o)) continue;
	            for (k in o) {
	                if (has(o, k)) obj[k] = o[k];
	            }
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    return obj;
	}
	exports.extend = extend;
	var nativeAssign = Object.assign;
	function assign(target) {
	    if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert first argument to object');
	    }

	    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	    }

	    if (nativeAssign) return nativeAssign.apply(undefined, [target].concat(args));
	    var to = Object(target);
	    for (var i = 0, ii = args.length; i < ii; i++) {
	        var nextSource = args[i];
	        if (nextSource === undefined || nextSource === null) {
	            continue;
	        }
	        nextSource = Object(nextSource);
	        var keysArray = Object.keys(Object(nextSource));
	        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	            var nextKey = keysArray[nextIndex];
	            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	            if (desc !== undefined && desc.enumerable) {
	                to[nextKey] = nextSource[nextKey];
	            }
	        }
	    }
	    return to;
	}
	exports.assign = assign;
	var _has = Object.prototype.hasOwnProperty;
	function has(obj, prop) {
	    return _has.call(obj, prop);
	}
	exports.has = has;
	function pick(obj, props) {
	    var out = {},
	        prop = void 0;
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	        for (var _iterator2 = props[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            prop = _step2.value;

	            if (has(obj, prop)) out[prop] = obj[prop];
	        }
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
	    }

	    return out;
	}
	exports.pick = pick;
	function omit(obj, props) {
	    var out = {};
	    for (var key in obj) {
	        if (!!~props.indexOf(key)) continue;
	        out[key] = obj[key];
	    }
	    return out;
	}
	exports.omit = omit;
	function result(obj, prop, ctx, args) {
	    var ret = obj[prop];
	    return typeof ret === 'function' ? ret.appl(ctx, args || []) : ret;
	}
	exports.result = result;
	function values(obj) {
	    var output = [];
	    for (var k in obj) {
	        if (has(obj, k)) {
	            output.push(obj[k]);
	        }
	    }return output;
	}
	exports.values = values;
	function intersectionObjects(a, b, predicate) {
	    var results = [],
	        aElement,
	        existsInB;
	    for (var i = 0, ii = a.length; i < ii; i++) {
	        aElement = a[i];
	        existsInB = arrays_1.any(b, function (bElement) {
	            return predicate(bElement, aElement);
	        });
	        if (existsInB) {
	            results.push(aElement);
	        }
	    }
	    return results;
	}
	function intersection(results) {
	    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	        args[_key3 - 1] = arguments[_key3];
	    }

	    var lastArgument = args[args.length - 1];
	    var arrayCount = args.length;
	    var areEqualFunction = utils_1.equal;
	    if (typeof lastArgument === "function") {
	        areEqualFunction = lastArgument;
	        arrayCount--;
	    }
	    for (var i = 0; i < arrayCount; i++) {
	        var array = args[i];
	        results = intersectionObjects(results, array, areEqualFunction);
	        if (results.length === 0) break;
	    }
	    return results;
	}
	exports.intersection = intersection;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var arrays_1 = __webpack_require__(23);
	var utils_1 = __webpack_require__(21);
	exports.Promise = typeof window === 'undefined' ? global.Promise : window.Promise;
	// Promises
	function isPromise(obj) {
	    return obj && typeof obj.then === 'function';
	}
	exports.isPromise = isPromise;
	function toPromise(obj) {
	    /* jshint validthis:true */
	    if (!obj) {
	        return obj;
	    }
	    if (isPromise(obj)) {
	        return obj;
	    }
	    if (utils_1.isFunction(obj)) {
	        return thunkToPromise.call(this, obj);
	    }
	    if (Array.isArray(obj)) {
	        return arrayToPromise.call(this, obj);
	    }
	    if (utils_1.isObject(obj)) {
	        return objectToPromise.call(this, obj);
	    }
	    return exports.Promise.resolve(obj);
	}
	exports.toPromise = toPromise;
	/**
	 * Convert a thunk to a promise.
	 *
	 * @param {Function}
	 * @return {Promise}
	 * @api private
	 */
	function thunkToPromise(fn) {
	    /* jshint validthis:true */
	    var ctx = this;
	    return new exports.Promise(function (resolve, reject) {
	        fn.call(ctx, function (err, res) {
	            if (err) return reject(err);
	            if (arguments.length > 2) res = arrays_1.slice(arguments, 1);
	            resolve(res);
	        });
	    });
	}
	exports.thunkToPromise = thunkToPromise;
	/**
	 * Convert an array of "yieldables" to a promise.
	 * Uses `Promise.all()` internally.
	 *
	 * @param {Array} obj
	 * @return {Promise}
	 * @api private
	 */
	function arrayToPromise(obj) {
	    return exports.Promise.all(obj.map(toPromise, this));
	}
	exports.arrayToPromise = arrayToPromise;
	/**
	 * Convert an object of "yieldables" to a promise.
	 * Uses `Promise.all()` internally.
	 *
	 * @param {Object} obj
	 * @return {Promise}
	 * @api private
	 */
	function objectToPromise(obj) {
	    var results = new obj.constructor();
	    var keys = Object.keys(obj);
	    var promises = [];
	    for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var promise = toPromise.call(this, obj[key]);
	        if (promise && isPromise(promise)) defer(promise, key);else results[key] = obj[key];
	    }
	    return exports.Promise.all(promises).then(function () {
	        return results;
	    });
	    function defer(promise, key) {
	        // predefine the key in the result
	        results[key] = undefined;
	        promises.push(promise.then(function (res) {
	            results[key] = res;
	        }));
	    }
	}
	exports.objectToPromise = objectToPromise;
	function deferred() {
	    var ret = {};
	    ret.promise = new exports.Promise(function (resolve, reject) {
	        ret.resolve = resolve;
	        ret.reject = reject;
	        ret.done = function (err, result) {
	            if (err) return reject(err);else resolve(result);
	        };
	    });
	    return ret;
	}
	exports.deferred = deferred;
	;
	function callback(promise, callback, ctx) {
	    promise.then(function (result) {
	        callback.call(ctx, null, result);
	    }).catch(function (err) {
	        callback.call(ctx, err);
	    });
	}
	exports.callback = callback;
	function delay(timeout) {
	    var defer = deferred();
	    timeout == null ? utils_1.nextTick(defer.resolve) : setTimeout(defer.resolve, timeout);
	    return defer.promise;
	}
	exports.delay = delay;
	;
	function eachAsync(array, iterator, context) {
	    var accumulate = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	    return mapAsync(array, iterator, context, accumulate).then(function () {
	        return void 0;
	    });
	}
	exports.eachAsync = eachAsync;
	function mapAsync(array, iterator, context) {
	    var accumulate = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	    return new exports.Promise(function (resolve, reject) {
	        var i = 0,
	            len = array.length,
	            errors = [],
	            results = [];
	        function next(err, result) {
	            if (err && !accumulate) return reject(err);
	            if (err) errors.push(err);
	            if (i === len) return errors.length ? reject(arrays_1.flatten(errors)) : resolve(results);
	            var ret = iterator.call(context, array[i++]);
	            if (isPromise(ret)) {
	                ret.then(function (r) {
	                    results.push(r);next(null, r);
	                }, next);
	            } else if (ret instanceof Error) {
	                next(ret);
	            } else {
	                next(null);
	            }
	        }
	        next(null);
	    });
	}
	exports.mapAsync = mapAsync;

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	var self = window || global;
	var iterable = 'Symbol' in self && 'iterator' in Symbol;
	// Build a destructive iterator for the value list
	function iteratorFor(items) {
	    var iterator = {
	        next: function next() {
	            var value = items.shift();
	            return { done: value === undefined, value: value };
	        }
	    };
	    if (iterable) {
	        iterator[Symbol.iterator] = function () {
	            return iterator;
	        };
	    }
	    return iterator;
	}

	var KeyValuePair = function KeyValuePair(key, value) {
	    _classCallCheck(this, KeyValuePair);

	    this.key = key;
	    this.value = value;
	};

	var MapShim = function () {
	    // ---------------------------------------------
	    function MapShim() {
	        _classCallCheck(this, MapShim);

	        this.keyAndValues = [];
	    }
	    // --- Public Methods ---


	    _createClass(MapShim, [{
	        key: 'getKeysOfValue',
	        value: function getKeysOfValue(value) {
	            var keysToReturn = [];
	            var valueToFind = value;
	            this.keyAndValues.forEach(function (value, index, array) {
	                if (value.value === valueToFind) {
	                    keysToReturn.push(value.key);
	                }
	            });
	            return keysToReturn;
	        }
	        // Standard:

	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.keyAndValues = [];
	        }
	    }, {
	        key: 'delete',
	        value: function _delete(key) {
	            var found = false;
	            this.keyAndValues.forEach(function (value, index, array) {
	                if (found) return;
	                if (key === value.key) {
	                    array = array.slice(0, index).concat(array.slice(index + 1));
	                    found = true;
	                }
	            });
	            return found;
	        }
	    }, {
	        key: 'forEach',
	        value: function forEach(callbackfn, thisArg) {
	            this.keyAndValues.forEach(function (value, index, array) {
	                callbackfn.apply(thisArg, [value.value, value.key, this]);
	            }, this);
	        }
	    }, {
	        key: 'get',
	        value: function get(key) {
	            var valueToReturn = undefined;
	            this.keyAndValues.forEach(function (value, index, array) {
	                if (valueToReturn !== undefined) return;
	                if (key === value.key) {
	                    valueToReturn = value.value;
	                }
	            });
	            return valueToReturn;
	        }
	    }, {
	        key: 'has',
	        value: function has(key) {
	            var found = false;
	            this.keyAndValues.forEach(function (value, index, array) {
	                if (found) return;
	                if (key === value.key) {
	                    found = true;
	                }
	            });
	            return found;
	        }
	    }, {
	        key: 'set',
	        value: function set(key, value) {
	            var found = false;
	            var valueToSet = value;
	            this.keyAndValues.forEach(function (value, index, array) {
	                if (found) return;
	                if (key === value.key) {
	                    found = true;
	                    value.value = valueToSet;
	                }
	            });
	            if (!found) {
	                this.keyAndValues.push(new KeyValuePair(key, valueToSet));
	            }
	            return this;
	        }
	    }, {
	        key: 'keys',
	        value: function keys() {
	            var items = [];
	            this.forEach(function (value, name) {
	                items.push(name);
	            });
	            return iteratorFor(items);
	        }
	    }, {
	        key: 'values',
	        value: function values() {
	            var items = [];
	            this.forEach(function (value) {
	                items.push(value);
	            });
	            return iteratorFor(items);
	        }
	    }, {
	        key: 'entries',
	        value: function entries() {
	            var items = [];
	            this.forEach(function (value, name) {
	                items.push([name, value]);
	            });
	            return iteratorFor(items);
	        }
	        // ----------------------
	        // Getters:
	        // Standard:

	    }, {
	        key: Symbol.iterator,
	        value: function value() {
	            return this.entries();
	        }
	    }, {
	        key: 'size',
	        get: function get() {
	            return this.keyAndValues.length;
	        }
	    }]);

	    return MapShim;
	}();

	if (!self.Map) {
	    self.Map = MapShim;
	}
	exports.Map = self.Map;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var orange_1 = __webpack_require__(20);

	var ReadableStream = function ReadableStream() {
	    _classCallCheck(this, ReadableStream);
	};

	exports.ReadableStream = ReadableStream;
	exports.isNode = !new Function("try {return this===window;}catch(e){ return false;}")();
	var orange_2 = __webpack_require__(20);
	exports.isObject = orange_2.isObject;
	exports.isString = orange_2.isString;
	exports.isFunction = orange_2.isFunction;
	function isBuffer(a) {
	    if (exports.isNode) Buffer.isBuffer(a);
	    return false;
	}
	exports.isBuffer = isBuffer;
	function isFormData(a) {
	    if (exports.isNode) return false;
	    return a instanceof FormData;
	}
	exports.isFormData = isFormData;
	function isReadableStream(a) {
	    if (typeof a.read === 'function' && a.pipe === 'function') {
	        return true;
	    }
	    return false;
	}
	exports.isReadableStream = isReadableStream;
	function isFile(a) {
	    if (exports.isNode) return false;
	    if (a instanceof File) return true;
	    return false;
	}
	exports.isFile = isFile;
	function fileReaderReady(reader) {
	    return new orange_1.Promise(function (resolve, reject) {
	        reader.onload = function () {
	            resolve(reader.result);
	        };
	        reader.onerror = function () {
	            reject(reader.error);
	        };
	    });
	}
	exports.fileReaderReady = fileReaderReady;
	function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    reader.readAsArrayBuffer(blob);
	    return fileReaderReady(reader);
	}
	exports.readBlobAsArrayBuffer = readBlobAsArrayBuffer;
	function readBlobAsText(blob) {
	    var reader = new FileReader();
	    reader.readAsText(blob);
	    return fileReaderReady(reader);
	}
	exports.readBlobAsText = readBlobAsText;
	function readBlobAsDataURL(blob) {
	    var reader = new FileReader();
	    reader.readAsDataURL(blob);
	    return fileReaderReady(reader);
	}
	exports.readBlobAsDataURL = readBlobAsDataURL;
	var path;
	(function (path_1) {
	    path_1.DELIMITER = "/";
	    function join() {
	        var out = [];

	        for (var _len = arguments.length, parts = Array(_len), _key = 0; _key < _len; _key++) {
	            parts[_key] = arguments[_key];
	        }

	        for (var i = 0, ii = parts.length; i < ii; i++) {
	            var s = 0,
	                e = parts[i].length;
	            if (parts[i] === path_1.DELIMITER || parts[i] === '') continue;
	            if (parts[i][0] === path_1.DELIMITER) s = 1;
	            if (parts[i][e - 1] === path_1.DELIMITER) e--;
	            out.push(parts[i].substring(s, e));
	        }
	        return path_1.DELIMITER + out.join(path_1.DELIMITER);
	    }
	    path_1.join = join;
	    function base(path) {
	        if (!path) return "";
	        var split = path.split(path_1.DELIMITER);
	        return split[split.length - 1];
	    }
	    path_1.base = base;
	    function dir(path) {
	        if (!path) return "";
	        var split = path.split(path_1.DELIMITER);
	        split.pop();
	        return join.apply(undefined, _toConsumableArray(split));
	    }
	    path_1.dir = dir;
	})(path = exports.path || (exports.path = {}));

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	var utils_1 = __webpack_require__(30);
	exports.queryStringToParams = utils_1.queryStringToParams;
	__export(__webpack_require__(31));
	__export(__webpack_require__(37));
	__export(__webpack_require__(36));
	__export(__webpack_require__(32));

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";

	exports.isNode = !new Function("try {return this===window;}catch(e){ return false;}")();
	function queryStringToParams(qs) {
	    var kvp,
	        k,
	        v,
	        ls,
	        params = {},
	        decode = decodeURIComponent;
	    var kvps = qs.split('&');
	    for (var i = 0, l = kvps.length; i < l; i++) {
	        var param = kvps[i];
	        kvp = param.split('='), k = kvp[0], v = kvp[1];
	        if (v == null) v = true;
	        k = decode(k), v = decode(v), ls = params[k];
	        if (Array.isArray(ls)) ls.push(v);else if (ls) params[k] = [ls, v];else params[k] = v;
	    }
	    return params;
	}
	exports.queryStringToParams = queryStringToParams;
	function queryParam(obj) {
	    return Object.keys(obj).reduce(function (a, k) {
	        a.push(k + '=' + encodeURIComponent(obj[k]));return a;
	    }, []).join('&');
	}
	exports.queryParam = queryParam;
	var fileProto = /^file:/;
	function isValid(xhr, url) {
	    return xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 || xhr.status === 0 && fileProto.test(url) || xhr.status === 0 && window.location.protocol === 'file:';
	}
	exports.isValid = isValid;
	;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	var orange_1 = __webpack_require__(20);
	var utils_1 = __webpack_require__(30);
	var header_1 = __webpack_require__(32);
	var fetch;
	if (utils_1.isNode) {
	    fetch = __webpack_require__(34).fetch;
	} else {
	    fetch = __webpack_require__(58).fetch;
	}
	(function (HttpMethod) {
	    HttpMethod[HttpMethod["GET"] = 0] = "GET";
	    HttpMethod[HttpMethod["PUT"] = 1] = "PUT";
	    HttpMethod[HttpMethod["POST"] = 2] = "POST";
	    HttpMethod[HttpMethod["DELETE"] = 3] = "DELETE";
	    HttpMethod[HttpMethod["HEAD"] = 4] = "HEAD";
	    HttpMethod[HttpMethod["PATCH"] = 5] = "PATCH";
	})(exports.HttpMethod || (exports.HttpMethod = {}));
	var HttpMethod = exports.HttpMethod;

	var HttpRequest = function () {
	    function HttpRequest(_method, _url) {
	        _classCallCheck(this, HttpRequest);

	        this._method = _method;
	        this._url = _url;
	        this._params = {};
	        this._headers = new header_1.Headers();
	        this._request = {};
	        this._headers.append('X-Requested-With', 'XMLHttpRequest');
	        this._request.method = HttpMethod[this._method];
	    }

	    _createClass(HttpRequest, [{
	        key: 'uploadProgress',
	        value: function uploadProgress(fn) {
	            this._request.uploadProgress = fn;
	            return this;
	        }
	    }, {
	        key: 'downloadProgress',
	        value: function downloadProgress(fn) {
	            this._request.downloadProgress = fn;
	            return this;
	        }
	    }, {
	        key: 'header',
	        value: function header(field, value) {
	            if (orange_1.isString(field) && orange_1.isString(value)) {
	                this._headers.append(field, value);
	            } else if (orange_1.isObject(field)) {
	                for (var key in field) {
	                    this._headers.append(key, field[key]);
	                }
	            }
	            return this;
	        }
	    }, {
	        key: 'params',
	        value: function params(key, value) {
	            if (arguments.length === 1 && orange_1.isObject(key)) {
	                orange_1.extend(this._params, key);
	            } else if (arguments.length === 2) {
	                this._params[key] = value;
	            }
	            return this;
	        }
	    }, {
	        key: 'withCredentials',
	        value: function withCredentials(ret) {
	            this._xhr.withCredentials = ret;
	            return this;
	        }
	    }, {
	        key: 'json',
	        value: function json(data) {
	            var throwOnInvalid = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	            this.header('content-type', 'application/json; charset=utf-8');
	            if (!orange_1.isString(data)) {
	                data = JSON.stringify(data);
	            }
	            return this.end(data, throwOnInvalid).then(function (res) {
	                return res.json();
	            });
	        }
	    }, {
	        key: 'end',
	        value: function end(data) {
	            var throwOnInvalid = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	            var url = this._url;
	            if (data && data === Object(data) && this._method == HttpMethod.GET /* && check for content-type */) {
	                    var sep = url.indexOf('?') === -1 ? '?' : '&';
	                    var d = sep + utils_1.queryParam(data);
	                    url += d;
	                    data = null;
	                } else {
	                this._request.body = data;
	            }
	            url = this._apply_params(url);
	            return fetch(url, this._request).then(function (res) {
	                if (!res.ok && throwOnInvalid) {
	                    throw new Error(res.statusText);
	                }
	                return res;
	            });
	        }
	    }, {
	        key: '_apply_params',
	        value: function _apply_params(url) {
	            var params = {};
	            var idx = url.indexOf('?');
	            if (idx > -1) {
	                params = orange_1.extend(params, utils_1.queryStringToParams(url.substr(idx + 1)));
	                url = url.substr(0, idx);
	            }
	            orange_1.extend(params, this._params);
	            if (!orange_1.isEmpty(params)) {
	                var sep = url.indexOf('?') === -1 ? '?' : '&';
	                url += sep + utils_1.queryParam(params);
	            }
	            return url;
	        }
	    }]);

	    return HttpRequest;
	}();

	exports.HttpRequest = HttpRequest;
	function get(url) {
	    return new HttpRequest(HttpMethod.GET, url);
	}
	exports.get = get;
	function post(url) {
	    return new HttpRequest(HttpMethod.POST, url);
	}
	exports.post = post;
	function put(url) {
	    return new HttpRequest(HttpMethod.PUT, url);
	}
	exports.put = put;
	function del(url) {
	    return new HttpRequest(HttpMethod.DELETE, url);
	}
	exports.del = del;
	function patch(url) {
	    return new HttpRequest(HttpMethod.PATCH, url);
	}
	exports.patch = patch;
	function head(url) {
	    return new HttpRequest(HttpMethod.HEAD, url);
	}
	exports.head = head;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	var support_1 = __webpack_require__(33);
	function normalizeName(name) {
	    if (typeof name !== 'string') {
	        name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	        throw new TypeError('Invalid character in header field name');
	    }
	    return name.toLowerCase();
	}
	function normalizeValue(value) {
	    if (typeof value !== 'string') {
	        value = String(value);
	    }
	    return value;
	}
	// Build a destructive iterator for the value list
	function iteratorFor(items) {
	    var iterator = {
	        next: function next() {
	            var value = items.shift();
	            return { done: value === undefined, value: value };
	        }
	    };
	    if (support_1.default.iterable) {
	        iterator[Symbol.iterator] = function () {
	            return iterator;
	        };
	    }
	    return iterator;
	}

	var Headers = function () {
	    function Headers(headers) {
	        _classCallCheck(this, Headers);

	        this.map = {};
	        if (headers instanceof Headers) {
	            for (var key in headers.map) {
	                this.append(key, headers.map[key]);
	            }
	        } else if (headers) {
	            var names = Object.getOwnPropertyNames(headers);
	            for (var i = 0, ii = names.length; i < ii; i++) {
	                this.append(names[i], headers[names[i]]);
	            }
	        }
	    }

	    _createClass(Headers, [{
	        key: Symbol.iterator,
	        value: function value() {
	            return this.entries();
	        }
	    }, {
	        key: 'append',
	        value: function append(name, value) {
	            name = normalizeName(name);
	            value = normalizeValue(value);
	            var list = this.map[name];
	            if (!list) {
	                list = [];
	                this.map[name] = list;
	            }
	            list.push(value);
	        }
	    }, {
	        key: 'delete',
	        value: function _delete(name) {
	            delete this.map[normalizeName(name)];
	        }
	    }, {
	        key: 'get',
	        value: function get(name) {
	            var values = this.map[normalizeName(name)];
	            return values ? values[0] : null;
	        }
	    }, {
	        key: 'getAll',
	        value: function getAll(name) {
	            return this.map[normalizeName(name)] || [];
	        }
	    }, {
	        key: 'has',
	        value: function has(name) {
	            return this.map.hasOwnProperty(normalizeName(name));
	        }
	    }, {
	        key: 'set',
	        value: function set(name, value) {
	            this.map[normalizeName(name)] = [normalizeValue(value)];
	        }
	    }, {
	        key: 'forEach',
	        value: function forEach(callback, thisArg) {
	            Object.getOwnPropertyNames(this.map).forEach(function (name) {
	                this.map[name].forEach(function (value) {
	                    callback.call(thisArg, value, name, this);
	                }, this);
	            }, this);
	        }
	    }, {
	        key: 'keys',
	        value: function keys() {
	            var items = [];
	            this.forEach(function (value, name) {
	                items.push(name);
	            });
	            return iteratorFor(items);
	        }
	    }, {
	        key: 'values',
	        value: function values() {
	            var items = [];
	            this.forEach(function (value) {
	                items.push(value);
	            });
	            return iteratorFor(items);
	        }
	    }, {
	        key: 'entries',
	        value: function entries() {
	            var items = [];
	            this.forEach(function (value, name) {
	                items.push([name, value]);
	            });
	            return iteratorFor(items);
	        }
	    }]);

	    return Headers;
	}();

	exports.Headers = Headers;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var utils_1 = __webpack_require__(30);
	var self = utils_1.isNode ? global : window;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && function () {
	        try {
	            new Blob();
	            return true;
	        } catch (e) {
	            return false;
	        }
	    }(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var orange_1 = __webpack_require__(20);
	/*import {isValid, FetchOptions} from './utils';
	import {Headers} from './header';
	import {Request, RequestOptions, isRequest} from './request';
	import {Response} from './response';
	import support from './support';*/
	var http = __webpack_require__(35);
	var request_1 = __webpack_require__(36);
	var header_1 = __webpack_require__(32);
	var response_1 = __webpack_require__(37);
	var URL = __webpack_require__(38);
	function _headers(headers) {
	    var head = new header_1.Headers();
	    for (var key in headers) {
	        head.append(key, headers[key]);
	    }
	    return head;
	}
	function fetch(input, init) {
	    return new orange_1.Promise(function (resolve, reject) {
	        var request;
	        if (request_1.isRequest(input) && !init) {
	            request = input;
	        } else {
	            request = new request_1.Request(input, init);
	        }
	        init = init || {};
	        var url = URL.parse(request.url, false);
	        var headers = {};
	        request.headers.forEach(function (v, k) {
	            headers[k] = v;
	        });
	        var req = http.request({
	            method: request.method,
	            host: url.hostname,
	            port: parseInt(url.port),
	            path: url.path,
	            protocol: url.protocol,
	            headers: headers
	        }, function (res) {
	            var options = {
	                status: res.statusCode,
	                statusText: res.statusMessage,
	                headers: _headers(res.headers)
	            };
	            resolve(new response_1.Response(res, options));
	        });
	        req.on('error', reject);
	        if (request.body) {
	            if (Buffer.isBuffer(request.body)) {
	                req.write(request.body);
	            } else if (orange_1.isString(request.body)) {
	                req.write(Buffer.from(request.body));
	            } else if (orange_1.isFunction(request.body.read) && orange_1.isFunction(request.body.pipe)) {
	                return request.body.pipe(req);
	            }
	        }
	        req.end();
	        /*var xhr = xmlHttpRequest();
	         function responseURL() {
	            if ('responseURL' in xhr) {
	                return (<any>xhr).responseURL
	            }
	            // Avoid security warnings on getResponseHeader when not allowed by CORS
	            if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	                return xhr.getResponseHeader('X-Request-URL')
	            }
	            return
	        }
	         xhr.onload = function () {
	            var options = {
	                status: xhr.status,
	                statusText: xhr.statusText,
	                headers: headers(xhr),
	                url: responseURL()
	            }
	            var body = 'response' in xhr ? xhr.response : xhr.responseText
	            resolve(new Response(body, options))
	        }
	         xhr.onerror = function () {
	            reject(new TypeError('Network request failed'))
	        }
	         xhr.ontimeout = function () {
	            reject(new TypeError('Network request failed: timeout'))
	        }
	         xhr.open(request.method, request.url, true)
	         if (request.credentials === 'include') {
	            xhr.withCredentials = true
	        }
	         if ('responseType' in xhr && support.blob) {
	            xhr.responseType = 'blob'
	        }
	         request.headers.forEach(function (value, name) {
	            xhr.setRequestHeader(name, value)
	        });
	         if (init.downloadProgress) {
	            xhr.onprogress = init.downloadProgress;
	        }
	        if (init.uploadProgress || xhr.upload) {
	            xhr.upload.onprogress = init.uploadProgress;
	        }
	                xhr.send(typeof request.body === 'undefined' ? null : request.body)*/
	    });
	}
	exports.fetch = fetch;
	function toBuffer(a) {
	    var _this = this;

	    var concat = __webpack_require__(39);
	    return new orange_1.Promise(function (resolve, reject) {
	        _this._body.on('error', reject);
	        var stream = concat(resolve);
	        _this._body.pipe(stream);
	    });
	}
	exports.toBuffer = toBuffer;

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	var header_1 = __webpack_require__(32);
	// HTTP methods whose capitalization should be normalized
	var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
	function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return methods.indexOf(upcased) > -1 ? upcased : method;
	}
	function isRequest(a) {
	    return Request.prototype.isPrototypeOf(a) || a instanceof Request;
	}
	exports.isRequest = isRequest;

	var Request = function () {
	    function Request(input) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, Request);

	        options = options || {};
	        var body = options.body;
	        if (isRequest(input)) {
	            this.url = input.url;
	            this.credentials = input.credentials;
	            if (!options.headers) {
	                this.headers = new header_1.Headers(options.headers);
	            }
	            this.method = input.method;
	            this.mode = input.mode;
	        } else {
	            this.url = input;
	        }
	        this.credentials = options.credentials || this.credentials || 'omit';
	        if (options.headers || !this.headers) {
	            this.headers = new header_1.Headers(options.headers);
	        }
	        this.method = normalizeMethod(options.method || this.method || 'GET');
	        this.mode = options.mode || this.mode || null;
	        this.referrer = null;
	        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	            throw new TypeError('Body not allowed for GET or HEAD requests');
	        }
	        this.body = body;
	    }

	    _createClass(Request, [{
	        key: 'clone',
	        value: function clone() {
	            return new Request(this);
	        }
	    }]);

	    return Request;
	}();

	exports.Request = Request;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	var header_1 = __webpack_require__(32);
	var support_1 = __webpack_require__(33);
	var orange_1 = __webpack_require__(20);
	var utils_1 = __webpack_require__(30);
	function decode(body) {
	    var form = new FormData();
	    body.trim().split('&').forEach(function (bytes) {
	        if (bytes) {
	            var split = bytes.split('=');
	            var name = split.shift().replace(/\+/g, ' ');
	            var value = split.join('=').replace(/\+/g, ' ');
	            form.append(decodeURIComponent(name), decodeURIComponent(value));
	        }
	    });
	    return form;
	}
	function consumed(body) {
	    if (body.bodyUsed) {
	        return orange_1.Promise.reject(new TypeError('Already read'));
	    }
	    body._bodyUsed = true;
	}
	function fileReaderReady(reader) {
	    return new orange_1.Promise(function (resolve, reject) {
	        reader.onload = function () {
	            resolve(reader.result);
	        };
	        reader.onerror = function () {
	            reject(reader.error);
	        };
	    });
	}
	function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    reader.readAsArrayBuffer(blob);
	    return fileReaderReady(reader);
	}
	function readBlobAsText(blob) {
	    var reader = new FileReader();
	    reader.readAsText(blob);
	    return fileReaderReady(reader);
	}
	(function (BodyType) {
	    BodyType[BodyType["Blob"] = 0] = "Blob";
	    BodyType[BodyType["Text"] = 1] = "Text";
	    BodyType[BodyType["FormData"] = 2] = "FormData";
	    BodyType[BodyType["Stream"] = 3] = "Stream";
	    BodyType[BodyType["None"] = 4] = "None";
	})(exports.BodyType || (exports.BodyType = {}));
	var BodyType = exports.BodyType;
	var redirectStatuses = [301, 302, 303, 307, 308];

	var Response = function () {
	    function Response(body, options) {
	        _classCallCheck(this, Response);

	        this._bodyUsed = false;
	        this._bodyType = BodyType.None;
	        options = options || {};
	        this.type = 'default';
	        this.status = options.status;
	        this.ok = this.status >= 200 && this.status < 300;
	        this.statusText = options.statusText;
	        this.headers = options.headers instanceof header_1.Headers ? options.headers : new header_1.Headers(options.headers);
	        this.url = options.url || '';
	        this._initBody(body);
	    }

	    _createClass(Response, [{
	        key: '_initBody',
	        value: function _initBody(body) {
	            if (typeof body === 'string' || support_1.default.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	                this._bodyType = BodyType.Text;
	            } else if (support_1.default.blob && Blob.prototype.isPrototypeOf(body)) {
	                this._bodyType = BodyType.Blob;
	            } else if (support_1.default.formData && FormData.prototype.isPrototypeOf(body)) {
	                this._bodyType = BodyType.FormData;
	            } else if (!body) {
	                this._bodyType = BodyType.None;
	            } else if (support_1.default.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {} else if (utils_1.isNode) {
	                this._bodyType = BodyType.Stream;
	            } else {
	                throw new Error('unsupported BodyType type');
	            }
	            this._body = body ? body : "";
	            if (!this.headers.get('content-type')) {
	                if (this._bodyType == BodyType.Text) {
	                    this.headers.set('content-type', 'text/plain; charset=UTF-8');
	                } else if (this._bodyType == BodyType.Blob && this._body.type) {
	                    this.headers.set('content-type', this._body.type);
	                } else if (support_1.default.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	                    this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	                }
	            }
	        }
	    }, {
	        key: 'text',
	        value: function text() {
	            var rejected = consumed(this);
	            if (rejected) return rejected;
	            if (this._bodyType == BodyType.Blob) {
	                return readBlobAsText(this._body);
	            } else if (this._bodyType == BodyType.FormData) {
	                throw new Error('could not read FormData body as text');
	            } else if (this._bodyType == BodyType.Stream) {
	                return this._streamToBuffer().then(function (ret) {
	                    return ret.toString('utf8');
	                });
	            } else {
	                return orange_1.Promise.resolve(this._body);
	            }
	        }
	    }, {
	        key: 'arrayBuffer',
	        value: function arrayBuffer() {
	            return this.blob().then(readBlobAsArrayBuffer);
	        }
	    }, {
	        key: '_streamToBuffer',
	        value: function _streamToBuffer() {
	            if (!isNaN) return orange_1.Promise.reject(new TypeError("not node!"));
	            __webpack_require__(34).toBuffer(this._body);
	        }
	    }, {
	        key: 'blob',
	        value: function blob() {
	            if (!support_1.default.blob && !utils_1.isNode) {
	                return orange_1.Promise.reject(new Error("blob not supported"));
	            }
	            var rejected = consumed(this);
	            if (rejected) {
	                return rejected;
	            }
	            if (this._bodyType == BodyType.Blob) {
	                return orange_1.Promise.resolve(this._body);
	            } else if (this._bodyType == BodyType.FormData) {
	                orange_1.Promise.reject(new Error('could not read FormData body as blob'));
	            } else if (this.bodyType === BodyType.Stream) {
	                return this._streamToBuffer();
	            } else {
	                return orange_1.Promise.resolve(new Blob([this._body]));
	            }
	        }
	    }, {
	        key: 'stream',
	        value: function stream() {
	            if (!utils_1.isNode) return orange_1.Promise.reject(new TypeError("streaming is only available in node"));
	            return orange_1.Promise.resolve(this._body);
	        }
	    }, {
	        key: 'formData',
	        value: function formData() {
	            if (!support_1.default.formData) {
	                return orange_1.Promise.reject(new Error("form data not supported"));
	            }
	            return this.text().then(decode);
	        }
	    }, {
	        key: 'json',
	        value: function json() {
	            return this.text().then(JSON.parse);
	        }
	    }, {
	        key: 'clone',
	        value: function clone() {
	            return new Response(this._body, {
	                status: this.status,
	                statusText: this.statusText,
	                headers: new header_1.Headers(this.headers),
	                url: this.url
	            });
	        }
	    }, {
	        key: 'bodyUsed',
	        get: function get() {
	            return this._bodyUsed;
	        }
	    }, {
	        key: 'bodyType',
	        get: function get() {
	            return this._bodyType;
	        }
	    }], [{
	        key: 'error',
	        value: function error() {
	            var response = new Response(null, { status: 0, statusText: '' });
	            response.type = 'error';
	            return response;
	        }
	    }, {
	        key: 'redirect',
	        value: function redirect(url, status) {
	            if (redirectStatuses.indexOf(status) === -1) {
	                throw new RangeError('Invalid status code');
	            }
	            return new Response(null, { status: status, headers: { location: url } });
	        }
	    }]);

	    return Response;
	}();

	exports.Response = Response;

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Writable = __webpack_require__(40).Writable;
	var inherits = __webpack_require__(48);

	if (typeof Uint8Array === 'undefined') {
	  var U8 = __webpack_require__(57).Uint8Array;
	} else {
	  var U8 = Uint8Array;
	}

	function ConcatStream(opts, cb) {
	  if (!(this instanceof ConcatStream)) return new ConcatStream(opts, cb);

	  if (typeof opts === 'function') {
	    cb = opts;
	    opts = {};
	  }
	  if (!opts) opts = {};

	  var encoding = opts.encoding;
	  var shouldInferEncoding = false;

	  if (!encoding) {
	    shouldInferEncoding = true;
	  } else {
	    encoding = String(encoding).toLowerCase();
	    if (encoding === 'u8' || encoding === 'uint8') {
	      encoding = 'uint8array';
	    }
	  }

	  Writable.call(this, { objectMode: true });

	  this.encoding = encoding;
	  this.shouldInferEncoding = shouldInferEncoding;

	  if (cb) this.on('finish', function () {
	    cb(this.getBody());
	  });
	  this.body = [];
	}

	module.exports = ConcatStream;
	inherits(ConcatStream, Writable);

	ConcatStream.prototype._write = function (chunk, enc, next) {
	  this.body.push(chunk);
	  next();
	};

	ConcatStream.prototype.inferEncoding = function (buff) {
	  var firstBuffer = buff === undefined ? this.body[0] : buff;
	  if (Buffer.isBuffer(firstBuffer)) return 'buffer';
	  if (typeof Uint8Array !== 'undefined' && firstBuffer instanceof Uint8Array) return 'uint8array';
	  if (Array.isArray(firstBuffer)) return 'array';
	  if (typeof firstBuffer === 'string') return 'string';
	  if (Object.prototype.toString.call(firstBuffer) === "[object Object]") return 'object';
	  return 'buffer';
	};

	ConcatStream.prototype.getBody = function () {
	  if (!this.encoding && this.body.length === 0) return [];
	  if (this.shouldInferEncoding) this.encoding = this.inferEncoding();
	  if (this.encoding === 'array') return arrayConcat(this.body);
	  if (this.encoding === 'string') return stringConcat(this.body);
	  if (this.encoding === 'buffer') return bufferConcat(this.body);
	  if (this.encoding === 'uint8array') return u8Concat(this.body);
	  return this.body;
	};

	var isArray = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};

	function isArrayish(arr) {
	  return (/Array\]$/.test(Object.prototype.toString.call(arr))
	  );
	}

	function isBufferish(p) {
	  return typeof p === 'string' || isArrayish(p) || p && typeof p.subarray === 'function';
	}

	function stringConcat(parts) {
	  var strings = [];
	  var needsToString = false;
	  for (var i = 0; i < parts.length; i++) {
	    var p = parts[i];
	    if (typeof p === 'string') {
	      strings.push(p);
	    } else if (Buffer.isBuffer(p)) {
	      strings.push(p);
	    } else if (isBufferish(p)) {
	      strings.push(new Buffer(p));
	    } else {
	      strings.push(new Buffer(String(p)));
	    }
	  }
	  if (Buffer.isBuffer(parts[0])) {
	    strings = Buffer.concat(strings);
	    strings = strings.toString('utf8');
	  } else {
	    strings = strings.join('');
	  }
	  return strings;
	}

	function bufferConcat(parts) {
	  var bufs = [];
	  for (var i = 0; i < parts.length; i++) {
	    var p = parts[i];
	    if (Buffer.isBuffer(p)) {
	      bufs.push(p);
	    } else if (isBufferish(p)) {
	      bufs.push(new Buffer(p));
	    } else {
	      bufs.push(new Buffer(String(p)));
	    }
	  }
	  return Buffer.concat(bufs);
	}

	function arrayConcat(parts) {
	  var res = [];
	  for (var i = 0; i < parts.length; i++) {
	    res.push.apply(res, parts[i]);
	  }
	  return res;
	}

	function u8Concat(parts) {
	  var len = 0;
	  for (var i = 0; i < parts.length; i++) {
	    if (typeof parts[i] === 'string') {
	      parts[i] = new Buffer(parts[i]);
	    }
	    len += parts[i].length;
	  }
	  var u8 = new U8(len);
	  for (var i = 0, offset = 0; i < parts.length; i++) {
	    var part = parts[i];
	    for (var j = 0; j < part.length; j++) {
	      u8[offset++] = part[j];
	    }
	  }
	  return u8;
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stream = function () {
	  try {
	    return __webpack_require__(41); // hack to fix a circular dependency issue when used with browserify
	  } catch (_) {}
	}();
	exports = module.exports = __webpack_require__(42);
	exports.Stream = Stream || exports;
	exports.Readable = exports;
	exports.Writable = __webpack_require__(52);
	exports.Duplex = __webpack_require__(51);
	exports.Transform = __webpack_require__(55);
	exports.PassThrough = __webpack_require__(56);

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = require("stream");

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = Readable;

	/*<replacement>*/
	var processNextTick = __webpack_require__(43);
	/*</replacement>*/

	/*<replacement>*/
	var isArray = __webpack_require__(44);
	/*</replacement>*/

	/*<replacement>*/
	var Buffer = __webpack_require__(45).Buffer;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	var EE = __webpack_require__(46);

	/*<replacement>*/
	var EElistenerCount = function EElistenerCount(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	/*<replacement>*/
	var Stream;
	(function () {
	  try {
	    Stream = __webpack_require__(41);
	  } catch (_) {} finally {
	    if (!Stream) Stream = __webpack_require__(46).EventEmitter;
	  }
	})();
	/*</replacement>*/

	var Buffer = __webpack_require__(45).Buffer;

	/*<replacement>*/
	var util = __webpack_require__(47);
	util.inherits = __webpack_require__(48);
	/*</replacement>*/

	/*<replacement>*/
	var debugUtil = __webpack_require__(49);
	var debug = undefined;
	if (debugUtil && debugUtil.debuglog) {
	  debug = debugUtil.debuglog('stream');
	} else {
	  debug = function debug() {};
	}
	/*</replacement>*/

	var StringDecoder;

	util.inherits(Readable, Stream);

	var Duplex;
	function ReadableState(options, stream) {
	  Duplex = Duplex || __webpack_require__(51);

	  options = options || {};

	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	  this.resumeScheduled = false;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder) StringDecoder = __webpack_require__(54).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	var Duplex;
	function Readable(options) {
	  Duplex = Duplex || __webpack_require__(51);

	  if (!(this instanceof Readable)) return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  if (options && typeof options.read === 'function') this._read = options.read;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;

	  if (!state.objectMode && typeof chunk === 'string') {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function (chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	Readable.prototype.isPaused = function () {
	  return this._readableState.flowing === false;
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (chunk === null) {
	    state.reading = false;
	    onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      var skipAdd;
	      if (state.decoder && !addToFront && !encoding) {
	        chunk = state.decoder.write(chunk);
	        skipAdd = !state.objectMode && chunk.length === 0;
	      }

	      if (!addToFront) state.reading = false;

	      // Don't add to the buffer if we've decoded to an empty string chunk and
	      // we're not in object mode
	      if (!skipAdd) {
	        // if we want the data now, just emit it.
	        if (state.flowing && state.length === 0 && !state.sync) {
	          stream.emit('data', chunk);
	          stream.read(0);
	        } else {
	          // update the buffer info.
	          state.length += state.objectMode ? 1 : chunk.length;
	          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

	          if (state.needReadable) emitReadable(stream);
	        }
	      }

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}

	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function (enc) {
	  if (!StringDecoder) StringDecoder = __webpack_require__(54).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};

	// Don't raise the hwm > 8MB
	var MAX_HWM = 0x800000;
	function computeNewHighWaterMark(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    n |= n >>> 1;
	    n |= n >>> 2;
	    n |= n >>> 4;
	    n |= n >>> 8;
	    n |= n >>> 16;
	    n++;
	  }
	  return n;
	}

	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended) return 0;

	  if (state.objectMode) return n === 0 ? 0 : 1;

	  if (n === null || isNaN(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length) return state.buffer[0].length;else return state.length;
	  }

	  if (n <= 0) return 0;

	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);

	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else {
	      return state.length;
	    }
	  }

	  return n;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function (n) {
	  debug('read', n);
	  var state = this._readableState;
	  var nOrig = n;

	  if (typeof n !== 'number' || n > 0) state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  }

	  if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0) state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }

	  // If _read pushed data synchronously, then `reading` will be false,
	  // and we need to re-evaluate how much data we can return to the user.
	  if (doRead && !state.reading) n = howMuchToRead(nOrig, state);

	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;

	  if (ret === null) {
	    state.needReadable = true;
	    n = 0;
	  }

	  state.length -= n;

	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended) state.needReadable = true;

	  // If we tried to read() past the EOF, then emit end on the next tick.
	  if (nOrig !== n && state.ended && state.length === 0) endReadable(this);

	  if (ret !== null) this.emit('data', ret);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}

	function onEofChunk(stream, state) {
	  if (state.ended) return;
	  if (state.decoder) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
	  }
	}

	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}

	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    processNextTick(maybeReadMore_, stream, state);
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;else len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function (n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function (dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  var cleanedUp = false;
	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);

	    cleanedUp = true;

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }

	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    if (false === ret) {
	      // If the user unpiped during `dest.write()`, it is possible
	      // to get stuck in a permanently paused state if that write
	      // also returned false.
	      if (state.pipesCount === 1 && state.pipes[0] === dest && src.listenerCount('data') === 1 && !cleanedUp) {
	        debug('false write response, pause', src._readableState.awaitDrain);
	        src._readableState.awaitDrain++;
	      }
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error) dest.on('error', onerror);else if (isArray(dest._events.error)) dest._events.error.unshift(onerror);else dest._events.error = [onerror, dest._events.error];

	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function () {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;
	    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}

	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0) return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;

	    if (!dest) dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var _i = 0; _i < len; _i++) {
	      dests[_i].emit('unpipe', this);
	    }return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1) return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function (ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  // If listening to data, and it has not explicitly been paused,
	  // then call resume to start the flow of data on the next tick.
	  if (ev === 'data' && false !== this._readableState.flowing) {
	    this.resume();
	  }

	  if (ev === 'readable' && !this._readableState.endEmitted) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        processNextTick(nReadingNextTick, this);
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	function nReadingNextTick(self) {
	  debug('readable nexttick read 0');
	  self.read(0);
	}

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function () {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    resume(this, state);
	  }
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    processNextTick(resume_, stream, state);
	  }
	}

	function resume_(stream, state) {
	  if (!state.reading) {
	    debug('resume read 0');
	    stream.read(0);
	  }

	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}

	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  if (state.flowing) {
	    do {
	      var chunk = stream.read();
	    } while (null !== chunk && state.flowing);
	  }
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function (stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function () {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk);

	    // don't skip over falsy values in objectMode
	    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (this[i] === undefined && typeof stream[i] === 'function') {
	      this[i] = function (method) {
	        return function () {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function (ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function (n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};

	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;

	  // nothing in the list, definitely empty.
	  if (list.length === 0) return null;

	  if (length === 0) ret = null;else if (objectMode) ret = list.shift();else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode) ret = list.join('');else if (list.length === 1) ret = list[0];else ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode) ret = '';else ret = new Buffer(n);

	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);

	        if (stringMode) ret += buf.slice(0, cpy);else buf.copy(ret, c, 0, cpy);

	        if (cpy < buf.length) list[0] = buf.slice(cpy);else list.shift();

	        c += cpy;
	      }
	    }
	  }

	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0) throw new Error('endReadable called on non-empty stream');

	  if (!state.endEmitted) {
	    state.ended = true;
	    processNextTick(endReadableNT, state, stream);
	  }
	}

	function endReadableNT(state, stream) {
	  // Check that we didn't get one last unshift.
	  if (!state.endEmitted && state.length === 0) {
	    state.endEmitted = true;
	    stream.readable = false;
	    stream.emit('end');
	  }
	}

	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	if (!process.version || process.version.indexOf('v0.') === 0 || process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
	  module.exports = nextTick;
	} else {
	  module.exports = process.nextTick;
	}

	function nextTick(fn, arg1, arg2, arg3) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('"callback" argument must be a function');
	  }
	  var len = arguments.length;
	  var args, i;
	  switch (len) {
	    case 0:
	    case 1:
	      return process.nextTick(fn);
	    case 2:
	      return process.nextTick(function afterTickOne() {
	        fn.call(null, arg1);
	      });
	    case 3:
	      return process.nextTick(function afterTickTwo() {
	        fn.call(null, arg1, arg2);
	      });
	    case 4:
	      return process.nextTick(function afterTickThree() {
	        fn.call(null, arg1, arg2, arg3);
	      });
	    default:
	      args = new Array(len - 1);
	      i = 0;
	      while (i < args.length) {
	        args[i++] = arguments[i];
	      }
	      return process.nextTick(function afterTick() {
	        fn.apply(null, args);
	      });
	  }
	}

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = require("buffer");

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.

	function isArray(arg) {
	  if (Array.isArray) {
	    return Array.isArray(arg);
	  }
	  return objectToString(arg) === '[object Array]';
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return objectToString(e) === '[object Error]' || e instanceof Error;
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'symbol' || // ES6 symbol
	  typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = Buffer.isBuffer;

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	try {
	  var util = __webpack_require__(49);
	  if (typeof util.inherits !== 'function') throw '';
	  module.exports = util.inherits;
	} catch (e) {
	  module.exports = __webpack_require__(50);
	}

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function TempCtor() {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	'use strict';

	/*<replacement>*/

	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    keys.push(key);
	  }return keys;
	};
	/*</replacement>*/

	module.exports = Duplex;

	/*<replacement>*/
	var processNextTick = __webpack_require__(43);
	/*</replacement>*/

	/*<replacement>*/
	var util = __webpack_require__(47);
	util.inherits = __webpack_require__(48);
	/*</replacement>*/

	var Readable = __webpack_require__(42);
	var Writable = __webpack_require__(52);

	util.inherits(Duplex, Readable);

	var keys = objectKeys(Writable.prototype);
	for (var v = 0; v < keys.length; v++) {
	  var method = keys[v];
	  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	}

	function Duplex(options) {
	  if (!(this instanceof Duplex)) return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false) this.readable = false;

	  if (options && options.writable === false) this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended) return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  processNextTick(onEndNT, this);
	}

	function onEndNT(self) {
	  self.end();
	}

	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, encoding, cb), and it'll handle all
	// the drain event emission and buffering.

	'use strict';

	module.exports = Writable;

	/*<replacement>*/
	var processNextTick = __webpack_require__(43);
	/*</replacement>*/

	/*<replacement>*/
	var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
	/*</replacement>*/

	/*<replacement>*/
	var Buffer = __webpack_require__(45).Buffer;
	/*</replacement>*/

	Writable.WritableState = WritableState;

	/*<replacement>*/
	var util = __webpack_require__(47);
	util.inherits = __webpack_require__(48);
	/*</replacement>*/

	/*<replacement>*/
	var internalUtil = {
	  deprecate: __webpack_require__(53)
	};
	/*</replacement>*/

	/*<replacement>*/
	var Stream;
	(function () {
	  try {
	    Stream = __webpack_require__(41);
	  } catch (_) {} finally {
	    if (!Stream) Stream = __webpack_require__(46).EventEmitter;
	  }
	})();
	/*</replacement>*/

	var Buffer = __webpack_require__(45).Buffer;

	util.inherits(Writable, Stream);

	function nop() {}

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	  this.next = null;
	}

	var Duplex;
	function WritableState(options, stream) {
	  Duplex = Duplex || __webpack_require__(51);

	  options = options || {};

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.bufferedRequest = null;
	  this.lastBufferedRequest = null;

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;

	  // count buffered requests
	  this.bufferedRequestCount = 0;

	  // create the two objects needed to store the corked requests
	  // they are not a linked list, as no new elements are inserted in there
	  this.corkedRequestsFree = new CorkedRequest(this);
	  this.corkedRequestsFree.next = new CorkedRequest(this);
	}

	WritableState.prototype.getBuffer = function writableStateGetBuffer() {
	  var current = this.bufferedRequest;
	  var out = [];
	  while (current) {
	    out.push(current);
	    current = current.next;
	  }
	  return out;
	};

	(function () {
	  try {
	    Object.defineProperty(WritableState.prototype, 'buffer', {
	      get: internalUtil.deprecate(function () {
	        return this.getBuffer();
	      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
	    });
	  } catch (_) {}
	})();

	var Duplex;
	function Writable(options) {
	  Duplex = Duplex || __webpack_require__(51);

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex)) return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  if (options) {
	    if (typeof options.write === 'function') this._write = options.write;

	    if (typeof options.writev === 'function') this._writev = options.writev;
	  }

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function () {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};

	function writeAfterEnd(stream, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  processNextTick(cb, er);
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;

	  if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    processNextTick(cb, er);
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

	  if (typeof cb !== 'function') cb = nop;

	  if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }

	  return ret;
	};

	Writable.prototype.cork = function () {
	  var state = this._writableState;

	  state.corked++;
	};

	Writable.prototype.uncork = function () {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;

	    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
	  }
	};

	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
	  // node::ParseEncoding() requires lower case.
	  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
	  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
	  this._writableState.defaultEncoding = encoding;
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);

	  if (Buffer.isBuffer(chunk)) encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret) state.needDrain = true;

	  if (state.writing || state.corked) {
	    var last = state.lastBufferedRequest;
	    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
	    if (last) {
	      last.next = state.lastBufferedRequest;
	    } else {
	      state.bufferedRequest = state.lastBufferedRequest;
	    }
	    state.bufferedRequestCount += 1;
	  } else {
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	  }

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  --state.pendingcb;
	  if (sync) processNextTick(cb, er);else cb(er);

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(state);

	    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      /*<replacement>*/
	      asyncWrite(afterWrite, stream, state, finished, cb);
	      /*</replacement>*/
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}

	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	  var entry = state.bufferedRequest;

	  if (stream._writev && entry && entry.next) {
	    // Fast case, write everything using _writev()
	    var l = state.bufferedRequestCount;
	    var buffer = new Array(l);
	    var holder = state.corkedRequestsFree;
	    holder.entry = entry;

	    var count = 0;
	    while (entry) {
	      buffer[count] = entry;
	      entry = entry.next;
	      count += 1;
	    }

	    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

	    // doWrite is always async, defer these to save a bit of time
	    // as the hot path ends with doWrite
	    state.pendingcb++;
	    state.lastBufferedRequest = null;
	    state.corkedRequestsFree = holder.next;
	    holder.next = null;
	  } else {
	    // Slow case, write chunks one-by-one
	    while (entry) {
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;

	      doWrite(stream, state, false, len, chunk, encoding, cb);
	      entry = entry.next;
	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        break;
	      }
	    }

	    if (entry === null) state.lastBufferedRequest = null;
	  }

	  state.bufferedRequestCount = 0;
	  state.bufferedRequest = entry;
	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function (chunk, encoding, cb) {
	  cb(new Error('not implemented'));
	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;

	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished) endWritable(this, state, cb);
	};

	function needFinish(state) {
	  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}

	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else {
	      prefinish(stream, state);
	    }
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
	  }
	  state.ended = true;
	  stream.writable = false;
	}

	// It seems a linked list but it is not
	// there will be only 2 of these for each stream
	function CorkedRequest(state) {
	  var _this = this;

	  this.next = null;
	  this.entry = null;

	  this.finish = function (err) {
	    var entry = _this.entry;
	    _this.entry = null;
	    while (entry) {
	      var cb = entry.callback;
	      state.pendingcb--;
	      cb(err);
	      entry = entry.next;
	    }
	    if (state.corkedRequestsFree) {
	      state.corkedRequestsFree.next = _this;
	    } else {
	      state.corkedRequestsFree = _this;
	    }
	  };
	}

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * For Node.js, simply re-export the core `util.deprecate` function.
	 */

	module.exports = __webpack_require__(49).deprecate;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var Buffer = __webpack_require__(45).Buffer;

	var isBufferEncoding = Buffer.isEncoding || function (encoding) {
	  switch (encoding && encoding.toLowerCase()) {
	    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
	      return true;
	    default:
	      return false;
	  }
	};

	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function (encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};

	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function (buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function (buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = buffer.length >= 3 ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function (buffer) {
	  var res = '';
	  if (buffer && buffer.length) res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}

	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	'use strict';

	module.exports = Transform;

	var Duplex = __webpack_require__(51);

	/*<replacement>*/
	var util = __webpack_require__(47);
	util.inherits = __webpack_require__(48);
	/*</replacement>*/

	util.inherits(Transform, Duplex);

	function TransformState(stream) {
	  this.afterTransform = function (er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	  this.writeencoding = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (data !== null && data !== undefined) stream.push(data);

	  cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}

	function Transform(options) {
	  if (!(this instanceof Transform)) return new Transform(options);

	  Duplex.call(this, options);

	  this._transformState = new TransformState(this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  if (options) {
	    if (typeof options.transform === 'function') this._transform = options.transform;

	    if (typeof options.flush === 'function') this._flush = options.flush;
	  }

	  this.once('prefinish', function () {
	    if (typeof this._flush === 'function') this._flush(function (er) {
	      done(stream, er);
	    });else done(stream);
	  });
	}

	Transform.prototype.push = function (chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function (chunk, encoding, cb) {
	  throw new Error('not implemented');
	};

	Transform.prototype._write = function (chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function (n) {
	  var ts = this._transformState;

	  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};

	function done(stream, er) {
	  if (er) return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;

	  if (ws.length) throw new Error('calling transform done when ws.length != 0');

	  if (ts.transforming) throw new Error('calling transform done when still transforming');

	  return stream.push(null);
	}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.

	'use strict';

	module.exports = PassThrough;

	var Transform = __webpack_require__(55);

	/*<replacement>*/
	var util = __webpack_require__(47);
	util.inherits = __webpack_require__(48);
	/*</replacement>*/

	util.inherits(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough)) return new PassThrough(options);

	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function (chunk, encoding, cb) {
	  cb(null, chunk);
	};

/***/ },
/* 57 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var undefined = void 0; // Paranoia

	// Beyond this value, index getters/setters (i.e. array[0], array[1]) are so slow to
	// create, and consume so much memory, that the browser appears frozen.
	var MAX_ARRAY_LENGTH = 1e5;

	// Approximations of internal ECMAScript conversion functions
	var ECMAScript = function () {
	  // Stash a copy in case other scripts modify these
	  var opts = Object.prototype.toString,
	      ophop = Object.prototype.hasOwnProperty;

	  return {
	    // Class returns internal [[Class]] property, used to avoid cross-frame instanceof issues:
	    Class: function Class(v) {
	      return opts.call(v).replace(/^\[object *|\]$/g, '');
	    },
	    HasProperty: function HasProperty(o, p) {
	      return p in o;
	    },
	    HasOwnProperty: function HasOwnProperty(o, p) {
	      return ophop.call(o, p);
	    },
	    IsCallable: function IsCallable(o) {
	      return typeof o === 'function';
	    },
	    ToInt32: function ToInt32(v) {
	      return v >> 0;
	    },
	    ToUint32: function ToUint32(v) {
	      return v >>> 0;
	    }
	  };
	}();

	// Snapshot intrinsics
	var LN2 = Math.LN2,
	    abs = Math.abs,
	    floor = Math.floor,
	    log = Math.log,
	    min = Math.min,
	    pow = Math.pow,
	    round = Math.round;

	// ES5: lock down object properties
	function configureProperties(obj) {
	  if (getOwnPropNames && defineProp) {
	    var props = getOwnPropNames(obj),
	        i;
	    for (i = 0; i < props.length; i += 1) {
	      defineProp(obj, props[i], {
	        value: obj[props[i]],
	        writable: false,
	        enumerable: false,
	        configurable: false
	      });
	    }
	  }
	}

	// emulate ES5 getter/setter API using legacy APIs
	// http://blogs.msdn.com/b/ie/archive/2010/09/07/transitioning-existing-code-to-the-es5-getter-setter-apis.aspx
	// (second clause tests for Object.defineProperty() in IE<9 that only supports extending DOM prototypes, but
	// note that IE<9 does not support __defineGetter__ or __defineSetter__ so it just renders the method harmless)
	var defineProp;
	if (Object.defineProperty && function () {
	  try {
	    Object.defineProperty({}, 'x', {});
	    return true;
	  } catch (e) {
	    return false;
	  }
	}()) {
	  defineProp = Object.defineProperty;
	} else {
	  defineProp = function defineProp(o, p, desc) {
	    if (!o === Object(o)) throw new TypeError("Object.defineProperty called on non-object");
	    if (ECMAScript.HasProperty(desc, 'get') && Object.prototype.__defineGetter__) {
	      Object.prototype.__defineGetter__.call(o, p, desc.get);
	    }
	    if (ECMAScript.HasProperty(desc, 'set') && Object.prototype.__defineSetter__) {
	      Object.prototype.__defineSetter__.call(o, p, desc.set);
	    }
	    if (ECMAScript.HasProperty(desc, 'value')) {
	      o[p] = desc.value;
	    }
	    return o;
	  };
	}

	var getOwnPropNames = Object.getOwnPropertyNames || function (o) {
	  if (o !== Object(o)) throw new TypeError("Object.getOwnPropertyNames called on non-object");
	  var props = [],
	      p;
	  for (p in o) {
	    if (ECMAScript.HasOwnProperty(o, p)) {
	      props.push(p);
	    }
	  }
	  return props;
	};

	// ES5: Make obj[index] an alias for obj._getter(index)/obj._setter(index, value)
	// for index in 0 ... obj.length
	function makeArrayAccessors(obj) {
	  if (!defineProp) {
	    return;
	  }

	  if (obj.length > MAX_ARRAY_LENGTH) throw new RangeError("Array too large for polyfill");

	  function makeArrayAccessor(index) {
	    defineProp(obj, index, {
	      'get': function get() {
	        return obj._getter(index);
	      },
	      'set': function set(v) {
	        obj._setter(index, v);
	      },
	      enumerable: true,
	      configurable: false
	    });
	  }

	  var i;
	  for (i = 0; i < obj.length; i += 1) {
	    makeArrayAccessor(i);
	  }
	}

	// Internal conversion functions:
	//    pack<Type>()   - take a number (interpreted as Type), output a byte array
	//    unpack<Type>() - take a byte array, output a Type-like number

	function as_signed(value, bits) {
	  var s = 32 - bits;return value << s >> s;
	}
	function as_unsigned(value, bits) {
	  var s = 32 - bits;return value << s >>> s;
	}

	function packI8(n) {
	  return [n & 0xff];
	}
	function unpackI8(bytes) {
	  return as_signed(bytes[0], 8);
	}

	function packU8(n) {
	  return [n & 0xff];
	}
	function unpackU8(bytes) {
	  return as_unsigned(bytes[0], 8);
	}

	function packU8Clamped(n) {
	  n = round(Number(n));return [n < 0 ? 0 : n > 0xff ? 0xff : n & 0xff];
	}

	function packI16(n) {
	  return [n >> 8 & 0xff, n & 0xff];
	}
	function unpackI16(bytes) {
	  return as_signed(bytes[0] << 8 | bytes[1], 16);
	}

	function packU16(n) {
	  return [n >> 8 & 0xff, n & 0xff];
	}
	function unpackU16(bytes) {
	  return as_unsigned(bytes[0] << 8 | bytes[1], 16);
	}

	function packI32(n) {
	  return [n >> 24 & 0xff, n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff];
	}
	function unpackI32(bytes) {
	  return as_signed(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], 32);
	}

	function packU32(n) {
	  return [n >> 24 & 0xff, n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff];
	}
	function unpackU32(bytes) {
	  return as_unsigned(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], 32);
	}

	function packIEEE754(v, ebits, fbits) {

	  var bias = (1 << ebits - 1) - 1,
	      s,
	      e,
	      f,
	      ln,
	      i,
	      bits,
	      str,
	      bytes;

	  function roundToEven(n) {
	    var w = floor(n),
	        f = n - w;
	    if (f < 0.5) return w;
	    if (f > 0.5) return w + 1;
	    return w % 2 ? w + 1 : w;
	  }

	  // Compute sign, exponent, fraction
	  if (v !== v) {
	    // NaN
	    // http://dev.w3.org/2006/webapi/WebIDL/#es-type-mapping
	    e = (1 << ebits) - 1;f = pow(2, fbits - 1);s = 0;
	  } else if (v === Infinity || v === -Infinity) {
	    e = (1 << ebits) - 1;f = 0;s = v < 0 ? 1 : 0;
	  } else if (v === 0) {
	    e = 0;f = 0;s = 1 / v === -Infinity ? 1 : 0;
	  } else {
	    s = v < 0;
	    v = abs(v);

	    if (v >= pow(2, 1 - bias)) {
	      e = min(floor(log(v) / LN2), 1023);
	      f = roundToEven(v / pow(2, e) * pow(2, fbits));
	      if (f / pow(2, fbits) >= 2) {
	        e = e + 1;
	        f = 1;
	      }
	      if (e > bias) {
	        // Overflow
	        e = (1 << ebits) - 1;
	        f = 0;
	      } else {
	        // Normalized
	        e = e + bias;
	        f = f - pow(2, fbits);
	      }
	    } else {
	      // Denormalized
	      e = 0;
	      f = roundToEven(v / pow(2, 1 - bias - fbits));
	    }
	  }

	  // Pack sign, exponent, fraction
	  bits = [];
	  for (i = fbits; i; i -= 1) {
	    bits.push(f % 2 ? 1 : 0);f = floor(f / 2);
	  }
	  for (i = ebits; i; i -= 1) {
	    bits.push(e % 2 ? 1 : 0);e = floor(e / 2);
	  }
	  bits.push(s ? 1 : 0);
	  bits.reverse();
	  str = bits.join('');

	  // Bits to bytes
	  bytes = [];
	  while (str.length) {
	    bytes.push(parseInt(str.substring(0, 8), 2));
	    str = str.substring(8);
	  }
	  return bytes;
	}

	function unpackIEEE754(bytes, ebits, fbits) {

	  // Bytes to bits
	  var bits = [],
	      i,
	      j,
	      b,
	      str,
	      bias,
	      s,
	      e,
	      f;

	  for (i = bytes.length; i; i -= 1) {
	    b = bytes[i - 1];
	    for (j = 8; j; j -= 1) {
	      bits.push(b % 2 ? 1 : 0);b = b >> 1;
	    }
	  }
	  bits.reverse();
	  str = bits.join('');

	  // Unpack sign, exponent, fraction
	  bias = (1 << ebits - 1) - 1;
	  s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
	  e = parseInt(str.substring(1, 1 + ebits), 2);
	  f = parseInt(str.substring(1 + ebits), 2);

	  // Produce number
	  if (e === (1 << ebits) - 1) {
	    return f !== 0 ? NaN : s * Infinity;
	  } else if (e > 0) {
	    // Normalized
	    return s * pow(2, e - bias) * (1 + f / pow(2, fbits));
	  } else if (f !== 0) {
	    // Denormalized
	    return s * pow(2, -(bias - 1)) * (f / pow(2, fbits));
	  } else {
	    return s < 0 ? -0 : 0;
	  }
	}

	function unpackF64(b) {
	  return unpackIEEE754(b, 11, 52);
	}
	function packF64(v) {
	  return packIEEE754(v, 11, 52);
	}
	function unpackF32(b) {
	  return unpackIEEE754(b, 8, 23);
	}
	function packF32(v) {
	  return packIEEE754(v, 8, 23);
	}

	//
	// 3 The ArrayBuffer Type
	//

	(function () {

	  /** @constructor */
	  var ArrayBuffer = function ArrayBuffer(length) {
	    length = ECMAScript.ToInt32(length);
	    if (length < 0) throw new RangeError('ArrayBuffer size is not a small enough positive integer');

	    this.byteLength = length;
	    this._bytes = [];
	    this._bytes.length = length;

	    var i;
	    for (i = 0; i < this.byteLength; i += 1) {
	      this._bytes[i] = 0;
	    }

	    configureProperties(this);
	  };

	  exports.ArrayBuffer = exports.ArrayBuffer || ArrayBuffer;

	  //
	  // 4 The ArrayBufferView Type
	  //

	  // NOTE: this constructor is not exported
	  /** @constructor */
	  var ArrayBufferView = function ArrayBufferView() {
	    //this.buffer = null;
	    //this.byteOffset = 0;
	    //this.byteLength = 0;
	  };

	  //
	  // 5 The Typed Array View Types
	  //

	  function makeConstructor(bytesPerElement, pack, unpack) {
	    // Each TypedArray type requires a distinct constructor instance with
	    // identical logic, which this produces.

	    var _ctor;
	    _ctor = function ctor(buffer, byteOffset, length) {
	      var array, sequence, i, s;

	      if (!arguments.length || typeof arguments[0] === 'number') {
	        // Constructor(unsigned long length)
	        this.length = ECMAScript.ToInt32(arguments[0]);
	        if (length < 0) throw new RangeError('ArrayBufferView size is not a small enough positive integer');

	        this.byteLength = this.length * this.BYTES_PER_ELEMENT;
	        this.buffer = new ArrayBuffer(this.byteLength);
	        this.byteOffset = 0;
	      } else if (_typeof(arguments[0]) === 'object' && arguments[0].constructor === _ctor) {
	        // Constructor(TypedArray array)
	        array = arguments[0];

	        this.length = array.length;
	        this.byteLength = this.length * this.BYTES_PER_ELEMENT;
	        this.buffer = new ArrayBuffer(this.byteLength);
	        this.byteOffset = 0;

	        for (i = 0; i < this.length; i += 1) {
	          this._setter(i, array._getter(i));
	        }
	      } else if (_typeof(arguments[0]) === 'object' && !(arguments[0] instanceof ArrayBuffer || ECMAScript.Class(arguments[0]) === 'ArrayBuffer')) {
	        // Constructor(sequence<type> array)
	        sequence = arguments[0];

	        this.length = ECMAScript.ToUint32(sequence.length);
	        this.byteLength = this.length * this.BYTES_PER_ELEMENT;
	        this.buffer = new ArrayBuffer(this.byteLength);
	        this.byteOffset = 0;

	        for (i = 0; i < this.length; i += 1) {
	          s = sequence[i];
	          this._setter(i, Number(s));
	        }
	      } else if (_typeof(arguments[0]) === 'object' && (arguments[0] instanceof ArrayBuffer || ECMAScript.Class(arguments[0]) === 'ArrayBuffer')) {
	        // Constructor(ArrayBuffer buffer,
	        //             optional unsigned long byteOffset, optional unsigned long length)
	        this.buffer = buffer;

	        this.byteOffset = ECMAScript.ToUint32(byteOffset);
	        if (this.byteOffset > this.buffer.byteLength) {
	          throw new RangeError("byteOffset out of range");
	        }

	        if (this.byteOffset % this.BYTES_PER_ELEMENT) {
	          // The given byteOffset must be a multiple of the element
	          // size of the specific type, otherwise an exception is raised.
	          throw new RangeError("ArrayBuffer length minus the byteOffset is not a multiple of the element size.");
	        }

	        if (arguments.length < 3) {
	          this.byteLength = this.buffer.byteLength - this.byteOffset;

	          if (this.byteLength % this.BYTES_PER_ELEMENT) {
	            throw new RangeError("length of buffer minus byteOffset not a multiple of the element size");
	          }
	          this.length = this.byteLength / this.BYTES_PER_ELEMENT;
	        } else {
	          this.length = ECMAScript.ToUint32(length);
	          this.byteLength = this.length * this.BYTES_PER_ELEMENT;
	        }

	        if (this.byteOffset + this.byteLength > this.buffer.byteLength) {
	          throw new RangeError("byteOffset and length reference an area beyond the end of the buffer");
	        }
	      } else {
	        throw new TypeError("Unexpected argument type(s)");
	      }

	      this.constructor = _ctor;

	      configureProperties(this);
	      makeArrayAccessors(this);
	    };

	    _ctor.prototype = new ArrayBufferView();
	    _ctor.prototype.BYTES_PER_ELEMENT = bytesPerElement;
	    _ctor.prototype._pack = pack;
	    _ctor.prototype._unpack = unpack;
	    _ctor.BYTES_PER_ELEMENT = bytesPerElement;

	    // getter type (unsigned long index);
	    _ctor.prototype._getter = function (index) {
	      if (arguments.length < 1) throw new SyntaxError("Not enough arguments");

	      index = ECMAScript.ToUint32(index);
	      if (index >= this.length) {
	        return undefined;
	      }

	      var bytes = [],
	          i,
	          o;
	      for (i = 0, o = this.byteOffset + index * this.BYTES_PER_ELEMENT; i < this.BYTES_PER_ELEMENT; i += 1, o += 1) {
	        bytes.push(this.buffer._bytes[o]);
	      }
	      return this._unpack(bytes);
	    };

	    // NONSTANDARD: convenience alias for getter: type get(unsigned long index);
	    _ctor.prototype.get = _ctor.prototype._getter;

	    // setter void (unsigned long index, type value);
	    _ctor.prototype._setter = function (index, value) {
	      if (arguments.length < 2) throw new SyntaxError("Not enough arguments");

	      index = ECMAScript.ToUint32(index);
	      if (index >= this.length) {
	        return undefined;
	      }

	      var bytes = this._pack(value),
	          i,
	          o;
	      for (i = 0, o = this.byteOffset + index * this.BYTES_PER_ELEMENT; i < this.BYTES_PER_ELEMENT; i += 1, o += 1) {
	        this.buffer._bytes[o] = bytes[i];
	      }
	    };

	    // void set(TypedArray array, optional unsigned long offset);
	    // void set(sequence<type> array, optional unsigned long offset);
	    _ctor.prototype.set = function (index, value) {
	      if (arguments.length < 1) throw new SyntaxError("Not enough arguments");
	      var array, sequence, offset, len, i, s, d, byteOffset, byteLength, tmp;

	      if (_typeof(arguments[0]) === 'object' && arguments[0].constructor === this.constructor) {
	        // void set(TypedArray array, optional unsigned long offset);
	        array = arguments[0];
	        offset = ECMAScript.ToUint32(arguments[1]);

	        if (offset + array.length > this.length) {
	          throw new RangeError("Offset plus length of array is out of range");
	        }

	        byteOffset = this.byteOffset + offset * this.BYTES_PER_ELEMENT;
	        byteLength = array.length * this.BYTES_PER_ELEMENT;

	        if (array.buffer === this.buffer) {
	          tmp = [];
	          for (i = 0, s = array.byteOffset; i < byteLength; i += 1, s += 1) {
	            tmp[i] = array.buffer._bytes[s];
	          }
	          for (i = 0, d = byteOffset; i < byteLength; i += 1, d += 1) {
	            this.buffer._bytes[d] = tmp[i];
	          }
	        } else {
	          for (i = 0, s = array.byteOffset, d = byteOffset; i < byteLength; i += 1, s += 1, d += 1) {
	            this.buffer._bytes[d] = array.buffer._bytes[s];
	          }
	        }
	      } else if (_typeof(arguments[0]) === 'object' && typeof arguments[0].length !== 'undefined') {
	        // void set(sequence<type> array, optional unsigned long offset);
	        sequence = arguments[0];
	        len = ECMAScript.ToUint32(sequence.length);
	        offset = ECMAScript.ToUint32(arguments[1]);

	        if (offset + len > this.length) {
	          throw new RangeError("Offset plus length of array is out of range");
	        }

	        for (i = 0; i < len; i += 1) {
	          s = sequence[i];
	          this._setter(offset + i, Number(s));
	        }
	      } else {
	        throw new TypeError("Unexpected argument type(s)");
	      }
	    };

	    // TypedArray subarray(long begin, optional long end);
	    _ctor.prototype.subarray = function (start, end) {
	      function clamp(v, min, max) {
	        return v < min ? min : v > max ? max : v;
	      }

	      start = ECMAScript.ToInt32(start);
	      end = ECMAScript.ToInt32(end);

	      if (arguments.length < 1) {
	        start = 0;
	      }
	      if (arguments.length < 2) {
	        end = this.length;
	      }

	      if (start < 0) {
	        start = this.length + start;
	      }
	      if (end < 0) {
	        end = this.length + end;
	      }

	      start = clamp(start, 0, this.length);
	      end = clamp(end, 0, this.length);

	      var len = end - start;
	      if (len < 0) {
	        len = 0;
	      }

	      return new this.constructor(this.buffer, this.byteOffset + start * this.BYTES_PER_ELEMENT, len);
	    };

	    return _ctor;
	  }

	  var Int8Array = makeConstructor(1, packI8, unpackI8);
	  var Uint8Array = makeConstructor(1, packU8, unpackU8);
	  var Uint8ClampedArray = makeConstructor(1, packU8Clamped, unpackU8);
	  var Int16Array = makeConstructor(2, packI16, unpackI16);
	  var Uint16Array = makeConstructor(2, packU16, unpackU16);
	  var Int32Array = makeConstructor(4, packI32, unpackI32);
	  var Uint32Array = makeConstructor(4, packU32, unpackU32);
	  var Float32Array = makeConstructor(4, packF32, unpackF32);
	  var Float64Array = makeConstructor(8, packF64, unpackF64);

	  exports.Int8Array = exports.Int8Array || Int8Array;
	  exports.Uint8Array = exports.Uint8Array || Uint8Array;
	  exports.Uint8ClampedArray = exports.Uint8ClampedArray || Uint8ClampedArray;
	  exports.Int16Array = exports.Int16Array || Int16Array;
	  exports.Uint16Array = exports.Uint16Array || Uint16Array;
	  exports.Int32Array = exports.Int32Array || Int32Array;
	  exports.Uint32Array = exports.Uint32Array || Uint32Array;
	  exports.Float32Array = exports.Float32Array || Float32Array;
	  exports.Float64Array = exports.Float64Array || Float64Array;
	})();

	//
	// 6 The DataView View Type
	//

	(function () {
	  function r(array, index) {
	    return ECMAScript.IsCallable(array.get) ? array.get(index) : array[index];
	  }

	  var IS_BIG_ENDIAN = function () {
	    var u16array = new exports.Uint16Array([0x1234]),
	        u8array = new exports.Uint8Array(u16array.buffer);
	    return r(u8array, 0) === 0x12;
	  }();

	  // Constructor(ArrayBuffer buffer,
	  //             optional unsigned long byteOffset,
	  //             optional unsigned long byteLength)
	  /** @constructor */
	  var DataView = function DataView(buffer, byteOffset, byteLength) {
	    if (arguments.length === 0) {
	      buffer = new exports.ArrayBuffer(0);
	    } else if (!(buffer instanceof exports.ArrayBuffer || ECMAScript.Class(buffer) === 'ArrayBuffer')) {
	      throw new TypeError("TypeError");
	    }

	    this.buffer = buffer || new exports.ArrayBuffer(0);

	    this.byteOffset = ECMAScript.ToUint32(byteOffset);
	    if (this.byteOffset > this.buffer.byteLength) {
	      throw new RangeError("byteOffset out of range");
	    }

	    if (arguments.length < 3) {
	      this.byteLength = this.buffer.byteLength - this.byteOffset;
	    } else {
	      this.byteLength = ECMAScript.ToUint32(byteLength);
	    }

	    if (this.byteOffset + this.byteLength > this.buffer.byteLength) {
	      throw new RangeError("byteOffset and length reference an area beyond the end of the buffer");
	    }

	    configureProperties(this);
	  };

	  function makeGetter(arrayType) {
	    return function (byteOffset, littleEndian) {

	      byteOffset = ECMAScript.ToUint32(byteOffset);

	      if (byteOffset + arrayType.BYTES_PER_ELEMENT > this.byteLength) {
	        throw new RangeError("Array index out of range");
	      }
	      byteOffset += this.byteOffset;

	      var uint8Array = new exports.Uint8Array(this.buffer, byteOffset, arrayType.BYTES_PER_ELEMENT),
	          bytes = [],
	          i;
	      for (i = 0; i < arrayType.BYTES_PER_ELEMENT; i += 1) {
	        bytes.push(r(uint8Array, i));
	      }

	      if (Boolean(littleEndian) === Boolean(IS_BIG_ENDIAN)) {
	        bytes.reverse();
	      }

	      return r(new arrayType(new exports.Uint8Array(bytes).buffer), 0);
	    };
	  }

	  DataView.prototype.getUint8 = makeGetter(exports.Uint8Array);
	  DataView.prototype.getInt8 = makeGetter(exports.Int8Array);
	  DataView.prototype.getUint16 = makeGetter(exports.Uint16Array);
	  DataView.prototype.getInt16 = makeGetter(exports.Int16Array);
	  DataView.prototype.getUint32 = makeGetter(exports.Uint32Array);
	  DataView.prototype.getInt32 = makeGetter(exports.Int32Array);
	  DataView.prototype.getFloat32 = makeGetter(exports.Float32Array);
	  DataView.prototype.getFloat64 = makeGetter(exports.Float64Array);

	  function makeSetter(arrayType) {
	    return function (byteOffset, value, littleEndian) {

	      byteOffset = ECMAScript.ToUint32(byteOffset);
	      if (byteOffset + arrayType.BYTES_PER_ELEMENT > this.byteLength) {
	        throw new RangeError("Array index out of range");
	      }

	      // Get bytes
	      var typeArray = new arrayType([value]),
	          byteArray = new exports.Uint8Array(typeArray.buffer),
	          bytes = [],
	          i,
	          byteView;

	      for (i = 0; i < arrayType.BYTES_PER_ELEMENT; i += 1) {
	        bytes.push(r(byteArray, i));
	      }

	      // Flip if necessary
	      if (Boolean(littleEndian) === Boolean(IS_BIG_ENDIAN)) {
	        bytes.reverse();
	      }

	      // Write them
	      byteView = new exports.Uint8Array(this.buffer, byteOffset, arrayType.BYTES_PER_ELEMENT);
	      byteView.set(bytes);
	    };
	  }

	  DataView.prototype.setUint8 = makeSetter(exports.Uint8Array);
	  DataView.prototype.setInt8 = makeSetter(exports.Int8Array);
	  DataView.prototype.setUint16 = makeSetter(exports.Uint16Array);
	  DataView.prototype.setInt16 = makeSetter(exports.Int16Array);
	  DataView.prototype.setUint32 = makeSetter(exports.Uint32Array);
	  DataView.prototype.setInt32 = makeSetter(exports.Int32Array);
	  DataView.prototype.setFloat32 = makeSetter(exports.Float32Array);
	  DataView.prototype.setFloat64 = makeSetter(exports.Float64Array);

	  exports.DataView = exports.DataView || DataView;
	})();

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var orange_1 = __webpack_require__(20);
	var header_1 = __webpack_require__(32);
	var request_1 = __webpack_require__(36);
	var response_1 = __webpack_require__(37);
	var support_1 = __webpack_require__(33);
	function headers(xhr) {
	    var head = new header_1.Headers();
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n');
	    for (var i = 0, ii = pairs.length; i < ii; i++) {
	        var split = pairs[i].trim().split(':');
	        var key = split.shift().trim();
	        var value = split.join(':').trim();
	        head.append(key, value);
	    }
	    return head;
	}
	function fetch(input, init) {
	    return new orange_1.Promise(function (resolve, reject) {
	        var request;
	        if (request_1.isRequest(input) && !init) {
	            request = input;
	        } else {
	            request = new request_1.Request(input, init);
	        }
	        init = init || {};
	        var xhr = orange_1.xmlHttpRequest();
	        function responseURL() {
	            if ('responseURL' in xhr) {
	                return xhr.responseURL;
	            }
	            // Avoid security warnings on getResponseHeader when not allowed by CORS
	            if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	                return xhr.getResponseHeader('X-Request-URL');
	            }
	            return;
	        }
	        xhr.onload = function () {
	            var options = {
	                status: xhr.status,
	                statusText: xhr.statusText,
	                headers: headers(xhr),
	                url: responseURL()
	            };
	            var body = 'response' in xhr ? xhr.response : xhr.responseText;
	            resolve(new response_1.Response(body, options));
	        };
	        xhr.onerror = function () {
	            reject(new TypeError('Network request failed'));
	        };
	        xhr.ontimeout = function () {
	            reject(new TypeError('Network request failed: timeout'));
	        };
	        xhr.open(request.method, request.url, true);
	        if (request.credentials === 'include') {
	            xhr.withCredentials = true;
	        }
	        if ('responseType' in xhr && support_1.default.blob) {
	            xhr.responseType = 'blob';
	        }
	        request.headers.forEach(function (value, name) {
	            xhr.setRequestHeader(name, value);
	        });
	        if (init.downloadProgress) {
	            xhr.onprogress = init.downloadProgress;
	        }
	        if (init.uploadProgress || xhr.upload) {
	            xhr.upload.onprogress = init.uploadProgress;
	        }
	        xhr.send(typeof request.body === 'undefined' ? null : request.body);
	    });
	}
	exports.fetch = fetch;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(60));
	__export(__webpack_require__(81));
	__export(__webpack_require__(86));

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var views_1 = __webpack_require__(61);
	var orange_dom_1 = __webpack_require__(70);
	var orange_1 = __webpack_require__(20);
	var list_item_1 = __webpack_require__(81);
	var circular_progress_1 = __webpack_require__(84);
	//import {AssetsCollection} from '../../models/index';
	var Blazy = __webpack_require__(85);
	exports.FileListEmptyView = views_1.View.extend({
	    className: 'file-list-empty-view',
	    template: 'No files uploaded yet.'
	});
	var FileListView = function (_views_1$CollectionVi) {
	    _inherits(FileListView, _views_1$CollectionVi);

	    function FileListView(options) {
	        _classCallCheck(this, FileListView);

	        var _this = _possibleConstructorReturn(this, (FileListView.__proto__ || Object.getPrototypeOf(FileListView)).call(this, options));

	        _this.options = options || {};
	        _this.sort = false;
	        _this._onSroll = throttle(orange_1.bind(_this._onSroll, _this), 0);
	        _this._initBlazy();
	        return _this;
	    }

	    _createClass(FileListView, [{
	        key: "onCollection",
	        value: function onCollection(model) {
	            if (model) this._initEvents();
	            if (model) {
	                model.state.limit = 10;
	            }
	        }
	    }, {
	        key: "_initEvents",
	        value: function _initEvents() {
	            var _this3 = this;

	            this.listenTo(this, 'childview:click', function (view, model) {
	                if (this._current) orange_dom_1.removeClass(this._current.el, 'active');
	                this._current = view;
	                orange_dom_1.addClass(view.el, 'active');
	                this.trigger('selected', view, model);
	            });
	            this.listenTo(this, 'childview:dblclick', function (view, model) {
	                if (this._current) orange_dom_1.removeClass(this._current.el, 'active');
	                this._current = view;
	                orange_dom_1.addClass(view.el, 'active');
	                this.trigger('selected', view, model);
	                this.trigger('dblclick', view, model);
	            });
	            this.listenTo(this, 'childview:remove', function (view, _ref) {
	                var model = _ref.model;

	                this.trigger('remove', view, model);
	                /*if (this.options.deleteable === true) {
	                    let remove = true;
	                    if (model.has('deleteable')) {
	                        remove = !!model.get('deleteable');
	                    }
	                    if (remove) model.remove();
	                } else {
	                    
	                }*/
	            });
	            this.listenTo(this, 'childview:image', function (view) {
	                var _this2 = this;

	                var img = view.$('img')[0];
	                if (img.src === img.getAttribute('data-src')) {
	                    return;
	                }
	                setTimeout(function () {
	                    if (elementInView(view.el, _this2.el)) {
	                        _this2._blazy.load(view.$('img')[0]);
	                    }
	                }, 100);
	            });
	            this.listenTo(this.collection, 'before:fetch', this._showLoaderView);
	            this.listenTo(this.collection, 'fetch', this._hideLoaderView);
	            this.listenTo(this.collection, 'fetch:progress', function (e) {
	                if (!e.lengthComputable) return;
	                if (_this3._progress) _this3._progress.setPercent(100 / e.total * e.loaded);
	            });
	        }
	    }, {
	        key: "onRenderCollection",
	        value: function onRenderCollection() {
	            if (this._blazy) {
	                this._blazy.revalidate();
	            } else {
	                this._initBlazy();
	            }
	        }
	    }, {
	        key: "onRenderChild",
	        value: function onRenderChild(view, index) {
	            if (view.model.get('is_dir') && !this.options.showDirectories) {
	                view.el.style.display = 'none';
	            } else {
	                view.el.style.opacity = 'block';
	            }
	        }
	    }, {
	        key: "_showLoaderView",
	        value: function _showLoaderView() {
	            if (this._progress) return;
	            this._progress = new circular_progress_1.Progress({
	                size: 60,
	                lineWidth: 6
	            });
	            this.el.appendChild(this._progress.render().el);
	            orange_dom_1.addClass(this._progress.el, 'loader');
	        }
	    }, {
	        key: "_hideLoaderView",
	        value: function _hideLoaderView() {
	            if (!this._progress) return;
	            this._progress.remove().destroy();
	        }
	    }, {
	        key: "_onSroll",
	        value: function _onSroll(e) {
	            var index = this.index ? this.index : this.index = 0,
	                len = this.children.length;
	            for (var i = index; i < len; i++) {
	                var view = this.children[i],
	                    img = view.$('img')[0];
	                if (img == null) continue;
	                if (img.src === img.getAttribute('data-src')) {
	                    index = i;
	                } else if (elementInView(img, this.el)) {
	                    index = i;
	                    this._blazy.load(img, true);
	                }
	            }
	            this.index = index;
	            var el = this.el;
	            if (el.scrollTop < el.scrollHeight - el.clientHeight - el.clientHeight) {} else if (this.collection.hasNext()) {
	                this.collection.getNextPage({
	                    params: {
	                        show_hidden: true
	                    }
	                });
	            }
	        }
	    }, {
	        key: "_initBlazy",
	        value: function _initBlazy() {
	            this._blazy = new Blazy({
	                container: '.assets-list',
	                selector: 'img',
	                error: function error(img) {
	                    if (!img || !img.parentNode) return;
	                    var m = img.parentNode.querySelector('.mime');
	                    if (m) {
	                        m.style.display = 'block';
	                        img.style.display = 'none';
	                    }
	                }
	            });
	        }
	    }, {
	        key: "_initHeight",
	        value: function _initHeight() {
	            var _this4 = this;

	            var parent = this.el.parentElement;
	            if (!parent || parent.clientHeight === 0) {
	                if (!this._timer) {
	                    this._timer = setInterval(function () {
	                        return _this4._initHeight();
	                    }, 200);
	                }
	                return;
	            }
	            if (this._timer) {
	                clearInterval(this._timer);
	                this._timer = void 0;
	            }
	            this.el.style.height = parent.clientHeight + 'px';
	        }
	    }, {
	        key: "onShow",
	        value: function onShow() {
	            this._initHeight();
	        }
	    }]);

	    return FileListView;
	}(views_1.CollectionView);
	FileListView = __decorate([views_1.attributes({
	    //template: () => templates.list,
	    className: 'file-list collection-mode',
	    childView: list_item_1.FileListItemView,
	    emptyView: exports.FileListEmptyView,
	    //childViewContainer: '.file-list-item-container',
	    events: {
	        scroll: '_onSroll'
	    }
	}), __metadata('design:paramtypes', [Object])], FileListView);
	exports.FileListView = FileListView;
	function elementInView(ele, container) {
	    var viewport = {
	        top: 0,
	        left: 0,
	        bottom: 0,
	        right: 0
	    };
	    viewport.bottom = container.innerHeight || document.documentElement.clientHeight; // + options.offset;
	    viewport.right = container.innerWidth || document.documentElement.clientWidth; // + options.offset;
	    var rect = ele.getBoundingClientRect();
	    return (
	        // Intersection
	        rect.right >= viewport.left && rect.bottom >= viewport.top && rect.left <= viewport.right && rect.top <= viewport.bottom && !ele.classList.contains('b-error')
	    );
	}
	function throttle(fn, minDelay) {
	    var lastCall = 0;
	    return function () {
	        var now = +new Date();
	        if (now - lastCall < minDelay) {
	            return;
	        }
	        lastCall = now;
	        fn.apply(this, arguments);
	    };
	}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	var baseview_1 = __webpack_require__(62);
	__export(__webpack_require__(69));
	__export(__webpack_require__(62));
	__export(__webpack_require__(75));
	__export(__webpack_require__(76));
	__export(__webpack_require__(77));
	__export(__webpack_require__(78));
	__export(__webpack_require__(79));
	__export(__webpack_require__(80));
	exports.Version = '0.3.3';
	function debug(debug) {
	    if (window.localStorage) {
	        window.localStorage['debug'] = debug ? "views:*" : '';
	    }
	}
	exports.debug = debug;
	//export {Collection, ICollection,IModel,Model} from 'collection'
	function isView(a) {
	    return a instanceof baseview_1.BaseView;
	}
	exports.isView = isView;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Debug = __webpack_require__(63);
	var debug = Debug('views:baseview');
	var object_1 = __webpack_require__(69);
	var orange_1 = __webpack_require__(20);
	var orange_dom_1 = __webpack_require__(70);
	var util_1 = __webpack_require__(74);
	var paddedLt = /^\s*</;
	var unbubblebles = 'focus blur change'.split(' ');
	var viewOptions = ['el', 'id', 'attributes', 'className', 'tagName', 'events', 'triggers', 'ui'];
	var BaseView = function (_super) {
	    __extends(BaseView, _super);
	    /**
	     * BaseView
	     * @param {BaseViewOptions} options
	     * @extends BaseObject
	     */
	    function BaseView(options) {
	        if (options === void 0) {
	            options = {};
	        }
	        _super.call(this);
	        this._cid = orange_1.uniqueId('view');
	        orange_1.extend(this, orange_1.pick(options, viewOptions));
	        this._domEvents = [];
	        if (this.el == null) {
	            this._ensureElement();
	        }
	    }
	    BaseView.find = function (selector, context) {
	        return context.querySelectorAll(selector);
	    };
	    Object.defineProperty(BaseView.prototype, "cid", {
	        get: function get() {
	            return this._cid;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Delegate events
	     * @param {EventsMap} events
	     */
	    BaseView.prototype.delegateEvents = function (events) {
	        var _this = this;
	        this._bindUIElements();
	        events = events || orange_1.result(this, 'events');
	        events = util_1.normalizeUIKeys(events, this._ui);
	        var triggers = this._configureTriggers();
	        events = orange_1.extend({}, events, triggers);
	        debug('%s delegate events %j', this, events);
	        if (!events) return this;
	        //if (!(events || (events = result(this, 'events')))) return this;
	        //this.undelegateEvents();
	        var dels = [];
	        for (var key in events) {
	            var method = events[key];
	            if (typeof method !== 'function') method = this[method];
	            var match = key.match(/^(\S+)\s*(.*)$/);
	            // Set delegates immediately and defer event on this.el
	            var boundFn = orange_1.bind(method, this);
	            if (match[2]) {
	                this.delegate(match[1], match[2], boundFn);
	            } else {
	                dels.push([match[1], boundFn]);
	            }
	        }
	        dels.forEach(function (d) {
	            _this.delegate(d[0], d[1]);
	        });
	        return this;
	    };
	    /**
	     * Undelegate events
	     */
	    BaseView.prototype.undelegateEvents = function () {
	        this._unbindUIElements();
	        debug('%s undelegate events', this);
	        if (this.el) {
	            for (var i = 0, len = this._domEvents.length; i < len; i++) {
	                var item = this._domEvents[i];
	                orange_dom_1.removeEventListener(this.el, item.eventName, item.handler);
	            }
	            this._domEvents.length = 0;
	        }
	        return this;
	    };
	    BaseView.prototype.delegate = function (eventName, selector, listener) {
	        if (typeof selector === 'function') {
	            listener = selector;
	            selector = null;
	        }
	        var root = this.el;
	        var handler = selector ? function (e) {
	            var node = e.target || e.srcElement;
	            // Already handled
	            if (e.delegateTarget) return;
	            for (; node && node != root; node = node.parentNode) {
	                if (orange_dom_1.matches(node, selector)) {
	                    e.delegateTarget = node;
	                    listener(e);
	                }
	            }
	        } : function (e) {
	            if (e.delegateTarget) return;
	            listener(e);
	        };
	        /*jshint bitwise: false*/
	        var useCap = !!~unbubblebles.indexOf(eventName) && selector != null;
	        debug('%s delegate event %s ', this, eventName);
	        orange_dom_1.addEventListener(this.el, eventName, handler, useCap);
	        this._domEvents.push({ eventName: eventName, handler: handler, listener: listener, selector: selector });
	        return handler;
	    };
	    BaseView.prototype.undelegate = function (eventName, selector, listener) {
	        if (typeof selector === 'function') {
	            listener = selector;
	            selector = null;
	        }
	        if (this.el) {
	            var handlers = this._domEvents.slice();
	            for (var i = 0, len = handlers.length; i < len; i++) {
	                var item = handlers[i];
	                var match = item.eventName === eventName && (listener ? item.listener === listener : true) && (selector ? item.selector === selector : true);
	                if (!match) continue;
	                orange_dom_1.removeEventListener(this.el, item.eventName, item.handler);
	                this._domEvents.splice(orange_1.indexOf(handlers, item), 1);
	            }
	        }
	        return this;
	    };
	    BaseView.prototype.render = function (options) {
	        this.undelegateEvents();
	        this.delegateEvents();
	        return this;
	    };
	    /**
	     * Append the view to a HTMLElement
	     * @param {HTMLElement|string} elm A html element or a selector string
	     * @return {this} for chaining
	     */
	    BaseView.prototype.appendTo = function (elm) {
	        if (elm instanceof HTMLElement) {
	            elm.appendChild(this.el);
	        } else {
	            var el = document.querySelector(elm);
	            el ? el.appendChild(this.el) : void 0;
	        }
	        return this;
	    };
	    /**
	     * Append a element the view
	     * @param {HTMLElement} elm
	     * @param {String} toSelector
	     * @return {this} for chaining
	     */
	    BaseView.prototype.append = function (elm, toSelector) {
	        if (toSelector != null) {
	            var ret = this.$(toSelector);
	            if (ret instanceof NodeList && ret.length > 0) {
	                ret[0].appendChild(elm);
	            } else if (ret instanceof HTMLElement) {
	                ret.appendChild(elm);
	            }
	        } else {
	            this.el.appendChild(elm);
	        }
	        return this;
	    };
	    /**
	     * Convience for view.el.querySelectorAll()
	     * @param {string|HTMLElement} selector
	     */
	    BaseView.prototype.$ = function (selector) {
	        if (selector instanceof HTMLElement) {
	            return selector;
	        } else {
	            return BaseView.find(selector, this.el);
	        }
	    };
	    BaseView.prototype.setElement = function (elm, trigger) {
	        if (trigger === void 0) {
	            trigger = true;
	        }
	        this.triggerMethod('before:set:element');
	        if (trigger) this.undelegateEvents();
	        this._setElement(elm);
	        if (trigger) this.delegateEvents();
	        this.triggerMethod('set:element');
	    };
	    BaseView.prototype.remove = function () {
	        this._removeElement();
	        return this;
	    };
	    BaseView.prototype.destroy = function () {
	        if (this.isDestroyed) return;
	        this.remove();
	        _super.prototype.destroy.call(this);
	        return this;
	    };
	    // PRIVATES
	    /**
	     * Bind ui elements
	     * @private
	     */
	    BaseView.prototype._bindUIElements = function () {
	        var _this = this;
	        var ui = this.getOption('ui'); //this.options.ui||this.ui
	        if (!ui) return;
	        if (!this._ui) {
	            this._ui = ui;
	        }
	        ui = orange_1.result(this, '_ui');
	        this.ui = {};
	        Object.keys(ui).forEach(function (k) {
	            var elm = _this.$(ui[k]);
	            if (elm && elm.length) {
	                // unwrap if it's a nodelist.
	                if (elm instanceof NodeList) {
	                    elm = elm[0];
	                }
	                debug('%s added ui element %s %s', _this, k, ui[k]);
	                _this.ui[k] = elm;
	            } else {
	                debug('%s ui element not found ', _this, k, ui[k]);
	            }
	        });
	    };
	    /**
	     * Unbind ui elements
	     * @private
	     */
	    BaseView.prototype._unbindUIElements = function () {};
	    /**
	     * Configure triggers
	     * @return {Object} events object
	     * @private
	     */
	    BaseView.prototype._configureTriggers = function () {
	        var triggers = this.getOption('triggers') || {};
	        if (typeof triggers === 'function') {
	            triggers = triggers.call(this);
	        }
	        // Allow `triggers` to be configured as a function
	        triggers = util_1.normalizeUIKeys(triggers, this._ui);
	        // Configure the triggers, prevent default
	        // action and stop propagation of DOM events
	        var events = {},
	            val,
	            key;
	        for (key in triggers) {
	            val = triggers[key];
	            debug('%s added trigger %s %s', this, key, val);
	            events[key] = this._buildViewTrigger(val);
	        }
	        return events;
	    };
	    /**
	     * builder trigger function
	     * @param  {Object|String} triggerDef Trigger definition
	     * @return {Function}
	     * @private
	     */
	    BaseView.prototype._buildViewTrigger = function (triggerDef) {
	        if (typeof triggerDef === 'string') triggerDef = { event: triggerDef };
	        var options = orange_1.extend({
	            preventDefault: true,
	            stopPropagation: true
	        }, triggerDef);
	        return function (e) {
	            if (e) {
	                if (e.preventDefault && options.preventDefault) {
	                    e.preventDefault();
	                }
	                if (e.stopPropagation && options.stopPropagation) {
	                    e.stopPropagation();
	                }
	            }
	            this.triggerMethod(options.event, {
	                view: this,
	                model: this.model,
	                collection: this.collection
	            });
	        };
	    };
	    BaseView.prototype._createElement = function (tagName) {
	        return document.createElement(tagName);
	    };
	    BaseView.prototype._ensureElement = function () {
	        if (!this.el) {
	            var attrs = orange_1.extend({}, orange_1.result(this, 'attributes'));
	            if (this.id) attrs.id = orange_1.result(this, 'id');
	            if (this.className) attrs['class'] = orange_1.result(this, 'className');
	            debug('%s created element: %s', this, orange_1.result(this, 'tagName') || 'div');
	            this.setElement(this._createElement(orange_1.result(this, 'tagName') || 'div'), false);
	            this._setAttributes(attrs);
	        } else {
	            this.setElement(orange_1.result(this, 'el'), false);
	        }
	    };
	    BaseView.prototype._removeElement = function () {
	        this.undelegateEvents();
	        if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
	    };
	    BaseView.prototype._setElement = function (element) {
	        if (typeof element === 'string') {
	            if (paddedLt.test(element)) {
	                var el = document.createElement('div');
	                el.innerHTML = element;
	                this.el = el.firstElementChild;
	            } else {
	                this.el = document.querySelector(element);
	            }
	        } else {
	            this.el = element;
	        }
	    };
	    BaseView.prototype._setAttributes = function (attrs) {
	        for (var attr in attrs) {
	            attr in this.el ? this.el[attr] = attrs[attr] : this.el.setAttribute(attr, attrs[attr]);
	        }
	    };
	    BaseView.prototype.toString = function () {
	        return "[" + (this.name || 'View') + ": " + this.cid + "]";
	    };
	    return BaseView;
	}(object_1.BaseObject);
	exports.BaseView = BaseView;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Module dependencies.
	 */

	var tty = __webpack_require__(64);
	var util = __webpack_require__(49);

	/**
	 * This is the Node.js implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(65);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;

	/**
	 * Colors.
	 */

	exports.colors = [6, 2, 3, 4, 5, 1];

	/**
	 * The file descriptor to write the `debug()` calls to.
	 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
	 *
	 *   $ DEBUG_FD=3 node script.js 3>debug.log
	 */

	var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
	var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : createWritableStdioStream(fd);

	/**
	 * Is stdout a TTY? Colored output is enabled when `true`.
	 */

	function useColors() {
	  var debugColors = (process.env.DEBUG_COLORS || '').trim().toLowerCase();
	  if (0 === debugColors.length) {
	    return tty.isatty(fd);
	  } else {
	    return '0' !== debugColors && 'no' !== debugColors && 'false' !== debugColors && 'disabled' !== debugColors;
	  }
	}

	/**
	 * Map %o to `util.inspect()`, since Node doesn't do that out of the box.
	 */

	var inspect = 4 === util.inspect.length ?
	// node <= 0.8.x
	function (v, colors) {
	  return util.inspect(v, void 0, void 0, colors);
	} :
	// node > 0.8.x
	function (v, colors) {
	  return util.inspect(v, { colors: colors });
	};

	exports.formatters.o = function (v) {
	  return inspect(v, this.useColors).replace(/\s*\n\s*/g, ' ');
	};

	/**
	 * Adds ANSI color escape codes if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	  var name = this.namespace;

	  if (useColors) {
	    var c = this.color;

	    args[0] = '  \u001b[3' + c + ';1m' + name + ' ' + '\u001b[0m' + args[0] + '\u001b[3' + c + 'm' + ' +' + exports.humanize(this.diff) + '\u001b[0m';
	  } else {
	    args[0] = new Date().toUTCString() + ' ' + name + ' ' + args[0];
	  }
	  return args;
	}

	/**
	 * Invokes `console.error()` with the specified arguments.
	 */

	function log() {
	  return stream.write(util.format.apply(this, arguments) + '\n');
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  if (null == namespaces) {
	    // If you set a process.env field to null or undefined, it gets cast to the
	    // string 'null' or 'undefined'. Just delete instead.
	    delete process.env.DEBUG;
	  } else {
	    process.env.DEBUG = namespaces;
	  }
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  return process.env.DEBUG;
	}

	/**
	 * Copied from `node/src/node.js`.
	 *
	 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
	 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
	 */

	function createWritableStdioStream(fd) {
	  var stream;
	  var tty_wrap = process.binding('tty_wrap');

	  // Note stream._type is used for test-module-load-list.js

	  switch (tty_wrap.guessHandleType(fd)) {
	    case 'TTY':
	      stream = new tty.WriteStream(fd);
	      stream._type = 'tty';

	      // Hack to have stream not keep the event loop alive.
	      // See https://github.com/joyent/node/issues/1726
	      if (stream._handle && stream._handle.unref) {
	        stream._handle.unref();
	      }
	      break;

	    case 'FILE':
	      var fs = __webpack_require__(67);
	      stream = new fs.SyncWriteStream(fd, { autoClose: false });
	      stream._type = 'fs';
	      break;

	    case 'PIPE':
	    case 'TCP':
	      var net = __webpack_require__(68);
	      stream = new net.Socket({
	        fd: fd,
	        readable: false,
	        writable: true
	      });

	      // FIXME Should probably have an option in net.Socket to create a
	      // stream from an existing fd which is writable only. But for now
	      // we'll just add this hack and set the `readable` member to false.
	      // Test: ./node test/fixtures/echo.js < /etc/passwd
	      stream.readable = false;
	      stream.read = null;
	      stream._type = 'pipe';

	      // FIXME Hack to have stream not keep the event loop alive.
	      // See https://github.com/joyent/node/issues/1726
	      if (stream._handle && stream._handle.unref) {
	        stream._handle.unref();
	      }
	      break;

	    default:
	      // Probably an error on in uv_guess_handle()
	      throw new Error('Implement me. Unknown stream file type!');
	  }

	  // For supporting legacy API we put the FD here.
	  stream.fd = fd;

	  stream._isStdio = true;

	  return stream;
	}

	/**
	 * Enable namespaces listed in `process.env.DEBUG` initially.
	 */

	exports.enable(load());

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = require("tty");

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(66);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {}
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = Array.prototype.slice.call(arguments);

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}

/***/ },
/* 66 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function (val, options) {
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long ? long(val) : short(val);
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function long(ms) {
	  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = require("net");

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Debug = __webpack_require__(63);
	var debug = Debug('views:object');
	var eventsjs_1 = __webpack_require__(5);
	var orange_1 = __webpack_require__(20);
	/** Base object */
	var BaseObject = function (_super) {
	    __extends(BaseObject, _super);
	    /**
	     * Object
	     * @extends EventEmitter
	     */
	    function BaseObject(args) {
	        _super.call(this);
	        this._isDestroyed = false;
	    }
	    Object.defineProperty(BaseObject.prototype, "isDestroyed", {
	        /**
	         * Whether the object is "destroyed" or not
	         * @type boolean
	         */
	        get: function get() {
	            return this._isDestroyed;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BaseObject.prototype.destroy = function () {
	        if (this.isDestroyed) return this;
	        this.triggerMethod('before:destroy');
	        this.stopListening();
	        this.off();
	        this._isDestroyed = true;
	        this.triggerMethod('destroy');
	        debug("%s destroy", this);
	        if (_typeof(Object.freeze)) {}
	        return this;
	    };
	    BaseObject.prototype.triggerMethod = function (eventName) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        orange_1.triggerMethodOn(this, eventName, args);
	        return this;
	    };
	    BaseObject.prototype.getOption = function (prop) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        if (this.options) {
	            args.push(this.options);
	        }
	        if (this._options) {
	            args.push(this._options);
	        }
	        args.push(this);
	        return orange_1.getOption(prop, args);
	    };
	    BaseObject.extend = function (proto, stat) {
	        return orange_1.inherits(this, proto, stat);
	    };
	    return BaseObject;
	}(eventsjs_1.EventEmitter);
	exports.BaseObject = BaseObject;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(71));
	__export(__webpack_require__(72));
	__export(__webpack_require__(73));

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// TODO: CreateHTML

	var orange_1 = __webpack_require__(20);
	var ElementProto = typeof Element !== 'undefined' && Element.prototype || {};
	var matchesSelector = ElementProto.matches || ElementProto.webkitMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.msMatchesSelector || ElementProto.oMatchesSelector || function (selector) {
	    var nodeList = (this.parentNode || document).querySelectorAll(selector) || [];
	    return !!~orange_1.indexOf(nodeList, this);
	};
	var elementAddEventListener = ElementProto.addEventListener || function (eventName, listener) {
	    return this.attachEvent('on' + eventName, listener);
	};
	var elementRemoveEventListener = ElementProto.removeEventListener || function (eventName, listener) {
	    return this.detachEvent('on' + eventName, listener);
	};
	var transitionEndEvent = function transitionEnd() {
	    var el = document.createElement('bootstrap');
	    var transEndEventNames = {
	        'WebkitTransition': 'webkitTransitionEnd',
	        'MozTransition': 'transitionend',
	        'OTransition': 'oTransitionEnd otransitionend',
	        'transition': 'transitionend'
	    };
	    for (var name in transEndEventNames) {
	        if (el.style[name] !== undefined) {
	            return transEndEventNames[name];
	        }
	    }
	    return null;
	};
	var animationEndEvent = function animationEnd() {
	    var el = document.createElement('bootstrap');
	    var transEndEventNames = {
	        'WebkitAnimation': 'webkitAnimationEnd',
	        'MozAnimation': 'animationend',
	        'OAnimation': 'oAnimationEnd oanimationend',
	        'animation': 'animationend'
	    };
	    for (var name in transEndEventNames) {
	        if (el.style[name] !== undefined) {
	            return transEndEventNames[name];
	        }
	    }
	    return null;
	};
	function matches(elm, selector) {
	    return matchesSelector.call(elm, selector);
	}
	exports.matches = matches;
	function addEventListener(elm, eventName, listener) {
	    var useCap = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	    elementAddEventListener.call(elm, eventName, listener, useCap);
	}
	exports.addEventListener = addEventListener;
	function removeEventListener(elm, eventName, listener) {
	    elementRemoveEventListener.call(elm, eventName, listener);
	}
	exports.removeEventListener = removeEventListener;
	var unbubblebles = 'focus blur change load error'.split(' ');
	var domEvents = [];
	function delegate(elm, selector, eventName, callback, ctx) {
	    var root = elm;
	    var handler = function handler(e) {
	        var node = e.target || e.srcElement;
	        // Already handled
	        if (e.delegateTarget) return;
	        for (; node && node != root; node = node.parentNode) {
	            if (matches(node, selector)) {
	                e.delegateTarget = node;
	                callback(e);
	            }
	        }
	    };
	    var useCap = !!~unbubblebles.indexOf(eventName);
	    addEventListener(elm, eventName, handler, useCap);
	    domEvents.push({ eventName: eventName, handler: handler, listener: callback, selector: selector });
	    return handler;
	}
	exports.delegate = delegate;
	function undelegate(elm, selector, eventName, callback) {
	    /*if (typeof selector === 'function') {
	        listener = <Function>selector;
	        selector = null;
	      }*/
	    var handlers = domEvents.slice();
	    for (var i = 0, len = handlers.length; i < len; i++) {
	        var item = handlers[i];
	        var match = item.eventName === eventName && (callback ? item.listener === callback : true) && (selector ? item.selector === selector : true);
	        if (!match) continue;
	        removeEventListener(elm, item.eventName, item.handler);
	        domEvents.splice(orange_1.indexOf(handlers, item), 1);
	    }
	}
	exports.undelegate = undelegate;
	function addClass(elm, className) {
	    if (elm.classList) {
	        var split = className.split(' ');
	        for (var i = 0, ii = split.length; i < ii; i++) {
	            if (elm.classList.contains(split[i].trim())) continue;
	            elm.classList.add(split[i].trim());
	        }
	    } else {
	        elm.className = orange_1.unique(elm.className.split(' ').concat(className.split(' '))).join(' ');
	    }
	}
	exports.addClass = addClass;
	function removeClass(elm, className) {
	    if (elm.classList) {
	        var split = className.split(' ');
	        for (var i = 0, ii = split.length; i < ii; i++) {
	            elm.classList.remove(split[i].trim());
	        }
	    } else {
	        var _split = elm.className.split(' '),
	            classNames = className.split(' '),
	            tmp = _split,
	            index = void 0;
	        for (var _i = 0, _ii = classNames.length; _i < _ii; _i++) {
	            index = _split.indexOf(classNames[_i]);
	            if (!!~index) _split = _split.splice(index, 1);
	        }
	    }
	}
	exports.removeClass = removeClass;
	function hasClass(elm, className) {
	    if (elm.classList) {
	        return elm.classList.contains(className);
	    }
	    var reg = new RegExp('\b' + className);
	    return reg.test(elm.className);
	}
	exports.hasClass = hasClass;
	function selectionStart(elm) {
	    if ('selectionStart' in elm) {
	        // Standard-compliant browsers
	        return elm.selectionStart;
	    } else if (document.selection) {
	        // IE
	        elm.focus();
	        var sel = document.selection.createRange();
	        var selLen = document.selection.createRange().text.length;
	        sel.moveStart('character', -elm.value.length);
	        return sel.text.length - selLen;
	    }
	}
	exports.selectionStart = selectionStart;
	var _events = {
	    animationEnd: null,
	    transitionEnd: null
	};
	function transitionEnd(elm, fn, ctx, duration) {
	    var event = _events.transitionEnd || (_events.transitionEnd = transitionEndEvent());
	    var callback = function callback(e) {
	        removeEventListener(elm, event, callback);
	        fn.call(ctx, e);
	    };
	    addEventListener(elm, event, callback);
	}
	exports.transitionEnd = transitionEnd;
	function animationEnd(elm, fn, ctx, duration) {
	    var event = _events.animationEnd || (_events.animationEnd = animationEndEvent());
	    var callback = function callback(e) {
	        removeEventListener(elm, event, callback);
	        fn.call(ctx, e);
	    };
	    addEventListener(elm, event, callback);
	}
	exports.animationEnd = animationEnd;
	exports.domReady = function () {
	    var fns = [],
	        _listener,
	        doc = document,
	        hack = doc.documentElement.doScroll,
	        domContentLoaded = 'DOMContentLoaded',
	        loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);
	    if (!loaded) {
	        doc.addEventListener(domContentLoaded, _listener = function listener() {
	            doc.removeEventListener(domContentLoaded, _listener);
	            loaded = true;
	            while (_listener = fns.shift()) {
	                _listener();
	            }
	        });
	    }
	    return function (fn) {
	        loaded ? setTimeout(fn, 0) : fns.push(fn);
	    };
	}();
	function createElement(tag, attr) {
	    var elm = document.createElement(tag);
	    if (attr) {
	        for (var key in attr) {
	            elm.setAttribute(key, attr[key]);
	        }
	    }
	    return elm;
	}
	exports.createElement = createElement;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();

	function _defineProperty(obj, key, value) {
	    if (key in obj) {
	        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
	    } else {
	        obj[key] = value;
	    }return obj;
	}

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	var orange_1 = __webpack_require__(20);
	var dom = __webpack_require__(71);
	var domEvents;
	var singleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
	function parseHTML(html) {
	    var parsed = singleTag.exec(html);
	    if (parsed) {
	        return document.createElement(parsed[0]);
	    }
	    var div = document.createElement('div');
	    div.innerHTML = html;
	    var element = div.firstChild;
	    return element;
	}

	var Html = function () {
	    function Html(el) {
	        _classCallCheck(this, Html);

	        if (!Array.isArray(el)) el = [el];
	        this._elements = el || [];
	    }

	    _createClass(Html, [{
	        key: 'get',
	        value: function get(n) {
	            n = n === undefined ? 0 : n;
	            return n >= this.length ? undefined : this._elements[n];
	        }
	    }, {
	        key: 'addClass',
	        value: function addClass(str) {
	            return this.forEach(function (e) {
	                dom.addClass(e, str);
	            });
	        }
	    }, {
	        key: 'removeClass',
	        value: function removeClass(str) {
	            return this.forEach(function (e) {
	                dom.removeClass(e, str);
	            });
	        }
	    }, {
	        key: 'hasClass',
	        value: function hasClass(str) {
	            return this._elements.reduce(function (p, c) {
	                return dom.hasClass(c, str);
	            }, false);
	        }
	    }, {
	        key: 'attr',
	        value: function attr(key, value) {
	            var attr = void 0;
	            if (typeof key === 'string' && value) {
	                attr = _defineProperty({}, key, value);
	            } else if (typeof key == 'string') {
	                if (this.length) return this.get(0).getAttribute(key);
	            } else if (orange_1.isObject(key)) {
	                attr = key;
	            }
	            return this.forEach(function (e) {
	                for (var k in attr) {
	                    e.setAttribute(k, attr[k]);
	                }
	            });
	        }
	    }, {
	        key: 'text',
	        value: function text(str) {
	            if (arguments.length === 0) {
	                return this.length > 0 ? this.get(0).textContent : null;
	            }
	            return this.forEach(function (e) {
	                return e.textContent = str;
	            });
	        }
	    }, {
	        key: 'html',
	        value: function html(_html) {
	            if (arguments.length === 0) {
	                return this.length > 0 ? this.get(0).innerHTML : null;
	            }
	            return this.forEach(function (e) {
	                return e.innerHTML = _html;
	            });
	        }
	    }, {
	        key: 'css',
	        value: function css(attr, value) {
	            if (arguments.length === 2) {
	                return this.forEach(function (e) {
	                    if (attr in e.style) e.style[attr] = String(value);
	                });
	            } else {
	                return this.forEach(function (e) {
	                    for (var k in attr) {
	                        if (k in e.style) e.style[k] = String(attr[k]);
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'parent',
	        value: function parent() {
	            var out = [];
	            this.forEach(function (e) {
	                if (e.parentElement) {
	                    out.push(e.parentElement);
	                }
	            });
	            return new Html(out);
	        }
	    }, {
	        key: 'remove',
	        value: function remove() {
	            return this.forEach(function (e) {
	                if (e.parentElement) e.parentElement.removeChild(e);
	            });
	        }
	    }, {
	        key: 'clone',
	        value: function clone() {
	            return new Html(this.map(function (m) {
	                return m.cloneNode();
	            }));
	        }
	    }, {
	        key: 'find',
	        value: function find(str) {
	            var out = [];
	            this.forEach(function (e) {
	                out = out.concat(orange_1.slice(e.querySelectorAll(str)));
	            });
	            return new Html(out);
	        }
	    }, {
	        key: 'map',
	        value: function map(fn) {
	            var out = new Array(this.length);
	            this.forEach(function (e, i) {
	                out[i] = fn(e, i);
	            });
	            return out;
	        }
	    }, {
	        key: 'forEach',
	        value: function forEach(fn) {
	            this._elements.forEach(fn);
	            return this;
	        }
	    }, {
	        key: 'length',
	        get: function get() {
	            return this._elements.length;
	        }
	    }], [{
	        key: 'query',
	        value: function query(_query, context) {
	            if (typeof context === 'string') {
	                context = document.querySelectorAll(context);
	            }
	            var html = void 0;
	            var els = void 0;
	            if (typeof _query === 'string') {
	                if (_query.length > 0 && _query[0] === '<' && _query[_query.length - 1] === ">" && _query.length >= 3) {
	                    return new Html([parseHTML(_query)]);
	                }
	                if (context) {
	                    if (context instanceof HTMLElement) {
	                        els = orange_1.slice(context.querySelectorAll(_query));
	                    } else {
	                        html = new Html(orange_1.slice(context));
	                        return html.find(_query);
	                    }
	                } else {
	                    els = orange_1.slice(document.querySelectorAll(_query));
	                }
	            } else if (_query && _query instanceof Element) {
	                els = [_query];
	            } else if (_query && _query instanceof NodeList) {
	                els = orange_1.slice(_query);
	            }
	            return new Html(els);
	        }
	    }]);

	    return Html;
	}();

	exports.Html = Html;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	var orange_1 = __webpack_require__(20);
	var dom_1 = __webpack_require__(71);

	var LoadedImage = function () {
	    function LoadedImage(img) {
	        var timeout = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];
	        var retries = arguments.length <= 2 || arguments[2] === undefined ? 10 : arguments[2];

	        _classCallCheck(this, LoadedImage);

	        this.img = img;
	        this.timeout = timeout;
	        this.retries = retries;
	        this.__resolved = false;
	    }

	    _createClass(LoadedImage, [{
	        key: 'check',
	        value: function check(fn) {
	            var _this = this;

	            this.fn = fn;
	            var isComplete = this.getIsImageComplete();
	            if (isComplete) {
	                // report based on naturalWidth
	                this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
	                return;
	            }
	            var retries = this.retries;
	            var retry = function retry() {
	                setTimeout(function () {
	                    if (_this.__resolved) return;
	                    if (_this.img.naturalWidth > 0) {
	                        _this.__resolved = true;
	                        return _this.onload(null);
	                    } else if (retries > 0) {
	                        retries--;
	                        retry();
	                    }
	                }, _this.timeout);
	            };
	            retry();
	            dom_1.addEventListener(this.img, 'load', this);
	            dom_1.addEventListener(this.img, 'error', this);
	        }
	    }, {
	        key: 'confirm',
	        value: function confirm(loaded, msg, err) {
	            this.__resolved = true;
	            this.isLoaded = loaded;
	            if (this.fn) this.fn(err);
	        }
	    }, {
	        key: 'getIsImageComplete',
	        value: function getIsImageComplete() {
	            return this.img.complete && this.img.naturalWidth !== undefined && this.img.naturalWidth !== 0;
	        }
	    }, {
	        key: 'handleEvent',
	        value: function handleEvent(e) {
	            var method = 'on' + event.type;
	            if (this[method]) {
	                this[method](event);
	            }
	        }
	    }, {
	        key: 'onload',
	        value: function onload(e) {
	            this.confirm(true, 'onload');
	            this.unbindEvents();
	        }
	    }, {
	        key: 'onerror',
	        value: function onerror(e) {
	            this.confirm(false, 'onerror', new Error(e.error));
	            this.unbindEvents();
	        }
	    }, {
	        key: 'unbindEvents',
	        value: function unbindEvents() {
	            dom_1.removeEventListener(this.img, 'load', this);
	            dom_1.removeEventListener(this.img, 'error', this);
	            this.fn = void 0;
	        }
	    }]);

	    return LoadedImage;
	}();

	function imageLoaded(img, timeout, retries) {
	    return new orange_1.Promise(function (resolve, reject) {
	        var i = new LoadedImage(img, timeout, retries);
	        i.check(function (err) {
	            if (err) return reject(err);
	            resolve(i.isLoaded);
	        });
	    });
	}
	exports.imageLoaded = imageLoaded;

/***/ },
/* 74 */
/***/ function(module, exports) {

	"use strict";

	var kUIRegExp = /@ui.([a-zA-Z_\-\$#]+)/i;
	function normalizeUIKeys(obj, uimap) {
	    /*jshint -W030 */
	    var o = {},
	        k,
	        v,
	        ms,
	        sel,
	        ui;
	    for (k in obj) {
	        v = obj[k];
	        if ((ms = kUIRegExp.exec(k)) !== null) {
	            ui = ms[1], sel = uimap[ui];
	            if (sel != null) {
	                k = k.replace(ms[0], sel);
	            }
	        }
	        o[k] = v;
	    }
	    return o;
	}
	exports.normalizeUIKeys = normalizeUIKeys;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Debug = __webpack_require__(63);
	var debug = Debug('views:region');
	var object_1 = __webpack_require__(69);
	var orange_1 = __webpack_require__(20);
	/** Region  */
	var Region = function (_super) {
	    __extends(Region, _super);
	    /**
	     * Regions manage a view
	     * @param {Object} options
	     * @param {HTMLElement} options.el  A Html element
	     * @constructor Region
	     * @extends BaseObject
	     * @inheritdoc
	     */
	    function Region(options) {
	        _super.call(this);
	        this.options = options;
	        this._el = this.getOption('el');
	    }
	    Object.defineProperty(Region.prototype, "view", {
	        get: function get() {
	            return this._view;
	        },
	        set: function set(view) {
	            this.show(view);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Region.prototype, "el", {
	        get: function get() {
	            return this._el;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Build region from a definition
	     * @param {Object|String|Region} def The description of the region
	     * @return {Region}
	     */
	    Region.buildRegion = function (def, context) {
	        if (context === void 0) {
	            context = null;
	        }
	        if (def instanceof Region) {
	            return def;
	        } else if (typeof def === 'string') {
	            return buildBySelector(def, Region, context);
	        } else {
	            return buildByObject(def, context);
	        }
	    };
	    /**
	    * Show a view in the region.
	    * This will destroy or remove any existing views.
	    * @param  {View} view    The view to Show
	    * @return {Region}       this for chaining.
	    */
	    Region.prototype.show = function (view, options) {
	        var diff = view !== this._view;
	        if (diff) {
	            // Remove any containing views
	            this.empty();
	            // If the view is destroyed be others
	            view.once('destroy', this.empty, this);
	            debug('%s render view %s', this, view);
	            view.render();
	            orange_1.triggerMethodOn(view, 'before:show');
	            debug('%s attaching view: %s', this, view);
	            this._attachHtml(view);
	            orange_1.triggerMethodOn(view, 'show');
	            this._view = view;
	        }
	        return this;
	    };
	    /**
	     * Destroy the region, this will remove any views, but not the containing element
	     * @return {Region} this for chaining
	     */
	    Region.prototype.destroy = function () {
	        this.empty();
	        _super.prototype.destroy.call(this);
	    };
	    /**
	     * Empty the region. This will destroy any existing view.
	     * @return {Region} this for chaining;
	     */
	    Region.prototype.empty = function () {
	        if (!this._view) return;
	        var view = this._view;
	        view.off('destroy', this.empty, this);
	        this.trigger('before:empty', view);
	        this._destroyView();
	        this.trigger('empty', view);
	        delete this._view;
	        return this;
	    };
	    /**
	     * Attach the view element to the regions element
	     * @param {View} view
	     * @private
	     *
	     */
	    Region.prototype._attachHtml = function (view) {
	        this._el.innerHTML = '';
	        this._el.appendChild(view.el);
	    };
	    Region.prototype._destroyView = function () {
	        var view = this._view;
	        if (view.destroy && typeof view.destroy === 'function' && !view.isDestroyed) {
	            view.destroy();
	        } else if (view.remove && typeof view.remove === 'function') {
	            view.remove();
	        }
	        this._el.innerHTML = '';
	    };
	    return Region;
	}(object_1.BaseObject);
	exports.Region = Region;
	function buildByObject(object, context) {
	    if (object === void 0) {
	        object = {};
	    }
	    if (!object.selector) throw new Error('No selector specified: ' + object);
	    return buildBySelector(object.selector, object.regionClass || Region, context);
	}
	function buildBySelector(selector, Klass, context) {
	    if (Klass === void 0) {
	        Klass = Region;
	    }
	    context = context || document;
	    var el = context.querySelector(selector);
	    if (!el) throw new Error('selector must exist in the dom');
	    return new Klass({
	        el: el
	    });
	}

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* global BaseClass, __has */
	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var object_1 = __webpack_require__(69);
	var region_1 = __webpack_require__(75);
	var utils = __webpack_require__(20);
	var RegionManager = function (_super) {
	    __extends(RegionManager, _super);
	    /** Region manager
	     * @extends BaseObject
	     */
	    function RegionManager() {
	        _super.call(this);
	        this._regions = {};
	    }
	    Object.defineProperty(RegionManager.prototype, "regions", {
	        /**
	         * Regions
	         * @type {string:Region}
	         */
	        get: function get() {
	            return this._regions;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	      * Add one or more regions to the region manager
	      * @param {Object} regions
	      */
	    RegionManager.prototype.addRegions = function (regions) {
	        var def,
	            out = {},
	            keys = Object.keys(regions);
	        keys.forEach(function (k) {
	            def = regions[k];
	            out[k] = this.addRegion(k, def);
	        }, this);
	        return out;
	    };
	    /**
	     * Add a region to the RegionManager
	     * @param {String} name   The name of the regions
	     * @param {String|Object|Region|HTMLElement} def The region to associate with the name and the RegionManager
	     */
	    RegionManager.prototype.addRegion = function (name, def) {
	        var region = region_1.Region.buildRegion(def);
	        this._setRegion(name, region);
	        return region;
	    };
	    /**
	     * Remove one or more regions from the manager
	     * @param {...name} name A array of region names
	     */
	    RegionManager.prototype.removeRegion = function (names) {
	        if (typeof names === 'string') {
	            names = [names];
	        }
	        names.forEach(function (name) {
	            if (utils.has(this.regions, name)) {
	                var region = this.regions[name];
	                region.destroy();
	                this._unsetRegion(name);
	            }
	        }, this);
	    };
	    /**
	     * Destroy the regionmanager
	     */
	    RegionManager.prototype.destroy = function () {
	        this.removeRegions();
	        _super.prototype.destroy.call(this);
	    };
	    /**
	     * Remove all regions from the manager
	     */
	    RegionManager.prototype.removeRegions = function () {
	        utils.callFunc(this.removeRegion, this, Object.keys(this._regions));
	    };
	    /**
	     * @private
	     */
	    RegionManager.prototype._setRegion = function (name, region) {
	        if (this._regions[name]) {
	            this._regions[name].destroy();
	        }
	        this._regions[name] = region;
	    };
	    /**
	     * @private
	     */
	    RegionManager.prototype._unsetRegion = function (name) {
	        delete this._regions[name];
	    };
	    return RegionManager;
	}(object_1.BaseObject);
	exports.RegionManager = RegionManager;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/*global View, RegionManager, Region*/
	var view_1 = __webpack_require__(78);
	var region_manager_1 = __webpack_require__(76);
	var orange_1 = __webpack_require__(20);
	var region_1 = __webpack_require__(75);
	var LayoutView = function (_super) {
	    __extends(LayoutView, _super);
	    /**
	     * LayoutView
	     * @param {Object} options options
	     * @constructor LayoutView
	     * @extends TemplateView
	     */
	    function LayoutView(options) {
	        _super.call(this, options);
	        // Set region manager
	        this._regionManager = new region_manager_1.RegionManager();
	        orange_1.proxy(this, this._regionManager, ['removeRegion', 'removeRegions']);
	        this._regions = this.getOption('regions', options || {});
	    }
	    Object.defineProperty(LayoutView.prototype, "regions", {
	        get: function get() {
	            return this._regionManager.regions;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    LayoutView.prototype.render = function (options) {
	        this.triggerMethod('before:render');
	        _super.prototype.render.call(this, { silent: true });
	        this.addRegion(this._regions || {});
	        this.triggerMethod('render');
	        return this;
	    };
	    /**
	     * Add one or more regions to the view
	     * @param {string|RegionMap} name
	     * @param {Object|string|HTMLElement} def
	     */
	    LayoutView.prototype.addRegion = function (name, def) {
	        var regions = {};
	        if (typeof name === 'string') {
	            if (def == null) throw new Error('add region');
	            regions[name] = def;
	        } else {
	            regions = name;
	        }
	        for (var k in regions) {
	            var region = region_1.Region.buildRegion(regions[k], this.el);
	            this._regionManager.addRegion(k, region);
	        }
	    };
	    /**
	     * Delete one or more regions from the the layoutview
	     * @param {string|Array<string>} name
	     */
	    LayoutView.prototype.removeRegion = function (name) {
	        this._regionManager.removeRegion(name);
	    };
	    LayoutView.prototype.destroy = function () {
	        _super.prototype.destroy.call(this);
	        this._regionManager.destroy();
	    };
	    return LayoutView;
	}(view_1.View);
	exports.LayoutView = LayoutView;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Debug = __webpack_require__(63);
	var debug = Debug('views:view');
	var baseview_1 = __webpack_require__(62);
	var orange_1 = __webpack_require__(20);
	var View = function (_super) {
	    __extends(View, _super);
	    /**
	     * DataView
	     * @param {DataViewOptions} options
	     * @extends TemplateView
	     */
	    function View(options) {
	        if (options === void 0) {
	            options = {};
	        }
	        _super.call(this, options);
	        orange_1.extend(this, orange_1.pick(options, ['model', 'collection', 'template']));
	    }
	    Object.defineProperty(View.prototype, "model", {
	        get: function get() {
	            return this._model;
	        },
	        set: function set(model) {
	            this.setModel(model);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(View.prototype, "collection", {
	        get: function get() {
	            return this._collection;
	        },
	        set: function set(collection) {
	            this.setCollection(collection);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    View.prototype.setModel = function (model) {
	        if (this._model === model) return this;
	        this.triggerMethod('before:model', this._model, model);
	        if (this.model) {
	            debug('stop listening on model uid: %s', this.model.uid);
	            this.stopListening(this._model);
	        }
	        if (model != null) {
	            debug('%s set model uid: %s', this, model.uid);
	        }
	        this._model = model;
	        this.triggerMethod('model', model);
	        return this;
	    };
	    View.prototype.setCollection = function (collection) {
	        if (this._collection === collection) return this;
	        this.triggerMethod('before:collection', this._collection, collection);
	        if (this._collection) {
	            debug('%s stop listening on collection', this);
	            this.stopListening(this._collection);
	        }
	        this._collection = collection;
	        this.triggerMethod('collection', collection);
	        return this;
	    };
	    View.prototype.getTemplateData = function () {
	        return this.model ? typeof this.model.toJSON === 'function' ? this.model.toJSON() : this.model : {};
	    };
	    View.prototype.render = function (options) {
	        if (options === void 0) {
	            options = {};
	        }
	        debug('%s render', this);
	        if (!options.silent) this.triggerMethod('before:render');
	        this.undelegateEvents();
	        this.renderTemplate(this.getTemplateData());
	        this.delegateEvents();
	        if (!options.silent) this.triggerMethod('render');
	        return this;
	    };
	    View.prototype.delegateEvents = function (events) {
	        events = events || orange_1.result(this, 'events');
	        var _a = this._filterEvents(events),
	            c = _a.c,
	            e = _a.e,
	            m = _a.m;
	        _super.prototype.delegateEvents.call(this, e);
	        this._delegateDataEvents(m, c);
	        return this;
	    };
	    View.prototype.undelegateEvents = function () {
	        this._undelegateDataEvents();
	        _super.prototype.undelegateEvents.call(this);
	        return this;
	    };
	    View.prototype.renderTemplate = function (data) {
	        var template = this.getOption('template');
	        if (typeof template === 'function') {
	            debug('%s render template function', this);
	            template = template.call(this, data);
	        }
	        if (template && typeof template === 'string') {
	            debug('%s attach template: %s', this, template);
	            this.attachTemplate(template);
	        }
	    };
	    View.prototype.attachTemplate = function (template) {
	        //this.undelegateEvents();
	        this.el.innerHTML = template;
	        //this.delegateEvents();
	    };
	    View.prototype._delegateDataEvents = function (model, collection) {
	        var _this = this;
	        this._dataEvents = {};
	        var fn = function fn(item, ev) {
	            if (!_this[item]) return {};
	            var out = {},
	                k,
	                f;
	            for (k in ev) {
	                f = orange_1.bind(ev[k], _this);
	                _this[item].on(k, f);
	                out[item + ":" + k] = f;
	            }
	            return out;
	        };
	        orange_1.extend(this._dataEvents, fn('model', model), fn('collection', collection));
	    };
	    View.prototype._undelegateDataEvents = function () {
	        if (!this._dataEvents) return;
	        var k, v;
	        for (k in this._dataEvents) {
	            v = this._dataEvents[k];
	            var _a = k.split(':'),
	                item = _a[0],
	                ev = _a[1];
	            if (!this[item]) continue;
	            this[item].off(ev, v);
	        }
	        delete this._dataEvents;
	    };
	    View.prototype._filterEvents = function (obj) {
	        /*jshint -W030 */
	        var c = {},
	            m = {},
	            e = {},
	            k,
	            v;
	        for (k in obj) {
	            var _a = k.split(' '),
	                ev = _a[0],
	                t = _a[1];
	            ev = ev.trim(), t = t ? t.trim() : "", v = obj[k];
	            if (t === 'collection') {
	                c[ev] = v;
	            } else if (t === 'model') {
	                m[ev] = v;
	            } else {
	                e[k] = v;
	            }
	        }
	        return { c: c, m: m, e: e };
	    };
	    return View;
	}(baseview_1.BaseView);
	exports.View = View;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Debug = __webpack_require__(63);
	var debug = Debug('views:collectionview');
	var view_1 = __webpack_require__(78);
	var orange_1 = __webpack_require__(20);
	var eventsjs_1 = __webpack_require__(5);
	var Buffer = function () {
	    function Buffer() {
	        this.children = [];
	        this.buffer = document.createDocumentFragment();
	    }
	    Buffer.prototype.append = function (view) {
	        this.children.push(view);
	        this.buffer.appendChild(view.el);
	    };
	    return Buffer;
	}();
	var CollectionView = function (_super) {
	    __extends(CollectionView, _super);
	    /** CollectionView
	    * @extends DataView
	    * @param {DataViewOptions} options
	    */
	    function CollectionView(options) {
	        _super.call(this, options);
	        this._options = options || {};
	        this.children = [];
	        this.sort = options && options.sort != null ? options.sort : true;
	        if (typeof this.initialize === 'function') {
	            orange_1.callFunc(this.initialize, this, orange_1.slice(arguments));
	        }
	    }
	    /**
	    * Render the collection view and alle of the children
	    * @return {CollectionView}
	    *
	    */
	    CollectionView.prototype.render = function (options) {
	        this.destroyChildren();
	        this._destroyContainer();
	        _super.prototype.render.call(this, options);
	        this._initContainer();
	        if (this.collection && this.collection.length) {
	            this.renderCollection();
	        } else {
	            this.showEmptyView();
	        }
	        return this;
	    };
	    /**
	     * @protected
	     */
	    CollectionView.prototype.setCollection = function (collection) {
	        _super.prototype.setCollection.call(this, collection);
	        this._delegateCollectionEvents();
	        return this;
	    };
	    CollectionView.prototype.renderCollection = function () {
	        this.destroyChildren();
	        if (this.collection.length !== 0) {
	            this.hideEmptyView();
	            this._startBuffering();
	            this._renderCollection();
	            this._stopBuffering();
	        } else {
	            this.showEmptyView();
	        }
	    };
	    /**
	    * Returns a new instance of this.childView with attached model.
	    *
	    * @param {IModel} model
	    * @protected
	    */
	    CollectionView.prototype.getChildView = function (model) {
	        var ViewClass = this.getOption('childView') || view_1.View,
	            options = this.getOption('childViewOptions') || {};
	        return new ViewClass(orange_1.extend({
	            model: model
	        }, options));
	    };
	    CollectionView.prototype.renderChildView = function (view, index) {
	        this.triggerMethod('before:render:child', view);
	        debug('%s render child: %s', this, view);
	        view.render();
	        this._attachHTML(view, index);
	        this.triggerMethod('render:child', view);
	    };
	    CollectionView.prototype.showEmptyView = function () {
	        var EmptyView = this.getOption('emptyView');
	        if (EmptyView == null) return;
	        var view = new EmptyView();
	        this._emptyView = view;
	        this._container.appendChild(view.render().el);
	    };
	    CollectionView.prototype.hideEmptyView = function () {
	        if (!this._emptyView) return;
	        this._emptyView.destroy();
	        this._emptyView.remove();
	        this._emptyView = void 0;
	    };
	    CollectionView.prototype.destroyChildren = function () {
	        if (this._container) {
	            this._container.innerHTML = '';
	        }
	        if (this.children.length === 0) return;
	        this.children.forEach(this.removeChildView, this);
	        this.children = [];
	    };
	    CollectionView.prototype.removeChildView = function (view) {
	        if (!view) return;
	        if (typeof view.destroy === 'function') {
	            debug('%s destroy child view: %s', this, view);
	            view.destroy();
	        } else if (typeof view.remove === 'function') {
	            debug('%s remove child view: %s', this, view);
	            view.remove();
	        }
	        this.stopListening(view);
	        this.children.splice(this.children.indexOf(view), 1);
	        if (this.children.length === 0) {
	            this.showEmptyView();
	        }
	        this._updateIndexes(view, false);
	    };
	    /**
	    * Destroy the collection view and all of it's children
	    * @see JaffaMVC.View
	    * @return {JaffaMVC.View}
	    */
	    CollectionView.prototype.destroy = function () {
	        this.triggerMethod('before:destroy:children');
	        this.destroyChildren();
	        this.triggerMethod('destroy:children');
	        this.hideEmptyView();
	        //if (this._emptyView) this.hideEmptyView();
	        return _super.prototype.destroy.call(this);
	    };
	    CollectionView.prototype._renderCollection = function () {
	        var _this = this;
	        this.triggerMethod('before:render:collection');
	        this.collection.forEach(function (model, index) {
	            var view = _this.getChildView(model);
	            _this._appendChild(view, index);
	        });
	        this.triggerMethod('render:collection');
	    };
	    /**
	    * Append childview to the container
	    * @private
	    * @param {IDataView} view
	    * @param {Number} index
	    */
	    CollectionView.prototype._appendChild = function (view, index) {
	        this._updateIndexes(view, true, index);
	        this._proxyChildViewEvents(view);
	        debug('%s append child %s at index: %s', this, view, index);
	        this.children.push(view);
	        this.hideEmptyView();
	        this.renderChildView(view, index);
	        this.triggerMethod('add:child', view);
	    };
	    /**
	    * Attach the childview's element to the CollectionView.
	    * When in buffer mode, the view is added to a documentfragment to optimize performance
	    * @param {View} view  A view
	    * @param {Number} index The index in which to insert the view
	    * @private
	    */
	    CollectionView.prototype._attachHTML = function (view, index) {
	        if (this._buffer) {
	            debug("%s attach to buffer: %s", this, view);
	            this._buffer.append(view);
	        } else {
	            //if (this._isShown) {
	            //  utils.triggerMethodOn(view, 'before:show');
	            //}
	            if (!this._insertBefore(view, index)) {
	                this._insertAfter(view);
	            }
	        }
	    };
	    /**
	    * Proxy event froms childview to the collectionview
	    * @param {IView} view
	    * @private
	    */
	    CollectionView.prototype._proxyChildViewEvents = function (view) {
	        var prefix = this.getOption('prefix') || 'childview';
	        this.listenTo(view, 'all', function () {
	            var args = orange_1.slice(arguments);
	            args[0] = prefix + ':' + args[0];
	            args.splice(1, 0, view);
	            orange_1.callFunc(this.triggerMethod, this, args);
	        });
	    };
	    CollectionView.prototype._updateIndexes = function (view, increment, index) {
	        if (!this.sort) return;
	        if (increment) view._index = index;
	        this.children.forEach(function (lView) {
	            if (lView._index >= view._index) {
	                increment ? lView._index++ : lView._index--;
	            }
	        });
	    };
	    CollectionView.prototype._startBuffering = function () {
	        debug("%s initializing buffer", this);
	        this._buffer = new Buffer();
	    };
	    CollectionView.prototype._stopBuffering = function () {
	        debug('%s appending buffer to container', this);
	        this._container.appendChild(this._buffer.buffer);
	        delete this._buffer;
	    };
	    CollectionView.prototype._initContainer = function () {
	        debug("%s init container", this);
	        var container = this.getOption('childViewContainer');
	        if (container) {
	            container = this.$(container)[0];
	        } else {
	            container = this.el;
	        }
	        this._container = container;
	    };
	    CollectionView.prototype._destroyContainer = function () {
	        if (this._container) delete this._container;
	    };
	    /**
	     * Internal method. Check whether we need to insert the view into
	    * the correct position.
	     * @param  {IView} childView [description]
	     * @param  {number} index     [description]
	     * @return {boolean}           [description]
	     */
	    CollectionView.prototype._insertBefore = function (childView, index) {
	        var currentView;
	        var findPosition = this.sort && index < this.children.length - 1;
	        if (findPosition) {
	            // Find the view after this one
	            currentView = orange_1.find(this.children, function (view) {
	                return view._index === index + 1;
	            });
	        }
	        if (currentView) {
	            debug('%s insert child %s before: %s', this, childView, currentView);
	            this._container.insertBefore(childView.el, currentView.el);
	            return true;
	        }
	        return false;
	    };
	    /**
	     * Internal method. Append a view to the end of the $el
	     * @private
	     */
	    CollectionView.prototype._insertAfter = function (childView) {
	        debug('%s insert child %s ', this, childView);
	        this._container.appendChild(childView.el);
	    };
	    /**
	     * Delegate collection events
	     * @private
	     */
	    CollectionView.prototype._delegateCollectionEvents = function () {
	        if (this.collection && eventsjs_1.isEventEmitter(this.collection)) {
	            this.listenTo(this.collection, 'add', this._onCollectionAdd);
	            this.listenTo(this.collection, 'remove', this._onCollectionRemove);
	            this.listenTo(this.collection, 'reset', this.render);
	            if (this.sort) this.listenTo(this.collection, 'sort', this._onCollectionSort);
	        }
	    };
	    // Event handlers
	    /**
	     * Called when a model is add to the collection
	     * @param {JaffaMVC.Model|Backbone.model} model Model
	     * @private
	     */
	    CollectionView.prototype._onCollectionAdd = function (model) {
	        debug('%s received add event from collection %s', this, this.collection);
	        var view = this.getChildView(model);
	        var index = this.collection.indexOf(model);
	        this._appendChild(view, index);
	    };
	    /**
	     * Called when a model is removed from the collection
	     * @param {JaffaMVC.Model|Backbone.model} model Model
	     * @private
	     */
	    CollectionView.prototype._onCollectionRemove = function (model) {
	        debug('%s received remove event from collection %s', this, this.collection);
	        var view = orange_1.find(this.children, function (view) {
	            return view.model === model;
	        });
	        this.removeChildView(view);
	    };
	    /**
	     * Called when the collection is sorted
	     * @private
	     */
	    CollectionView.prototype._onCollectionSort = function () {
	        var _this = this;
	        debug('%s received sort event from collection %s', this, this.collection);
	        var orderChanged = this.collection.find(function (model, index) {
	            var view = orange_1.find(_this.children, function (view) {
	                return view.model === model;
	            });
	            return !view || view._index !== index;
	        });
	        if (orderChanged) this.render();
	    };
	    return CollectionView;
	}(view_1.View);
	exports.CollectionView = CollectionView;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var orange_1 = __webpack_require__(20);
	function attributes(attrs) {
	    return function (target) {
	        orange_1.extend(target.prototype, attrs);
	    };
	}
	exports.attributes = attributes;
	function events(events) {
	    return function (target) {
	        target.prototype.events = events;
	    };
	}
	exports.events = events;
	function triggers(triggers) {
	    return function (target) {
	        target.prototype.triggers = triggers;
	    };
	}
	exports.triggers = triggers;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var views_1 = __webpack_require__(61);
	//import {template} from '../utils';
	//import {getMimeIcon} from '../mime-types';
	//import {fileModel} from '../../models/index'
	var orange_1 = __webpack_require__(20);
	var orange_dom_1 = __webpack_require__(70);
	var index_1 = __webpack_require__(82);
	var mimetypes_1 = __webpack_require__(83);
	var FileListItemView = function (_views_1$View) {
	    _inherits(FileListItemView, _views_1$View);

	    function FileListItemView() {
	        _classCallCheck(this, FileListItemView);

	        return _possibleConstructorReturn(this, (FileListItemView.__proto__ || Object.getPrototypeOf(FileListItemView)).apply(this, arguments));
	    }

	    _createClass(FileListItemView, [{
	        key: "onRender",
	        value: function onRender() {
	            var _this2 = this;

	            var model = this.model;
	            var isDir = model.get('is_dir');
	            orange_dom_1.removeClass(this.ui['mime'], 'mime-unknown');
	            if (isDir) {
	                orange_dom_1.addClass(this.ui['mime'], 'mime-folder');
	            } else {
	                var mime = mimetypes_1.getMimeIcon(model.get('mime')); //model.get('mime').replace(/\//, '-')
	                orange_dom_1.addClass(this.ui['mime'], mime);
	            }
	            this.ui['name'].textContent = orange_1.truncate(model.get('name') || model.get('filename'), 25);
	            if (/^image\/.*/.test(model.get('mime'))) {
	                (function () {
	                    var img = new Image();
	                    img.src = "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI=";
	                    //img.setAttribute('data-src', `${url}?thumbnail=true`)
	                    _this2.model.open({ thumbnail: true }).then(function (blob) {
	                        img.setAttribute('data-src', URL.createObjectURL(blob));
	                        _this2.ui['mime'].parentNode.insertBefore(img, _this2.ui['mime']);
	                        _this2.ui['mime'].style.display = 'none';
	                        _this2.trigger('image');
	                    });
	                })();
	            }
	            //let url = model.getURL();
	            /*let img = new Image();
	            img.src = "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI="
	            img.setAttribute('data-src', `${url}?thumbnail=true`)*/
	            //*/
	        }
	    }, {
	        key: "_onClick",
	        value: function _onClick(e) {
	            e.preventDefault();
	            var target = e.target;
	            if (target === this.ui['remove']) return;
	            this.triggerMethod('click', this.model);
	        }
	    }, {
	        key: "_onDblClick",
	        value: function _onDblClick(e) {
	            this.triggerMethod('dblclick', this.model);
	        }
	    }]);

	    return FileListItemView;
	}(views_1.View);
	FileListItemView = __decorate([views_1.attributes({
	    template: function template() {
	        return index_1.default['list-item'];
	    },
	    tagName: 'div',
	    className: 'file-list-item',
	    ui: {
	        remove: '.file-list-item .close-button',
	        name: '.name',
	        mime: '.mime'
	    },
	    triggers: {
	        'click @ui.remove': 'remove'
	    },
	    events: {
	        'click': '_onClick',
	        'dblclick': '_onDblClick'
	    }
	}), __metadata('design:paramtypes', [])], FileListItemView);
	exports.FileListItemView = FileListItemView;

/***/ },
/* 82 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    "file-info": "<div class=\"preview-region\">\n</div>\n<div class=\"info-region\">  <table>  <tr>  <td>Name</td>  <td class=\"name\"></td>  </tr>  <tr>  <td>Mime</td>  <td class=\"mimetype\"></td>  </tr>  <tr>  <td>Size</td>  <td class=\"size\"></td>  </tr>  <tr>  <td>Download</td>  <td class=\"download\">  <a></a>  </td>  </tr>  </table>\n</div>",
	    "gallery": "<div class=\"gallery-area\">  <div class=\"gallery-list\">  </div>  <div class=\"gallery-info\"></div>  </div>\n<div class=\"upload-progress-container\">  <div class=\"upload-progress\"></div>\n</div>\n",
	    "list-item": "<a class=\"close-button\"></a>\n<div class=\"thumbnail-container\">  <i class=\"mime mimetype mime-unknown\"></i>\n</div>\n<div class=\"name\"></div>\n",
	    "list": "<div class=\"file-list-item-container\">\n</div>\n<div class=\"file-list-download-progress progress\"></div>\n"
	};

/***/ },
/* 83 */
/***/ function(module, exports) {

	"use strict";

	var MimeTypes = {
	    "application-x-7zip": "mime-application-x-7zip",
	    "application-rss+xml": "mime-application-rss+xml",
	    "x-office-drawing": "mime-x-office-drawing",
	    "text-javascript": "mime-text-x-javascript",
	    "text-x-javascript": "mime-text-x-javascript",
	    "message": "mime-message",
	    "application-msword": "mime-application-msword",
	    "multipart-encrypted": "mime-multipart-encrypted",
	    "audio-x-vorbis+ogg": "mime-audio-x-vorbis+ogg",
	    "application-pdf": "mime-application-pdf",
	    "encrypted": "mime-encrypted",
	    "application-pgp-keys": "mime-application-pgp-keys",
	    "text-richtext": "mime-text-richtext",
	    "text-plain": "mime-text-plain",
	    "text-sql": "mime-text-x-sql",
	    "text-x-sql": "mime-text-x-sql",
	    "application-vnd.ms-excel": "mime-application-vnd.ms-excel",
	    "application-vnd.ms-powerpoint": "mime-application-vnd.ms-powerpoint",
	    "application-vnd.oasis.opendocument.formula": "mime-application-vnd.oasis.opendocument.formula",
	    "x-office-spreadsheet": "mime-x-office-spreadsheet",
	    "text-html": "mime-text-html",
	    "x-office-document": "mime-x-office-document",
	    "video-generic": "mime-video-x-generic",
	    "video-x-generic": "mime-video-x-generic",
	    "application-vnd.scribus": "mime-application-vnd.scribus",
	    "application-ace": "mime-application-x-ace",
	    "application-x-ace": "mime-application-x-ace",
	    "application-tar": "mime-application-x-tar",
	    "application-x-tar": "mime-application-x-tar",
	    "application-bittorrent": "mime-application-x-bittorrent",
	    "application-x-bittorrent": "mime-application-x-bittorrent",
	    "application-x-cd-image": "mime-application-x-cd-image",
	    "text-java": "mime-text-x-java",
	    "text-x-java": "mime-text-x-java",
	    "application-gzip": "mime-application-x-gzip",
	    "application-x-gzip": "mime-application-x-gzip",
	    "application-sln": "mime-application-x-sln",
	    "application-x-sln": "mime-application-x-sln",
	    "application-cue": "mime-application-x-cue",
	    "application-x-cue": "mime-application-x-cue",
	    "deb": "mime-deb",
	    "application-glade": "mime-application-x-glade",
	    "application-x-glade": "mime-application-x-glade",
	    "application-theme": "mime-application-x-theme",
	    "application-x-theme": "mime-application-x-theme",
	    "application-executable": "mime-application-x-executable",
	    "application-x-executable": "mime-application-x-executable",
	    "application-x-flash-video": "mime-application-x-flash-video",
	    "application-jar": "mime-application-x-jar",
	    "application-x-jar": "mime-application-x-jar",
	    "application-x-ms-dos-executable": "mime-application-x-ms-dos-executable",
	    "application-msdownload": "mime-application-x-msdownload",
	    "application-x-msdownload": "mime-application-x-msdownload",
	    "package-generic": "mime-package-x-generic",
	    "package-x-generic": "mime-package-x-generic",
	    "application-php": "mime-application-x-php",
	    "application-x-php": "mime-application-x-php",
	    "text-python": "mime-text-x-python",
	    "text-x-python": "mime-text-x-python",
	    "application-rar": "mime-application-x-rar",
	    "application-x-rar": "mime-application-x-rar",
	    "rpm": "mime-rpm",
	    "application-ruby": "mime-application-x-ruby",
	    "application-x-ruby": "mime-application-x-ruby",
	    "text-script": "mime-text-x-script",
	    "text-x-script": "mime-text-x-script",
	    "text-bak": "mime-text-x-bak",
	    "text-x-bak": "mime-text-x-bak",
	    "application-zip": "mime-application-x-zip",
	    "application-x-zip": "mime-application-x-zip",
	    "text-xml": "mime-text-xml",
	    "audio-mpeg": "mime-audio-x-mpeg",
	    "audio-x-mpeg": "mime-audio-x-mpeg",
	    "audio-wav": "mime-audio-x-wav",
	    "audio-x-wav": "mime-audio-x-wav",
	    "audio-generic": "mime-audio-x-generic",
	    "audio-x-generic": "mime-audio-x-generic",
	    "audio-x-mp3-playlist": "mime-audio-x-mp3-playlist",
	    "audio-x-ms-wma": "mime-audio-x-ms-wma",
	    "authors": "mime-authors",
	    "empty": "mime-empty",
	    "extension": "mime-extension",
	    "font-generic": "mime-font-x-generic",
	    "font-x-generic": "mime-font-x-generic",
	    "image-bmp": "mime-image-bmp",
	    "image-gif": "mime-image-gif",
	    "image-jpeg": "mime-image-jpeg",
	    "image-png": "mime-image-png",
	    "image-tiff": "mime-image-tiff",
	    "image-ico": "mime-image-x-ico",
	    "image-x-ico": "mime-image-x-ico",
	    "image-eps": "mime-image-x-eps",
	    "image-x-eps": "mime-image-x-eps",
	    "image-generic": "mime-image-x-generic",
	    "image-x-generic": "mime-image-x-generic",
	    "image-psd": "mime-image-x-psd",
	    "image-x-psd": "mime-image-x-psd",
	    "image-xcf": "mime-image-x-xcf",
	    "image-x-xcf": "mime-image-x-xcf",
	    "x-office-presentation": "mime-x-office-presentation",
	    "unknown": "mime-unknown",
	    "opera-extension": "mime-opera-extension",
	    "opera-unite-application": "mime-opera-unite-application",
	    "opera-widget": "mime-opera-widget",
	    "phatch-actionlist": "mime-phatch-actionlist",
	    "text-makefile": "mime-text-x-makefile",
	    "text-x-makefile": "mime-text-x-makefile",
	    "x-office-address-book": "mime-x-office-address-book",
	    "vcalendar": "mime-vcalendar",
	    "text-source": "mime-text-x-source",
	    "text-x-source": "mime-text-x-source",
	    "text-x-generic-template": "mime-text-x-generic-template",
	    "text-css": "mime-text-css",
	    "text-bibtex": "mime-text-x-bibtex",
	    "text-x-bibtex": "mime-text-x-bibtex",
	    "text-x-c++": "mime-text-x-c++",
	    "text-x-c++hdr": "mime-text-x-c++hdr",
	    "text-c": "mime-text-x-c",
	    "text-x-c": "mime-text-x-c",
	    "text-changelog": "mime-text-x-changelog",
	    "text-x-changelog": "mime-text-x-changelog",
	    "text-chdr": "mime-text-x-chdr",
	    "text-x-chdr": "mime-text-x-chdr",
	    "text-copying": "mime-text-x-copying",
	    "text-x-copying": "mime-text-x-copying",
	    "text-install": "mime-text-x-install",
	    "text-x-install": "mime-text-x-install",
	    "text-preview": "mime-text-x-preview",
	    "text-x-preview": "mime-text-x-preview",
	    "text-readme": "mime-text-x-readme",
	    "text-x-readme": "mime-text-x-readme",
	    "text-tex": "mime-text-x-tex",
	    "text-x-tex": "mime-text-x-tex",
	    "text-xhtml+xml": "mime-text-xhtml+xml",
	    "x-dia-diagram": "mime-x-dia-diagram"
	};
	function getMimeIcon(mime) {
	    if (MimeTypes[mime]) {
	        return MimeTypes[mime].replace(/\+/m, 'p');
	    }
	    return MimeTypes['unknown'];
	}
	exports.getMimeIcon = getMimeIcon;
	;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var views_1 = __webpack_require__(61);
	var orange_1 = __webpack_require__(20);
	var Progress = function (_views_1$View) {
	    _inherits(Progress, _views_1$View);

	    function Progress() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, Progress);

	        var _this = _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).call(this, options));

	        _this.options = orange_1.extend({}, {
	            size: 220,
	            lineWidth: 15,
	            rotate: 0,
	            background: '#efefef',
	            foreground: '#555555'
	        }, options);
	        _this._percent = 0;
	        return _this;
	    }

	    _createClass(Progress, [{
	        key: "setPercent",
	        value: function setPercent(percent) {
	            var _this2 = this;

	            var newPercent = percent;
	            var diff = Math.abs(percent - this._percent);
	            requestAnimationFrame(function () {
	                _this2.ctx.clearRect(0, 0, 100, 100);
	                _this2._drawCircle(_this2.ctx, _this2.options.background, _this2.options.lineWidth, 100 / 100);
	                _this2._drawCircle(_this2.ctx, _this2.options.foreground, _this2.options.lineWidth, percent / 100);
	                _this2.el.querySelector('span').textContent = Math.floor(percent) + '%';
	            });
	        }
	    }, {
	        key: "_drawCircle",
	        value: function _drawCircle(ctx, color, lineWidth, percent) {
	            var radius = (this.options.size - this.options.lineWidth) / 2;
	            percent = Math.min(Math.max(0, percent || 1), 1);
	            ctx.beginPath();
	            ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
	            ctx.strokeStyle = color;
	            ctx.lineCap = 'round'; // butt, round or square
	            ctx.lineWidth = lineWidth;
	            ctx.stroke();
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            _get(Progress.prototype.__proto__ || Object.getPrototypeOf(Progress.prototype), "render", this).call(this);
	            this.el.innerHTML = "";
	            //let percent = parseInt(this.el.getAttribute('data-percent')||<any>0);
	            var options = this.options;
	            var canvas = document.createElement('canvas');
	            var span = document.createElement('span');
	            //span.textContent = Math.round(percent) + '%';
	            if (typeof G_vmlCanvasManager !== 'undefined') {
	                G_vmlCanvasManager.initElement(canvas);
	            }
	            var ctx = canvas.getContext('2d');
	            canvas.width = canvas.height = options.size;
	            this.el.appendChild(span);
	            this.el.appendChild(canvas);
	            this.el.style.width = options.size + 'px';
	            this.el.style.height = options.size + 'px';
	            ctx.translate(options.size / 2, options.size / 2); // change center
	            ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg
	            span.style.lineHeight = options.size + 'px';
	            span.style.width = options.size + 'px';
	            span.style.fontSize = options.size / 5 + 'px';
	            this.ctx = ctx;
	            this.setPercent(0);
	            return this;
	        }
	    }]);

	    return Progress;
	}(views_1.View);
	Progress = __decorate([views_1.attributes({
	    className: "progress"
	}), __metadata('design:paramtypes', [Object])], Progress);
	exports.Progress = Progress;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*!
	  hey, [be]Lazy.js - v1.6.2 - 2016.05.09
	  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
	  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
	*/
	;
	(function (root, blazy) {
	    if (true) {
	        // AMD. Register bLazy as an anonymous module
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (blazy), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like environments that support module.exports,
	        // like Node.
	        module.exports = blazy();
	    } else {
	        // Browser globals. Register bLazy on window
	        root.Blazy = blazy();
	    }
	})(undefined, function () {
	    'use strict';

	    //private vars

	    var _source,
	        _viewport,
	        _isRetina,
	        _attrSrc = 'src',
	        _attrSrcset = 'srcset';

	    // constructor
	    return function Blazy(options) {
	        //IE7- fallback for missing querySelectorAll support
	        if (!document.querySelectorAll) {
	            var s = document.createStyleSheet();
	            document.querySelectorAll = function (r, c, i, j, a) {
	                a = document.all, c = [], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
	                for (i = r.length; i--;) {
	                    s.addRule(r[i], 'k:v');
	                    for (j = a.length; j--;) {
	                        a[j].currentStyle.k && c.push(a[j]);
	                    }s.removeRule(0);
	                }
	                return c;
	            };
	        }

	        //options and helper vars
	        var scope = this;
	        var util = scope._util = {};
	        util.elements = [];
	        util.destroyed = true;
	        scope.options = options || {};
	        scope.options.error = scope.options.error || false;
	        scope.options.offset = scope.options.offset || 100;
	        scope.options.success = scope.options.success || false;
	        scope.options.selector = scope.options.selector || '.b-lazy';
	        scope.options.separator = scope.options.separator || '|';
	        scope.options.container = scope.options.container ? document.querySelectorAll(scope.options.container) : false;
	        scope.options.errorClass = scope.options.errorClass || 'b-error';
	        scope.options.breakpoints = scope.options.breakpoints || false; // obsolete
	        scope.options.loadInvisible = scope.options.loadInvisible || false;
	        scope.options.successClass = scope.options.successClass || 'b-loaded';
	        scope.options.validateDelay = scope.options.validateDelay || 25;
	        scope.options.saveViewportOffsetDelay = scope.options.saveViewportOffsetDelay || 50;
	        scope.options.srcset = scope.options.srcset || 'data-srcset';
	        scope.options.src = _source = scope.options.src || 'data-src';
	        _isRetina = window.devicePixelRatio > 1;
	        _viewport = {};
	        _viewport.top = 0 - scope.options.offset;
	        _viewport.left = 0 - scope.options.offset;

	        /* public functions
	         ************************************/
	        scope.revalidate = function () {
	            initialize(this);
	        };
	        scope.load = function (elements, force) {
	            var opt = this.options;
	            if (elements.length === undefined) {
	                loadElement(elements, force, opt);
	            } else {
	                each(elements, function (element) {
	                    loadElement(element, force, opt);
	                });
	            }
	        };
	        scope.destroy = function () {
	            var self = this;
	            var util = self._util;
	            if (self.options.container) {
	                each(self.options.container, function (object) {
	                    unbindEvent(object, 'scroll', util.validateT);
	                });
	            }
	            unbindEvent(window, 'scroll', util.validateT);
	            unbindEvent(window, 'resize', util.validateT);
	            unbindEvent(window, 'resize', util.saveViewportOffsetT);
	            util.count = 0;
	            util.elements.length = 0;
	            util.destroyed = true;
	        };

	        //throttle, ensures that we don't call the functions too often
	        util.validateT = throttle(function () {
	            validate(scope);
	        }, scope.options.validateDelay, scope);
	        util.saveViewportOffsetT = throttle(function () {
	            saveViewportOffset(scope.options.offset);
	        }, scope.options.saveViewportOffsetDelay, scope);
	        saveViewportOffset(scope.options.offset);

	        //handle multi-served image src (obsolete)
	        each(scope.options.breakpoints, function (object) {
	            if (object.width >= window.screen.width) {
	                _source = object.src;
	                return false;
	            }
	        });

	        // start lazy load
	        setTimeout(function () {
	            initialize(scope);
	        }); // "dom ready" fix
	    };

	    /* Private helper functions
	     ************************************/
	    function initialize(self) {
	        var util = self._util;
	        // First we create an array of elements to lazy load
	        util.elements = toArray(self.options.selector);
	        util.count = util.elements.length;
	        // Then we bind resize and scroll events if not already binded
	        if (util.destroyed) {
	            util.destroyed = false;
	            if (self.options.container) {
	                each(self.options.container, function (object) {
	                    bindEvent(object, 'scroll', util.validateT);
	                });
	            }
	            bindEvent(window, 'resize', util.saveViewportOffsetT);
	            bindEvent(window, 'resize', util.validateT);
	            bindEvent(window, 'scroll', util.validateT);
	        }
	        // And finally, we start to lazy load.
	        validate(self);
	    }

	    function validate(self) {
	        var util = self._util;
	        for (var i = 0; i < util.count; i++) {
	            var element = util.elements[i];
	            if (elementInView(element) || hasClass(element, self.options.successClass)) {
	                self.load(element);
	                util.elements.splice(i, 1);
	                util.count--;
	                i--;
	            }
	        }
	        if (util.count === 0) {
	            self.destroy();
	        }
	    }

	    function elementInView(ele) {
	        var rect = ele.getBoundingClientRect();
	        return (
	            // Intersection
	            rect.right >= _viewport.left && rect.bottom >= _viewport.top && rect.left <= _viewport.right && rect.top <= _viewport.bottom
	        );
	    }

	    function loadElement(ele, force, options) {
	        // if element is visible, not loaded or forced
	        if (!hasClass(ele, options.successClass) && (force || options.loadInvisible || ele.offsetWidth > 0 && ele.offsetHeight > 0)) {
	            var dataSrc = ele.getAttribute(_source) || ele.getAttribute(options.src); // fallback to default 'data-src'
	            if (dataSrc) {
	                var dataSrcSplitted = dataSrc.split(options.separator);
	                var src = dataSrcSplitted[_isRetina && dataSrcSplitted.length > 1 ? 1 : 0];
	                var isImage = equal(ele, 'img');
	                // Image or background image
	                if (isImage || ele.src === undefined) {
	                    var img = new Image();
	                    // using EventListener instead of onerror and onload
	                    // due to bug introduced in chrome v50 
	                    // (https://productforums.google.com/forum/#!topic/chrome/p51Lk7vnP2o)
	                    var onErrorHandler = function onErrorHandler() {
	                        if (options.error) options.error(ele, "invalid");
	                        addClass(ele, options.errorClass);
	                        unbindEvent(img, 'error', onErrorHandler);
	                        unbindEvent(img, 'load', onLoadHandler);
	                    };
	                    var onLoadHandler = function onLoadHandler() {
	                        // Is element an image
	                        if (isImage) {
	                            setSrc(ele, src); //src
	                            handleSource(ele, _attrSrcset, options.srcset); //srcset
	                            //picture element
	                            var parent = ele.parentNode;
	                            if (parent && equal(parent, 'picture')) {
	                                each(parent.getElementsByTagName('source'), function (source) {
	                                    handleSource(source, _attrSrcset, options.srcset);
	                                });
	                            }
	                            // or background-image
	                        } else {
	                            ele.style.backgroundImage = 'url("' + src + '")';
	                        }
	                        itemLoaded(ele, options);
	                        unbindEvent(img, 'load', onLoadHandler);
	                        unbindEvent(img, 'error', onErrorHandler);
	                    };
	                    bindEvent(img, 'error', onErrorHandler);
	                    bindEvent(img, 'load', onLoadHandler);
	                    setSrc(img, src); //preload
	                } else {
	                    // An item with src like iframe, unity, simpelvideo etc
	                    setSrc(ele, src);
	                    itemLoaded(ele, options);
	                }
	            } else {
	                // video with child source
	                if (equal(ele, 'video')) {
	                    each(ele.getElementsByTagName('source'), function (source) {
	                        handleSource(source, _attrSrc, options.src);
	                    });
	                    ele.load();
	                    itemLoaded(ele, options);
	                } else {
	                    if (options.error) options.error(ele, "missing");
	                    addClass(ele, options.errorClass);
	                }
	            }
	        }
	    }

	    function itemLoaded(ele, options) {
	        addClass(ele, options.successClass);
	        if (options.success) options.success(ele);
	        // cleanup markup, remove data source attributes
	        ele.removeAttribute(options.src);
	        each(options.breakpoints, function (object) {
	            ele.removeAttribute(object.src);
	        });
	    }

	    function setSrc(ele, src) {
	        ele[_attrSrc] = src;
	    }

	    function handleSource(ele, attr, dataAttr) {
	        var dataSrc = ele.getAttribute(dataAttr);
	        if (dataSrc) {
	            ele[attr] = dataSrc;
	            ele.removeAttribute(dataAttr);
	        }
	    }

	    function equal(ele, str) {
	        return ele.nodeName.toLowerCase() === str;
	    }

	    function hasClass(ele, className) {
	        return (' ' + ele.className + ' ').indexOf(' ' + className + ' ') !== -1;
	    }

	    function addClass(ele, className) {
	        if (!hasClass(ele, className)) {
	            ele.className += ' ' + className;
	        }
	    }

	    function toArray(selector) {
	        var array = [];
	        var nodelist = document.querySelectorAll(selector);
	        for (var i = nodelist.length; i--; array.unshift(nodelist[i])) {}
	        return array;
	    }

	    function saveViewportOffset(offset) {
	        _viewport.bottom = (window.innerHeight || document.documentElement.clientHeight) + offset;
	        _viewport.right = (window.innerWidth || document.documentElement.clientWidth) + offset;
	    }

	    function bindEvent(ele, type, fn) {
	        if (ele.attachEvent) {
	            ele.attachEvent && ele.attachEvent('on' + type, fn);
	        } else {
	            ele.addEventListener(type, fn, false);
	        }
	    }

	    function unbindEvent(ele, type, fn) {
	        if (ele.detachEvent) {
	            ele.detachEvent && ele.detachEvent('on' + type, fn);
	        } else {
	            ele.removeEventListener(type, fn, false);
	        }
	    }

	    function each(object, fn) {
	        if (object && fn) {
	            var l = object.length;
	            for (var i = 0; i < l && fn(object[i], i) !== false; i++) {}
	        }
	    }

	    function throttle(fn, minDelay, scope) {
	        var lastCall = 0;
	        return function () {
	            var now = +new Date();
	            if (now - lastCall < minDelay) {
	                return;
	            }
	            lastCall = now;
	            fn.apply(scope, arguments);
	        };
	    }
	});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var views_1 = __webpack_require__(61);
	var orange_1 = __webpack_require__(20);
	var Progress = function (_views_1$View) {
	    _inherits(Progress, _views_1$View);

	    function Progress() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, Progress);

	        var _this = _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).call(this, options));

	        _this.options = orange_1.extend({}, {
	            size: 220,
	            lineWidth: 15,
	            rotate: 0,
	            background: '#efefef',
	            foreground: '#555555'
	        }, options);
	        _this._percent = 0;
	        return _this;
	    }

	    _createClass(Progress, [{
	        key: "setPercent",
	        value: function setPercent(percent) {
	            var _this2 = this;

	            var newPercent = percent;
	            var diff = Math.abs(percent - this._percent);
	            requestAnimationFrame(function () {
	                _this2.ctx.clearRect(0, 0, 100, 100);
	                _this2._drawCircle(_this2.ctx, _this2.options.background, _this2.options.lineWidth, 100 / 100);
	                _this2._drawCircle(_this2.ctx, _this2.options.foreground, _this2.options.lineWidth, percent / 100);
	                _this2.el.querySelector('span').textContent = Math.floor(percent) + '%';
	            });
	        }
	    }, {
	        key: "_drawCircle",
	        value: function _drawCircle(ctx, color, lineWidth, percent) {
	            var radius = (this.options.size - this.options.lineWidth) / 2;
	            percent = Math.min(Math.max(0, percent || 1), 1);
	            ctx.beginPath();
	            ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
	            ctx.strokeStyle = color;
	            ctx.lineCap = 'round'; // butt, round or square
	            ctx.lineWidth = lineWidth;
	            ctx.stroke();
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            _get(Progress.prototype.__proto__ || Object.getPrototypeOf(Progress.prototype), "render", this).call(this);
	            this.el.innerHTML = "";
	            //let percent = parseInt(this.el.getAttribute('data-percent')||<any>0);
	            var options = this.options;
	            var canvas = document.createElement('canvas');
	            var span = document.createElement('span');
	            //span.textContent = Math.round(percent) + '%';
	            if (typeof G_vmlCanvasManager !== 'undefined') {
	                G_vmlCanvasManager.initElement(canvas);
	            }
	            var ctx = canvas.getContext('2d');
	            canvas.width = canvas.height = options.size;
	            this.el.appendChild(span);
	            this.el.appendChild(canvas);
	            this.el.style.width = options.size + 'px';
	            this.el.style.height = options.size + 'px';
	            ctx.translate(options.size / 2, options.size / 2); // change center
	            ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg
	            span.style.lineHeight = options.size + 'px';
	            span.style.width = options.size + 'px';
	            span.style.fontSize = options.size / 5 + 'px';
	            this.ctx = ctx;
	            this.setPercent(0);
	            return this;
	        }
	    }]);

	    return Progress;
	}(views_1.View);
	Progress = __decorate([views_1.attributes({
	    className: "progress"
	}), __metadata('design:paramtypes', [Object])], Progress);
	exports.Progress = Progress;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(88));

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var views_1 = __webpack_require__(61);
	var orange_1 = __webpack_require__(20);
	var index_1 = __webpack_require__(59);
	var index_2 = __webpack_require__(89);
	var index_3 = __webpack_require__(82);
	var collection_1 = __webpack_require__(1);
	var dropzone_1 = __webpack_require__(91);
	var GalleryView = function (_views_1$LayoutView) {
	    _inherits(GalleryView, _views_1$LayoutView);

	    function GalleryView(options) {
	        _classCallCheck(this, GalleryView);

	        var _this = _possibleConstructorReturn(this, (GalleryView.__proto__ || Object.getPrototypeOf(GalleryView)).call(this, orange_1.extend({}, options, {
	            regions: {
	                list: '.gallery-list',
	                info: '.gallery-info'
	            }
	        })));

	        _this.options = options;
	        _this.collections = [];
	        _this.client = options.client;
	        _this.list = new index_1.FileListView({
	            showDirectories: options.showDirectories || false
	        });
	        _this.info = new index_2.FileInfoView({
	            client: _this.client
	        });
	        _this.drop = new dropzone_1.DropZone({
	            el: _this.el
	        });
	        _this.listenTo(_this.list, 'selected', _this._onFileInfoSelected);
	        _this.listenTo(_this.list, 'remove', _this._onFileInfoRemoved);
	        _this.listenTo(_this.drop, 'drop', _this._onFileDrop);
	        return _this;
	    }

	    _createClass(GalleryView, [{
	        key: "_onFileInfoSelected",
	        value: function _onFileInfoSelected(view, model) {
	            this.selected = model;
	        }
	    }, {
	        key: "_onFileInfoRemoved",
	        value: function _onFileInfoRemoved(view, model) {
	            this.client.remove(model.fullPath).then(function (res) {
	                if (res.message === 'ok') {
	                    model.remove();
	                }
	                console.log(res);
	            });
	        }
	    }, {
	        key: "_setCollection",
	        value: function _setCollection(collection) {
	            this.list.collection = collection;
	        }
	    }, {
	        key: "_onFileDrop",
	        value: function _onFileDrop(file) {
	            console.log(file);
	            var collection = this.collections[this.collections.length - 1];
	            collection.upload(file.name, file, {
	                progress: function progress(e) {
	                    var pc = 100 / e.total * e.loaded;
	                    console.log(pc);
	                }
	            });
	        }
	    }, {
	        key: "onRender",
	        value: function onRender() {
	            this.regions['list'].show(this.list);
	            this.regions['info'].show(this.info);
	            this.drop.render();
	        }
	    }, {
	        key: "root",
	        set: function set(path) {
	            if (this._root == path) return;
	            this._root = path;
	            for (var i = 0, ii = this.collections.length; i < ii; i++) {
	                this.collections[i].destroy();
	            }
	            this.collections = [new collection_1.FileCollection(null, {
	                client: this.client,
	                path: this._root
	            })];
	            this._setCollection(this.collections[0]);
	            this.collections[0].fetch({
	                params: {
	                    show_hidden: false
	                }
	            });
	        },
	        get: function get() {
	            return this._root;
	        }
	    }, {
	        key: "selected",
	        get: function get() {
	            return this._selected;
	        },
	        set: function set(model) {
	            this._selected = model;
	            this.info.model = model.get('is_dir') ? null : model;
	        }
	    }]);

	    return GalleryView;
	}(views_1.LayoutView);
	GalleryView = __decorate([views_1.attributes({
	    template: function template() {
	        return index_3.default['gallery'];
	    },
	    className: 'file-gallery'
	}), __metadata('design:paramtypes', [Object])], GalleryView);
	exports.GalleryView = GalleryView;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(90));

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var views_1 = __webpack_require__(61);
	var index_1 = __webpack_require__(82);
	var orange_1 = __webpack_require__(20);
	var FileInfoView = function (_views_1$View) {
	    _inherits(FileInfoView, _views_1$View);

	    function FileInfoView(options) {
	        _classCallCheck(this, FileInfoView);

	        var _this = _possibleConstructorReturn(this, (FileInfoView.__proto__ || Object.getPrototypeOf(FileInfoView)).call(this, options));

	        _this.options = options;
	        _this.client = options.client;
	        return _this;
	    }

	    _createClass(FileInfoView, [{
	        key: "onModel",
	        value: function onModel(model) {
	            if (model == null) {
	                return this.clear();
	            }
	            this._update_ui(model);
	        }
	    }, {
	        key: "onRender",
	        value: function onRender() {
	            this.__rendered = true;
	            if (this.model) this._update_ui(this.model);
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            if (!this.__rendered) return this;
	            var ui = this.ui;
	            ui.name.textContent = '';
	            ui.mime.textContent = '';
	            ui.size.textContent = '';
	            ui.download.textContent = '';
	            this.el.style.opacity = "0";
	            return this;
	        }
	    }, {
	        key: "_update_ui",
	        value: function _update_ui(model) {
	            if (!this.__rendered) return this;
	            var ui = this.ui;
	            ui.name.textContent = model.get('name');
	            ui.mime.textContent = model.get('mime');
	            ui.size.textContent = orange_1.humanFileSize(model.get('size'));
	            ui.download.textContent = model.get('name');
	            var url = this.client.endpoint + model.fullPath + '?download=true';
	            ui.download.setAttribute('href', url);
	            this.el.style.opacity = "1";
	        }
	    }]);

	    return FileInfoView;
	}(views_1.View);
	FileInfoView = __decorate([views_1.attributes({
	    className: 'file-info',
	    template: function template() {
	        return index_1.default['file-info'];
	    },
	    ui: {
	        name: '.name',
	        mime: '.mimetype',
	        size: '.size',
	        download: '.download a'
	    }
	}), __metadata('design:paramtypes', [Object])], FileInfoView);
	exports.FileInfoView = FileInfoView;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var views_1 = __webpack_require__(61);
	var orange_dom_1 = __webpack_require__(70);
	var DropZone = function (_views_1$View) {
	    _inherits(DropZone, _views_1$View);

	    function DropZone() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, DropZone);

	        return _possibleConstructorReturn(this, (DropZone.__proto__ || Object.getPrototypeOf(DropZone)).call(this, options));
	    }

	    _createClass(DropZone, [{
	        key: "_onDragEnter",
	        value: function _onDragEnter(e) {
	            orange_dom_1.addClass(this.el, 'drag-enter');
	            e.preventDefault();
	            e.stopPropagation();
	        }
	    }, {
	        key: "_onDragEnd",
	        value: function _onDragEnd(e) {
	            orange_dom_1.removeClass(this.el, 'drag-enter');
	            e.preventDefault();
	            e.stopPropagation();
	        }
	    }, {
	        key: "_onDrop",
	        value: function _onDrop(e) {
	            orange_dom_1.removeClass(this.el, 'drag-enter');
	            console.log('drop', e.dataTransfer.files);
	            e.preventDefault();
	            e.stopPropagation();
	            this.triggerMethod('drop', e.dataTransfer.files[0]);
	        }
	    }]);

	    return DropZone;
	}(views_1.View);
	DropZone = __decorate([views_1.events({
	    dragenter: '_onDragEnter',
	    dragleave: '_onDragEnd',
	    dragstart: '_onDragEnter',
	    drop: '_onDrop',
	    drag: '_onDragEnter',
	    dragover: '_onDragEnter'
	}), __metadata('design:paramtypes', [Object])], DropZone);
	exports.DropZone = DropZone;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(93));
	__export(__webpack_require__(96));
	__export(__webpack_require__(94));

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var views_1 = __webpack_require__(61);
	var types_1 = __webpack_require__(94);
	var utils_1 = __webpack_require__(95);
	var CropPreView = function (_views_1$View) {
	    _inherits(CropPreView, _views_1$View);

	    function CropPreView() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, CropPreView);

	        var _this = _possibleConstructorReturn(this, (CropPreView.__proto__ || Object.getPrototypeOf(CropPreView)).call(this, options));

	        _this.options = options;
	        return _this;
	    }

	    _createClass(CropPreView, [{
	        key: "render",
	        value: function render() {
	            this.triggerMethod('before:render');
	            this.undelegateEvents();
	            var image = this.el.querySelector('img');
	            if (image == null) {
	                image = document.createElement('img');
	                this.el.appendChild(image);
	            }
	            this.delegateEvents();
	            this.triggerMethod('render');
	            if (image.src !== '') {
	                this.update();
	            }
	            return this;
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            var _this2 = this;

	            this.triggerMethod('before:update');
	            var img = this.ui['image'];
	            return utils_1.getImageSize(img).then(function (size) {
	                if (_this2.ui['image'] == null) return _this2;
	                var el = _this2.el;
	                if (_this2._cropping == null) {
	                    if (_this2.options.aspectRatio == null) {
	                        return _this2;
	                    }
	                    _this2._cropping = types_1.getCropping(size, _this2.options.aspectRatio);
	                }
	                var cropping = _this2._cropping;
	                var cw = el.clientWidth,
	                    ch = el.clientHeight,
	                    rx = cw / cropping.width,
	                    ry = ch / cropping.height;
	                var width = size.width,
	                    height = size.height;
	                var e = {
	                    width: Math.round(rx * width) + 'px',
	                    height: Math.round(ry * height) + 'px',
	                    marginLeft: '-' + Math.round(rx * cropping.x) + 'px',
	                    marginTop: '-' + Math.round(ry * cropping.y) + 'px'
	                };
	                for (var key in e) {
	                    img.style[key] = e[key];
	                }
	                _this2.triggerMethod('update');
	            });
	        }
	    }, {
	        key: "cropping",
	        set: function set(cropping) {
	            this._cropping = cropping;
	            this.update();
	        },
	        get: function get() {
	            return this._cropping;
	        }
	    }]);

	    return CropPreView;
	}(views_1.View);
	CropPreView = __decorate([views_1.attributes({
	    className: 'torsten cropping-preview',
	    ui: {
	        image: 'img'
	    }
	}), __metadata('design:paramtypes', [Object])], CropPreView);
	exports.CropPreView = CropPreView;

/***/ },
/* 94 */
/***/ function(module, exports) {

	"use strict";

	function getCropping(size, ratio) {
	    var width = size.width,
	        height = size.height;
	    var nh = height,
	        nw = width;
	    if (width > height) {
	        nh = width / ratio;
	    } else {
	        nw = height * ratio;
	    }
	    return {
	        x: 0,
	        y: 0,
	        width: nw,
	        height: nh,
	        rotate: 0,
	        scaleX: 1,
	        scaleY: 1
	    };
	}
	exports.getCropping = getCropping;

/***/ },
/* 95 */
/***/ function(module, exports) {

	"use strict";

	function getImageSize(image) {
	    var load = function load() {
	        return new Promise(function (resolve, reject) {
	            var i = new Image();
	            i.onload = function () {
	                resolve({
	                    width: i.naturalWidth || i.width,
	                    height: i.naturalHeight || i.height
	                });
	            };
	            i.onerror = reject;
	            i.src = image.src;
	        });
	    };
	    if (image.naturalHeight === undefined) {
	        return load();
	    } else if (image.naturalHeight === 0) {
	        return new Promise(function (resolve, reject) {
	            var time = setTimeout(function () {
	                time = null;
	                load().then(resolve, reject);
	            }, 200);
	            image.onload = function () {
	                if (time !== null) {
	                    clearTimeout(time);
	                }
	                resolve({
	                    width: image.naturalWidth,
	                    height: image.naturalHeight
	                });
	            };
	        });
	    } else {
	        return Promise.resolve({
	            width: image.naturalWidth,
	            height: image.naturalHeight
	        });
	    }
	}
	exports.getImageSize = getImageSize;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var views_1 = __webpack_require__(61);
	var cropperjs_1 = __webpack_require__(97);
	var types_1 = __webpack_require__(94);
	var utils_1 = __webpack_require__(95);
	var orange_dom_1 = __webpack_require__(70);
	var orange_1 = __webpack_require__(20);
	var emptyImage = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
	function isFunction(a) {
	    return typeof a === 'function';
	}
	var CropView = function (_views_1$View) {
	    _inherits(CropView, _views_1$View);

	    function CropView() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? { resize: false } : arguments[0];

	        _classCallCheck(this, CropView);

	        var _this = _possibleConstructorReturn(this, (CropView.__proto__ || Object.getPrototypeOf(CropView)).call(this, options));

	        _this.options = options;
	        return _this;
	    }

	    _createClass(CropView, [{
	        key: "setModel",
	        value: function setModel(model) {
	            var _this2 = this;

	            if (this.ui['image'] == null) return this;
	            this.deactivate();
	            var image = this.ui['image'];
	            image.style.display = 'none';
	            if (model == null) {
	                image.src = null;
	                if (this.model) this.stopListening(this.model);
	                this._model = model;
	                return;
	            }
	            _get(CropView.prototype.__proto__ || Object.getPrototypeOf(CropView.prototype), "setModel", this).call(this, model);
	            //image.src = model.getURL();
	            this._updateImage().then(function (loaded) {
	                if (loaded) image.style.display = 'block';
	                return loaded;
	            }).then(function (loaded) {
	                if (!loaded) return;
	                var cropping = model.get('meta.cropping');
	                if (cropping) {
	                    _this2.cropping = cropping;
	                } else if (_this2.options.aspectRatio != null) {
	                    utils_1.getImageSize(image).then(function (size) {
	                        _this2.cropping = types_1.getCropping(size, _this2.options.aspectRatio);
	                        //this.triggerMethod('crop', cropping);
	                    }).catch(function (e) {
	                        _this2.trigger('error', e);
	                    });
	                }
	            });
	            return this;
	        }
	    }, {
	        key: "activate",
	        value: function activate() {
	            var _this3 = this;

	            if (this._cropper != null) {
	                return this;
	            }
	            var o = this.options;
	            var opts = {
	                crop: function crop(e) {
	                    _this3._cropping = e.detail;
	                    _this3.triggerMethod('crop', e.detail);
	                    if (isFunction(o.crop)) o.crop(e);
	                },
	                data: this.cropping,
	                built: function built() {
	                    _this3.triggerMethod('built');
	                    if (isFunction(o.built)) o.built();
	                },
	                cropstart: function cropstart(e) {
	                    _this3.triggerMethod('cropstart');
	                    if (isFunction(o.cropstart)) o.cropstart(e);
	                },
	                cropmove: function cropmove(e) {
	                    _this3.triggerMethod('cropmove', e);
	                    if (isFunction(o.cropmove)) o.cropmove(e);
	                },
	                cropend: function cropend(e) {
	                    _this3.triggerMethod('cropend', e);
	                    if (isFunction(o.cropend)) o.cropend(e);
	                }
	            };
	            opts = orange_1.extend({}, this.options, opts);
	            this._cropper = new cropperjs_1.default(this.ui['image'], opts);
	            return this;
	        }
	    }, {
	        key: "deactivate",
	        value: function deactivate() {
	            if (this._cropper) {
	                this._cropper.destroy();
	                this._cropper = void 0;
	            }
	            return this;
	        }
	    }, {
	        key: "toggle",
	        value: function toggle() {
	            return this._cropper != null ? this.deactivate() : this.activate();
	        }
	    }, {
	        key: "onCrop",
	        value: function onCrop(cropping) {
	            if (this.options.previewView) {
	                this.options.previewView.cropping = cropping;
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            this.triggerMethod('before:render');
	            this.undelegateEvents();
	            var image = this.el.querySelector('img');
	            if (image == null) {
	                image = document.createElement('img');
	                this.el.appendChild(image);
	            }
	            this.delegateEvents();
	            this.triggerMethod('render');
	            return this;
	        }
	    }, {
	        key: "_updateImage",
	        value: function _updateImage() {
	            var _this4 = this;

	            var img = this.el.querySelector('img');
	            if (this.model === null) {
	                img.src = emptyImage;
	                return Promise.resolve(false);
	            }
	            this.triggerMethod('before:image');
	            img.src = this.model.url;
	            return orange_dom_1.imageLoaded(img).then(function (loaded) {
	                _this4.triggerMethod('image', loaded);
	                return loaded;
	            }).catch(function (e) {
	                _this4.triggerMethod('error', new Error('image not loaded'));
	                return Promise.resolve(false);
	            });
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            this.deactivate();
	            _get(CropView.prototype.__proto__ || Object.getPrototypeOf(CropView.prototype), "destroy", this).call(this);
	        }
	    }, {
	        key: "cropper",
	        get: function get() {
	            if (this._cropper != null) return this._cropper;
	            if (this.ui['image'] == null) return null;
	            return this.activate()._cropper;
	        }
	    }, {
	        key: "cropping",
	        get: function get() {
	            return this._cropping;
	        },
	        set: function set(cropping) {
	            this._cropping = cropping;
	            if (this.options.previewView) this.options.previewView.cropping = cropping;
	        }
	    }]);

	    return CropView;
	}(views_1.View);
	CropView = __decorate([views_1.attributes({
	    className: 'torsten cropping-view',
	    ui: {
	        image: 'img'
	    }
	}), __metadata('design:paramtypes', [Object])], CropView);
	exports.CropView = CropView;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';var _typeof2=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};/*!
	 * Cropper.js v0.8.1
	 * https://github.com/fengyuanchen/cropperjs
	 *
	 * Copyright (c) 2015-2016 Fengyuan Chen
	 * Released under the MIT license
	 *
	 * Date: 2016-09-03T04:55:16.458Z
	 */(function webpackUniversalModuleDefinition(root,factory){if(( false?'undefined':_typeof2(exports))==='object'&&( false?'undefined':_typeof2(module))==='object')module.exports=factory();else if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else{var a=factory();for(var i in a){((typeof exports==='undefined'?'undefined':_typeof2(exports))==='object'?exports:root)[i]=a[i];}}})(undefined,function(){return(/******/function(modules){// webpackBootstrap
	/******/// The module cache
	/******/var installedModules={};/******//******/// The require function
	/******/function __webpack_require__(moduleId){/******//******/// Check if module is in cache
	/******/if(installedModules[moduleId])/******/return installedModules[moduleId].exports;/******//******/// Create a new module (and put it into the cache)
	/******/var module=installedModules[moduleId]={/******/exports:{},/******/id:moduleId,/******/loaded:false/******/};/******//******/// Execute the module function
	/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);/******//******/// Flag the module as loaded
	/******/module.loaded=true;/******//******/// Return the exports of the module
	/******/return module.exports;/******/}/******//******//******/// expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m=modules;/******//******/// expose the module cache
	/******/__webpack_require__.c=installedModules;/******//******/// __webpack_public_path__
	/******/__webpack_require__.p="";/******//******/// Load entry module and return exports
	/******/return __webpack_require__(0);/******/}(/************************************************************************//******/[/* 0 *//***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _defaults=__webpack_require__(1);var _defaults2=_interopRequireDefault(_defaults);var _template=__webpack_require__(2);var _template2=_interopRequireDefault(_template);var _render=__webpack_require__(3);var _render2=_interopRequireDefault(_render);var _preview=__webpack_require__(5);var _preview2=_interopRequireDefault(_preview);var _events=__webpack_require__(6);var _events2=_interopRequireDefault(_events);var _handlers=__webpack_require__(7);var _handlers2=_interopRequireDefault(_handlers);var _change=__webpack_require__(8);var _change2=_interopRequireDefault(_change);var _methods=__webpack_require__(9);var _methods2=_interopRequireDefault(_methods);var _utilities=__webpack_require__(4);var $=_interopRequireWildcard(_utilities);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}// Constants
	var NAMESPACE='cropper';// Classes
	var CLASS_HIDDEN=NAMESPACE+'-hidden';// Events
	var EVENT_ERROR='error';var EVENT_LOAD='load';var EVENT_READY='ready';var EVENT_CROP='crop';// RegExps
	var REGEXP_DATA_URL=/^data:/;var REGEXP_DATA_URL_JPEG=/^data:image\/jpeg.*;base64,/;var AnotherCropper=void 0;var Cropper=function(){function Cropper(element,options){_classCallCheck(this,Cropper);var self=this;self.element=element;self.options=$.extend({},_defaults2.default,$.isPlainObject(options)&&options);self.loaded=false;self.ready=false;self.complete=false;self.rotated=false;self.cropped=false;self.disabled=false;self.replaced=false;self.limited=false;self.wheeling=false;self.isImg=false;self.originalUrl='';self.canvasData=null;self.cropBoxData=null;self.previews=null;self.init();}_createClass(Cropper,[{key:'init',value:function init(){var self=this;var element=self.element;var tagName=element.tagName.toLowerCase();var url=void 0;if($.getData(element,NAMESPACE)){return;}$.setData(element,NAMESPACE,self);if(tagName==='img'){self.isImg=true;// e.g.: "img/picture.jpg"
	self.originalUrl=url=element.getAttribute('src');// Stop when it's a blank image
	if(!url){return;}// e.g.: "http://example.com/img/picture.jpg"
	url=element.src;}else if(tagName==='canvas'&&window.HTMLCanvasElement){url=element.toDataURL();}self.load(url);}},{key:'load',value:function load(url){var self=this;var options=self.options;var element=self.element;if(!url){return;}self.url=url;self.imageData={};if(!options.checkOrientation||!window.ArrayBuffer){self.clone();return;}// XMLHttpRequest disallows to open a Data URL in some browsers like IE11 and Safari
	if(REGEXP_DATA_URL.test(url)){if(REGEXP_DATA_URL_JPEG){self.read($.dataURLToArrayBuffer(url));}else{self.clone();}return;}var xhr=new XMLHttpRequest();xhr.onerror=xhr.onabort=function(){self.clone();};xhr.onload=function(){self.read(xhr.response);};if(options.checkCrossOrigin&&$.isCrossOriginURL(url)&&element.crossOrigin){url=$.addTimestamp(url);}xhr.open('get',url);xhr.responseType='arraybuffer';xhr.send();}},{key:'read',value:function read(arrayBuffer){var self=this;var options=self.options;var orientation=$.getOrientation(arrayBuffer);var imageData=self.imageData;var rotate=0;var scaleX=1;var scaleY=1;if(orientation>1){self.url=$.arrayBufferToDataURL(arrayBuffer);switch(orientation){// flip horizontal
	case 2:scaleX=-1;break;// rotate left 180°
	case 3:rotate=-180;break;// flip vertical
	case 4:scaleY=-1;break;// flip vertical + rotate right 90°
	case 5:rotate=90;scaleY=-1;break;// rotate right 90°
	case 6:rotate=90;break;// flip horizontal + rotate right 90°
	case 7:rotate=90;scaleX=-1;break;// rotate left 90°
	case 8:rotate=-90;break;}}if(options.rotatable){imageData.rotate=rotate;}if(options.scalable){imageData.scaleX=scaleX;imageData.scaleY=scaleY;}self.clone();}},{key:'clone',value:function clone(){var self=this;var element=self.element;var url=self.url;var crossOrigin=void 0;var crossOriginUrl=void 0;var start=void 0;var stop=void 0;if(self.options.checkCrossOrigin&&$.isCrossOriginURL(url)){crossOrigin=element.crossOrigin;if(crossOrigin){crossOriginUrl=url;}else{crossOrigin='anonymous';// Bust cache when there is not a "crossOrigin" property
	crossOriginUrl=$.addTimestamp(url);}}self.crossOrigin=crossOrigin;self.crossOriginUrl=crossOriginUrl;var image=$.createElement('img');if(crossOrigin){image.crossOrigin=crossOrigin;}image.src=crossOriginUrl||url;self.image=image;self.onStart=start=$.proxy(self.start,self);self.onStop=stop=$.proxy(self.stop,self);if(self.isImg){if(element.complete){self.start();}else{$.addListener(element,EVENT_LOAD,start);}}else{$.addListener(image,EVENT_LOAD,start);$.addListener(image,EVENT_ERROR,stop);$.addClass(image,'cropper-hide');element.parentNode.insertBefore(image,element.nextSibling);}}},{key:'start',value:function start(event){var self=this;var image=self.isImg?self.element:self.image;if(event){$.removeListener(image,EVENT_LOAD,self.onStart);$.removeListener(image,EVENT_ERROR,self.onStop);}$.getImageSize(image,function(naturalWidth,naturalHeight){$.extend(self.imageData,{naturalWidth:naturalWidth,naturalHeight:naturalHeight,aspectRatio:naturalWidth/naturalHeight});self.loaded=true;self.build();});}},{key:'stop',value:function stop(){var self=this;var image=self.image;$.removeListener(image,EVENT_LOAD,self.onStart);$.removeListener(image,EVENT_ERROR,self.onStop);$.removeChild(image);self.image=null;}},{key:'build',value:function build(){var self=this;var options=self.options;var element=self.element;var image=self.image;var container=void 0;var cropper=void 0;var canvas=void 0;var dragBox=void 0;var cropBox=void 0;var face=void 0;if(!self.loaded){return;}// Unbuild first when replace
	if(self.ready){self.unbuild();}var template=$.createElement('div');template.innerHTML=_template2.default;// Create cropper elements
	self.container=container=element.parentNode;self.cropper=cropper=$.getByClass(template,'cropper-container')[0];self.canvas=canvas=$.getByClass(cropper,'cropper-canvas')[0];self.dragBox=dragBox=$.getByClass(cropper,'cropper-drag-box')[0];self.cropBox=cropBox=$.getByClass(cropper,'cropper-crop-box')[0];self.viewBox=$.getByClass(cropper,'cropper-view-box')[0];self.face=face=$.getByClass(cropBox,'cropper-face')[0];$.appendChild(canvas,image);// Hide the original image
	$.addClass(element,CLASS_HIDDEN);// Inserts the cropper after to the current image
	container.insertBefore(cropper,element.nextSibling);// Show the image if is hidden
	if(!self.isImg){$.removeClass(image,'cropper-hide');}self.initPreview();self.bind();options.aspectRatio=Math.max(0,options.aspectRatio)||NaN;options.viewMode=Math.max(0,Math.min(3,Math.round(options.viewMode)))||0;if(options.autoCrop){self.cropped=true;if(options.modal){$.addClass(dragBox,'cropper-modal');}}else{$.addClass(cropBox,CLASS_HIDDEN);}if(!options.guides){$.addClass($.getByClass(cropBox,'cropper-dashed'),CLASS_HIDDEN);}if(!options.center){$.addClass($.getByClass(cropBox,'cropper-center'),CLASS_HIDDEN);}if(options.background){$.addClass(cropper,'cropper-bg');}if(!options.highlight){$.addClass(face,'cropper-invisible');}if(options.cropBoxMovable){$.addClass(face,'cropper-move');$.setData(face,'action','all');}if(!options.cropBoxResizable){$.addClass($.getByClass(cropBox,'cropper-line'),CLASS_HIDDEN);$.addClass($.getByClass(cropBox,'cropper-point'),CLASS_HIDDEN);}self.setDragMode(options.dragMode);self.render();self.ready=true;self.setData(options.data);// Call the "ready" option asynchronously to keep "image.cropper" is defined
	self.completing=setTimeout(function(){if($.isFunction(options.ready)){$.addListener(element,EVENT_READY,options.ready,true);}$.dispatchEvent(element,EVENT_READY);$.dispatchEvent(element,EVENT_CROP,self.getData());self.complete=true;},0);}},{key:'unbuild',value:function unbuild(){var self=this;if(!self.ready){return;}if(!self.complete){clearTimeout(self.completing);}self.ready=false;self.complete=false;self.initialImageData=null;// Clear `initialCanvasData` is necessary when replace
	self.initialCanvasData=null;self.initialCropBoxData=null;self.containerData=null;self.canvasData=null;// Clear `cropBoxData` is necessary when replace
	self.cropBoxData=null;self.unbind();self.resetPreview();self.previews=null;self.viewBox=null;self.cropBox=null;self.dragBox=null;self.canvas=null;self.container=null;$.removeChild(self.cropper);self.cropper=null;}}],[{key:'noConflict',value:function noConflict(){window.Cropper=AnotherCropper;return Cropper;}},{key:'setDefaults',value:function setDefaults(options){$.extend(_defaults2.default,$.isPlainObject(options)&&options);}}]);return Cropper;}();$.extend(Cropper.prototype,_render2.default);$.extend(Cropper.prototype,_preview2.default);$.extend(Cropper.prototype,_events2.default);$.extend(Cropper.prototype,_handlers2.default);$.extend(Cropper.prototype,_change2.default);$.extend(Cropper.prototype,_methods2.default);if(typeof window!=='undefined'){AnotherCropper=window.Cropper;window.Cropper=Cropper;}exports.default=Cropper;/***/},/* 1 *//***/function(module,exports){'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.default={// Define the view mode of the cropper
	viewMode:0,// 0, 1, 2, 3
	// Define the dragging mode of the cropper
	dragMode:'crop',// 'crop', 'move' or 'none'
	// Define the aspect ratio of the crop box
	aspectRatio:NaN,// An object with the previous cropping result data
	data:null,// A selector for adding extra containers to preview
	preview:'',// Re-render the cropper when resize the window
	responsive:true,// Restore the cropped area after resize the window
	restore:true,// Check if the current image is a cross-origin image
	checkCrossOrigin:true,// Check the current image's Exif Orientation information
	checkOrientation:true,// Show the black modal
	modal:true,// Show the dashed lines for guiding
	guides:true,// Show the center indicator for guiding
	center:true,// Show the white modal to highlight the crop box
	highlight:true,// Show the grid background
	background:true,// Enable to crop the image automatically when initialize
	autoCrop:true,// Define the percentage of automatic cropping area when initializes
	autoCropArea:0.8,// Enable to move the image
	movable:true,// Enable to rotate the image
	rotatable:true,// Enable to scale the image
	scalable:true,// Enable to zoom the image
	zoomable:true,// Enable to zoom the image by dragging touch
	zoomOnTouch:true,// Enable to zoom the image by wheeling mouse
	zoomOnWheel:true,// Define zoom ratio when zoom the image by wheeling mouse
	wheelZoomRatio:0.1,// Enable to move the crop box
	cropBoxMovable:true,// Enable to resize the crop box
	cropBoxResizable:true,// Toggle drag mode between "crop" and "move" when click twice on the cropper
	toggleDragModeOnDblclick:true,// Size limitation
	minCanvasWidth:0,minCanvasHeight:0,minCropBoxWidth:0,minCropBoxHeight:0,minContainerWidth:200,minContainerHeight:100,// Shortcuts of events
	ready:null,cropstart:null,cropmove:null,cropend:null,crop:null,zoom:null};/***/},/* 2 *//***/function(module,exports){'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.default='<div class="cropper-container">'+'<div class="cropper-wrap-box">'+'<div class="cropper-canvas"></div>'+'</div>'+'<div class="cropper-drag-box"></div>'+'<div class="cropper-crop-box">'+'<span class="cropper-view-box"></span>'+'<span class="cropper-dashed dashed-h"></span>'+'<span class="cropper-dashed dashed-v"></span>'+'<span class="cropper-center"></span>'+'<span class="cropper-face"></span>'+'<span class="cropper-line line-e" data-action="e"></span>'+'<span class="cropper-line line-n" data-action="n"></span>'+'<span class="cropper-line line-w" data-action="w"></span>'+'<span class="cropper-line line-s" data-action="s"></span>'+'<span class="cropper-point point-e" data-action="e"></span>'+'<span class="cropper-point point-n" data-action="n"></span>'+'<span class="cropper-point point-w" data-action="w"></span>'+'<span class="cropper-point point-s" data-action="s"></span>'+'<span class="cropper-point point-ne" data-action="ne"></span>'+'<span class="cropper-point point-nw" data-action="nw"></span>'+'<span class="cropper-point point-sw" data-action="sw"></span>'+'<span class="cropper-point point-se" data-action="se"></span>'+'</div>'+'</div>';/***/},/* 3 *//***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _utilities=__webpack_require__(4);var $=_interopRequireWildcard(_utilities);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}exports.default={render:function render(){var self=this;self.initContainer();self.initCanvas();self.initCropBox();self.renderCanvas();if(self.cropped){self.renderCropBox();}},initContainer:function initContainer(){var self=this;var options=self.options;var element=self.element;var container=self.container;var cropper=self.cropper;var containerData=void 0;$.addClass(cropper,'cropper-hidden');$.removeClass(element,'cropper-hidden');self.containerData=containerData={width:Math.max(container.offsetWidth,Number(options.minContainerWidth)||200),height:Math.max(container.offsetHeight,Number(options.minContainerHeight)||100)};$.setStyle(cropper,{width:containerData.width,height:containerData.height});$.addClass(element,'cropper-hidden');$.removeClass(cropper,'cropper-hidden');},// Canvas (image wrapper)
	initCanvas:function initCanvas(){var self=this;var viewMode=self.options.viewMode;var containerData=self.containerData;var imageData=self.imageData;var rotated=Math.abs(imageData.rotate)===90;var naturalWidth=rotated?imageData.naturalHeight:imageData.naturalWidth;var naturalHeight=rotated?imageData.naturalWidth:imageData.naturalHeight;var aspectRatio=naturalWidth/naturalHeight;var canvasWidth=containerData.width;var canvasHeight=containerData.height;if(containerData.height*aspectRatio>containerData.width){if(viewMode===3){canvasWidth=containerData.height*aspectRatio;}else{canvasHeight=containerData.width/aspectRatio;}}else if(viewMode===3){canvasHeight=containerData.width/aspectRatio;}else{canvasWidth=containerData.height*aspectRatio;}var canvasData={naturalWidth:naturalWidth,naturalHeight:naturalHeight,aspectRatio:aspectRatio,width:canvasWidth,height:canvasHeight};canvasData.oldLeft=canvasData.left=(containerData.width-canvasWidth)/2;canvasData.oldTop=canvasData.top=(containerData.height-canvasHeight)/2;self.canvasData=canvasData;self.limited=viewMode===1||viewMode===2;self.limitCanvas(true,true);self.initialImageData=$.extend({},imageData);self.initialCanvasData=$.extend({},canvasData);},limitCanvas:function limitCanvas(sizeLimited,positionLimited){var self=this;var options=self.options;var viewMode=options.viewMode;var containerData=self.containerData;var canvasData=self.canvasData;var aspectRatio=canvasData.aspectRatio;var cropBoxData=self.cropBoxData;var cropped=self.cropped&&cropBoxData;var minCanvasWidth=void 0;var minCanvasHeight=void 0;var newCanvasLeft=void 0;var newCanvasTop=void 0;if(sizeLimited){minCanvasWidth=Number(options.minCanvasWidth)||0;minCanvasHeight=Number(options.minCanvasHeight)||0;if(viewMode>1){minCanvasWidth=Math.max(minCanvasWidth,containerData.width);minCanvasHeight=Math.max(minCanvasHeight,containerData.height);if(viewMode===3){if(minCanvasHeight*aspectRatio>minCanvasWidth){minCanvasWidth=minCanvasHeight*aspectRatio;}else{minCanvasHeight=minCanvasWidth/aspectRatio;}}}else if(viewMode>0){if(minCanvasWidth){minCanvasWidth=Math.max(minCanvasWidth,cropped?cropBoxData.width:0);}else if(minCanvasHeight){minCanvasHeight=Math.max(minCanvasHeight,cropped?cropBoxData.height:0);}else if(cropped){minCanvasWidth=cropBoxData.width;minCanvasHeight=cropBoxData.height;if(minCanvasHeight*aspectRatio>minCanvasWidth){minCanvasWidth=minCanvasHeight*aspectRatio;}else{minCanvasHeight=minCanvasWidth/aspectRatio;}}}if(minCanvasWidth&&minCanvasHeight){if(minCanvasHeight*aspectRatio>minCanvasWidth){minCanvasHeight=minCanvasWidth/aspectRatio;}else{minCanvasWidth=minCanvasHeight*aspectRatio;}}else if(minCanvasWidth){minCanvasHeight=minCanvasWidth/aspectRatio;}else if(minCanvasHeight){minCanvasWidth=minCanvasHeight*aspectRatio;}canvasData.minWidth=minCanvasWidth;canvasData.minHeight=minCanvasHeight;canvasData.maxWidth=Infinity;canvasData.maxHeight=Infinity;}if(positionLimited){if(viewMode){newCanvasLeft=containerData.width-canvasData.width;newCanvasTop=containerData.height-canvasData.height;canvasData.minLeft=Math.min(0,newCanvasLeft);canvasData.minTop=Math.min(0,newCanvasTop);canvasData.maxLeft=Math.max(0,newCanvasLeft);canvasData.maxTop=Math.max(0,newCanvasTop);if(cropped&&self.limited){canvasData.minLeft=Math.min(cropBoxData.left,cropBoxData.left+(cropBoxData.width-canvasData.width));canvasData.minTop=Math.min(cropBoxData.top,cropBoxData.top+(cropBoxData.height-canvasData.height));canvasData.maxLeft=cropBoxData.left;canvasData.maxTop=cropBoxData.top;if(viewMode===2){if(canvasData.width>=containerData.width){canvasData.minLeft=Math.min(0,newCanvasLeft);canvasData.maxLeft=Math.max(0,newCanvasLeft);}if(canvasData.height>=containerData.height){canvasData.minTop=Math.min(0,newCanvasTop);canvasData.maxTop=Math.max(0,newCanvasTop);}}}}else{canvasData.minLeft=-canvasData.width;canvasData.minTop=-canvasData.height;canvasData.maxLeft=containerData.width;canvasData.maxTop=containerData.height;}}},renderCanvas:function renderCanvas(changed){var self=this;var canvasData=self.canvasData;var imageData=self.imageData;var rotate=imageData.rotate;var aspectRatio=void 0;var rotatedData=void 0;if(self.rotated){self.rotated=false;// Computes rotated sizes with image sizes
	rotatedData=$.getRotatedSizes({width:imageData.width,height:imageData.height,degree:rotate});aspectRatio=rotatedData.width/rotatedData.height;if(aspectRatio!==canvasData.aspectRatio){canvasData.left-=(rotatedData.width-canvasData.width)/2;canvasData.top-=(rotatedData.height-canvasData.height)/2;canvasData.width=rotatedData.width;canvasData.height=rotatedData.height;canvasData.aspectRatio=aspectRatio;canvasData.naturalWidth=imageData.naturalWidth;canvasData.naturalHeight=imageData.naturalHeight;// Computes rotated sizes with natural image sizes
	if(rotate%180){rotatedData=$.getRotatedSizes({width:imageData.naturalWidth,height:imageData.naturalHeight,degree:rotate});canvasData.naturalWidth=rotatedData.width;canvasData.naturalHeight=rotatedData.height;}self.limitCanvas(true,false);}}if(canvasData.width>canvasData.maxWidth||canvasData.width<canvasData.minWidth){canvasData.left=canvasData.oldLeft;}if(canvasData.height>canvasData.maxHeight||canvasData.height<canvasData.minHeight){canvasData.top=canvasData.oldTop;}canvasData.width=Math.min(Math.max(canvasData.width,canvasData.minWidth),canvasData.maxWidth);canvasData.height=Math.min(Math.max(canvasData.height,canvasData.minHeight),canvasData.maxHeight);self.limitCanvas(false,true);canvasData.oldLeft=canvasData.left=Math.min(Math.max(canvasData.left,canvasData.minLeft),canvasData.maxLeft);canvasData.oldTop=canvasData.top=Math.min(Math.max(canvasData.top,canvasData.minTop),canvasData.maxTop);$.setStyle(self.canvas,{width:canvasData.width,height:canvasData.height,left:canvasData.left,top:canvasData.top});self.renderImage();if(self.cropped&&self.limited){self.limitCropBox(true,true);}if(changed){self.output();}},renderImage:function renderImage(changed){var self=this;var canvasData=self.canvasData;var imageData=self.imageData;var newImageData=void 0;var reversedData=void 0;var reversedWidth=void 0;var reversedHeight=void 0;if(imageData.rotate){reversedData=$.getRotatedSizes({width:canvasData.width,height:canvasData.height,degree:imageData.rotate,aspectRatio:imageData.aspectRatio},true);reversedWidth=reversedData.width;reversedHeight=reversedData.height;newImageData={width:reversedWidth,height:reversedHeight,left:(canvasData.width-reversedWidth)/2,top:(canvasData.height-reversedHeight)/2};}$.extend(imageData,newImageData||{width:canvasData.width,height:canvasData.height,left:0,top:0});var transform=$.getTransform(imageData);$.setStyle(self.image,{width:imageData.width,height:imageData.height,marginLeft:imageData.left,marginTop:imageData.top,WebkitTransform:transform,msTransform:transform,transform:transform});if(changed){self.output();}},initCropBox:function initCropBox(){var self=this;var options=self.options;var aspectRatio=options.aspectRatio;var autoCropArea=Number(options.autoCropArea)||0.8;var canvasData=self.canvasData;var cropBoxData={width:canvasData.width,height:canvasData.height};if(aspectRatio){if(canvasData.height*aspectRatio>canvasData.width){cropBoxData.height=cropBoxData.width/aspectRatio;}else{cropBoxData.width=cropBoxData.height*aspectRatio;}}self.cropBoxData=cropBoxData;self.limitCropBox(true,true);// Initialize auto crop area
	cropBoxData.width=Math.min(Math.max(cropBoxData.width,cropBoxData.minWidth),cropBoxData.maxWidth);cropBoxData.height=Math.min(Math.max(cropBoxData.height,cropBoxData.minHeight),cropBoxData.maxHeight);// The width/height of auto crop area must large than "minWidth/Height"
	cropBoxData.width=Math.max(cropBoxData.minWidth,cropBoxData.width*autoCropArea);cropBoxData.height=Math.max(cropBoxData.minHeight,cropBoxData.height*autoCropArea);cropBoxData.oldLeft=cropBoxData.left=canvasData.left+(canvasData.width-cropBoxData.width)/2;cropBoxData.oldTop=cropBoxData.top=canvasData.top+(canvasData.height-cropBoxData.height)/2;self.initialCropBoxData=$.extend({},cropBoxData);},limitCropBox:function limitCropBox(sizeLimited,positionLimited){var self=this;var options=self.options;var aspectRatio=options.aspectRatio;var containerData=self.containerData;var canvasData=self.canvasData;var cropBoxData=self.cropBoxData;var limited=self.limited;var minCropBoxWidth=void 0;var minCropBoxHeight=void 0;var maxCropBoxWidth=void 0;var maxCropBoxHeight=void 0;if(sizeLimited){minCropBoxWidth=Number(options.minCropBoxWidth)||0;minCropBoxHeight=Number(options.minCropBoxHeight)||0;// The min/maxCropBoxWidth/Height must be less than containerWidth/Height
	minCropBoxWidth=Math.min(minCropBoxWidth,containerData.width);minCropBoxHeight=Math.min(minCropBoxHeight,containerData.height);maxCropBoxWidth=Math.min(containerData.width,limited?canvasData.width:containerData.width);maxCropBoxHeight=Math.min(containerData.height,limited?canvasData.height:containerData.height);if(aspectRatio){if(minCropBoxWidth&&minCropBoxHeight){if(minCropBoxHeight*aspectRatio>minCropBoxWidth){minCropBoxHeight=minCropBoxWidth/aspectRatio;}else{minCropBoxWidth=minCropBoxHeight*aspectRatio;}}else if(minCropBoxWidth){minCropBoxHeight=minCropBoxWidth/aspectRatio;}else if(minCropBoxHeight){minCropBoxWidth=minCropBoxHeight*aspectRatio;}if(maxCropBoxHeight*aspectRatio>maxCropBoxWidth){maxCropBoxHeight=maxCropBoxWidth/aspectRatio;}else{maxCropBoxWidth=maxCropBoxHeight*aspectRatio;}}// The minWidth/Height must be less than maxWidth/Height
	cropBoxData.minWidth=Math.min(minCropBoxWidth,maxCropBoxWidth);cropBoxData.minHeight=Math.min(minCropBoxHeight,maxCropBoxHeight);cropBoxData.maxWidth=maxCropBoxWidth;cropBoxData.maxHeight=maxCropBoxHeight;}if(positionLimited){if(limited){cropBoxData.minLeft=Math.max(0,canvasData.left);cropBoxData.minTop=Math.max(0,canvasData.top);cropBoxData.maxLeft=Math.min(containerData.width,canvasData.left+canvasData.width)-cropBoxData.width;cropBoxData.maxTop=Math.min(containerData.height,canvasData.top+canvasData.height)-cropBoxData.height;}else{cropBoxData.minLeft=0;cropBoxData.minTop=0;cropBoxData.maxLeft=containerData.width-cropBoxData.width;cropBoxData.maxTop=containerData.height-cropBoxData.height;}}},renderCropBox:function renderCropBox(){var self=this;var options=self.options;var containerData=self.containerData;var cropBoxData=self.cropBoxData;if(cropBoxData.width>cropBoxData.maxWidth||cropBoxData.width<cropBoxData.minWidth){cropBoxData.left=cropBoxData.oldLeft;}if(cropBoxData.height>cropBoxData.maxHeight||cropBoxData.height<cropBoxData.minHeight){cropBoxData.top=cropBoxData.oldTop;}cropBoxData.width=Math.min(Math.max(cropBoxData.width,cropBoxData.minWidth),cropBoxData.maxWidth);cropBoxData.height=Math.min(Math.max(cropBoxData.height,cropBoxData.minHeight),cropBoxData.maxHeight);self.limitCropBox(false,true);cropBoxData.oldLeft=cropBoxData.left=Math.min(Math.max(cropBoxData.left,cropBoxData.minLeft),cropBoxData.maxLeft);cropBoxData.oldTop=cropBoxData.top=Math.min(Math.max(cropBoxData.top,cropBoxData.minTop),cropBoxData.maxTop);if(options.movable&&options.cropBoxMovable){// Turn to move the canvas when the crop box is equal to the container
	$.setData(self.face,'action',cropBoxData.width===containerData.width&&cropBoxData.height===containerData.height?'move':'all');}$.setStyle(self.cropBox,{width:cropBoxData.width,height:cropBoxData.height,left:cropBoxData.left,top:cropBoxData.top});if(self.cropped&&self.limited){self.limitCanvas(true,true);}if(!self.disabled){self.output();}},output:function output(){var self=this;self.preview();if(self.complete){$.dispatchEvent(self.element,'crop',self.getData());}}};/***/},/* 4 *//***/function(module,exports){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _typeof=typeof Symbol==="function"&&_typeof2(Symbol.iterator)==="symbol"?function(obj){return typeof obj==='undefined'?'undefined':_typeof2(obj);}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj==='undefined'?'undefined':_typeof2(obj);};exports.typeOf=typeOf;exports.isNumber=isNumber;exports.isUndefined=isUndefined;exports.isObject=isObject;exports.isPlainObject=isPlainObject;exports.isFunction=isFunction;exports.isArray=isArray;exports.toArray=toArray;exports.trim=trim;exports.each=each;exports.extend=extend;exports.proxy=proxy;exports.setStyle=setStyle;exports.hasClass=hasClass;exports.addClass=addClass;exports.removeClass=removeClass;exports.toggleClass=toggleClass;exports.hyphenate=hyphenate;exports.getData=getData;exports.setData=setData;exports.removeData=removeData;exports.removeListener=removeListener;exports.dispatchEvent=dispatchEvent;exports.getEvent=getEvent;exports.getOffset=getOffset;exports.getTouchesCenter=getTouchesCenter;exports.getByTag=getByTag;exports.getByClass=getByClass;exports.createElement=createElement;exports.appendChild=appendChild;exports.removeChild=removeChild;exports.empty=empty;exports.isCrossOriginURL=isCrossOriginURL;exports.addTimestamp=addTimestamp;exports.getImageSize=getImageSize;exports.getTransform=getTransform;exports.getRotatedSizes=getRotatedSizes;exports.getSourceCanvas=getSourceCanvas;exports.getStringFromCharCode=getStringFromCharCode;exports.getOrientation=getOrientation;exports.dataURLToArrayBuffer=dataURLToArrayBuffer;exports.arrayBufferToDataURL=arrayBufferToDataURL;// RegExps
	var REGEXP_DATA_URL_HEAD=/^data:([^;]+);base64,/;var REGEXP_HYPHENATE=/([a-z\d])([A-Z])/g;var REGEXP_ORIGINS=/^(https?:)\/\/([^:\/\?#]+):?(\d*)/i;var REGEXP_SPACES=/\s+/;var REGEXP_SUFFIX=/^(width|height|left|top|marginLeft|marginTop)$/;var REGEXP_TRIM=/^\s+(.*)\s+$/;var REGEXP_USERAGENT=/(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i;var navigator=window.navigator;var IS_SAFARI_OR_UIWEBVIEW=navigator&&REGEXP_USERAGENT.test(navigator.userAgent);// Utilities
	var objectProto=Object.prototype;var toString=objectProto.toString;var hasOwnProperty=objectProto.hasOwnProperty;var slice=Array.prototype.slice;var fromCharCode=String.fromCharCode;function typeOf(obj){return toString.call(obj).slice(8,-1).toLowerCase();}function isNumber(num){return typeof num==='number'&&!isNaN(num);}function isUndefined(obj){return typeof obj==='undefined';}function isObject(obj){return(typeof obj==='undefined'?'undefined':_typeof(obj))==='object'&&obj!==null;}function isPlainObject(obj){if(!isObject(obj)){return false;}try{var _constructor=obj.constructor;var prototype=_constructor.prototype;return _constructor&&prototype&&hasOwnProperty.call(prototype,'isPrototypeOf');}catch(e){return false;}}function isFunction(fn){return typeOf(fn)==='function';}function isArray(arr){return Array.isArray?Array.isArray(arr):typeOf(arr)==='array';}function toArray(obj,offset){offset=offset>=0?offset:0;if(Array.from){return Array.from(obj).slice(offset);}return slice.call(obj,offset);}function trim(str){if(typeof str==='string'){str=str.trim?str.trim():str.replace(REGEXP_TRIM,'$1');}return str;}function each(obj,callback){if(obj&&isFunction(callback)){var i=void 0;if(isArray(obj)||isNumber(obj.length)/* array-like */){var length=obj.length;for(i=0;i<length;i++){if(callback.call(obj,obj[i],i,obj)===false){break;}}}else if(isObject(obj)){Object.keys(obj).forEach(function(key){callback.call(obj,obj[key],key,obj);});}}return obj;}function extend(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}var deep=args[0]===true;var data=deep?args[1]:args[0];if(args.length>1){// if (Object.assign) {
	//   return Object.assign.apply(Object, args);
	// }
	args.shift();args.forEach(function(arg){if(isObject(arg)){Object.keys(arg).forEach(function(key){if(deep&&isObject(data[key])){extend(true,data[key],arg[key]);}else{data[key]=arg[key];}});}});}return data;}function proxy(fn,context){for(var _len2=arguments.length,args=Array(_len2>2?_len2-2:0),_key2=2;_key2<_len2;_key2++){args[_key2-2]=arguments[_key2];}return function(){for(var _len3=arguments.length,args2=Array(_len3),_key3=0;_key3<_len3;_key3++){args2[_key3]=arguments[_key3];}return fn.apply(context,args.concat(args2));};}function setStyle(element,styles){var style=element.style;each(styles,function(value,property){if(REGEXP_SUFFIX.test(property)&&isNumber(value)){value+='px';}style[property]=value;});}function hasClass(element,value){return element.classList?element.classList.contains(value):element.className.indexOf(value)>-1;}function addClass(element,value){if(isNumber(element.length)){each(element,function(elem){addClass(elem,value);});return;}if(element.classList){element.classList.add(value);return;}var className=trim(element.className);if(!className){element.className=value;}else if(className.indexOf(value)<0){element.className=className+' '+value;}}function removeClass(element,value){if(isNumber(element.length)){each(element,function(elem){removeClass(elem,value);});return;}if(element.classList){element.classList.remove(value);return;}if(element.className.indexOf(value)>=0){element.className=element.className.replace(value,'');}}function toggleClass(element,value,added){if(isNumber(element.length)){each(element,function(elem){toggleClass(elem,value,added);});return;}// IE10-11 doesn't support the second parameter of `classList.toggle`
	if(added){addClass(element,value);}else{removeClass(element,value);}}function hyphenate(str){return str.replace(REGEXP_HYPHENATE,'$1-$2').toLowerCase();}function getData(element,name){if(isObject(element[name])){return element[name];}else if(element.dataset){return element.dataset[name];}return element.getAttribute('data-'+hyphenate(name));}function setData(element,name,data){if(isObject(data)){element[name]=data;}else if(element.dataset){element.dataset[name]=data;}else{element.setAttribute('data-'+hyphenate(name),data);}}function removeData(element,name){if(isObject(element[name])){delete element[name];}else if(element.dataset){delete element.dataset[name];}else{element.removeAttribute('data-'+hyphenate(name));}}function removeListener(element,type,handler){var types=trim(type).split(REGEXP_SPACES);if(types.length>1){each(types,function(t){removeListener(element,t,handler);});return;}if(element.removeEventListener){element.removeEventListener(type,handler,false);}else if(element.detachEvent){element.detachEvent('on'+type,handler);}}function addListener(element,type,_handler,once){var types=trim(type).split(REGEXP_SPACES);var originalHandler=_handler;if(types.length>1){each(types,function(t){addListener(element,t,_handler);});return;}if(once){_handler=function handler(){for(var _len4=arguments.length,args=Array(_len4),_key4=0;_key4<_len4;_key4++){args[_key4]=arguments[_key4];}removeListener(element,type,_handler);return originalHandler.apply(element,args);};}if(element.addEventListener){element.addEventListener(type,_handler,false);}else if(element.attachEvent){element.attachEvent('on${type}',_handler);}}exports.addListener=addListener;function dispatchEvent(element,type,data){if(element.dispatchEvent){var event=void 0;// Event and CustomEvent on IE9-11 are global objects, not constructors
	if(isFunction(Event)&&isFunction(CustomEvent)){if(isUndefined(data)){event=new Event(type,{bubbles:true,cancelable:true});}else{event=new CustomEvent(type,{detail:data,bubbles:true,cancelable:true});}}else if(isUndefined(data)){event=document.createEvent('Event');event.initEvent(type,true,true);}else{event=document.createEvent('CustomEvent');event.initCustomEvent(type,true,true,data);}// IE9+
	return element.dispatchEvent(event);}else if(element.fireEvent){// IE6-10 (native events only)
	return element.fireEvent('on'+type);}return true;}function getEvent(event){var e=event||window.event;// Fix target property (IE8)
	if(!e.target){e.target=e.srcElement||document;}if(!isNumber(e.pageX)&&isNumber(e.clientX)){var eventDoc=event.target.ownerDocument||document;var doc=eventDoc.documentElement;var body=eventDoc.body;e.pageX=e.clientX+((doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0));e.pageY=e.clientY+((doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0));}return e;}function getOffset(element){var doc=document.documentElement;var box=element.getBoundingClientRect();return{left:box.left+((window.scrollX||doc&&doc.scrollLeft||0)-(doc&&doc.clientLeft||0)),top:box.top+((window.scrollY||doc&&doc.scrollTop||0)-(doc&&doc.clientTop||0))};}function getTouchesCenter(touches){var length=touches.length;var pageX=0;var pageY=0;if(length){each(touches,function(touch){pageX+=touch.pageX;pageY+=touch.pageY;});pageX/=length;pageY/=length;}return{pageX:pageX,pageY:pageY};}function getByTag(element,tagName){return element.getElementsByTagName(tagName);}function getByClass(element,className){return element.getElementsByClassName?element.getElementsByClassName(className):element.querySelectorAll('.'+className);}function createElement(tagName){return document.createElement(tagName);}function appendChild(element,elem){element.appendChild(elem);}function removeChild(element){if(element.parentNode){element.parentNode.removeChild(element);}}function empty(element){while(element.firstChild){element.removeChild(element.firstChild);}}function isCrossOriginURL(url){var parts=url.match(REGEXP_ORIGINS);return parts&&(parts[1]!==location.protocol||parts[2]!==location.hostname||parts[3]!==location.port);}function addTimestamp(url){var timestamp='timestamp='+new Date().getTime();return url+(url.indexOf('?')===-1?'?':'&')+timestamp;}function getImageSize(image,callback){// Modern browsers (ignore Safari)
	if(image.naturalWidth&&!IS_SAFARI_OR_UIWEBVIEW){callback(image.naturalWidth,image.naturalHeight);return;}// IE8: Don't use `new Image()` here
	var newImage=createElement('img');newImage.onload=function load(){callback(this.width,this.height);};newImage.src=image.src;}function getTransform(data){var transforms=[];var rotate=data.rotate;var scaleX=data.scaleX;var scaleY=data.scaleY;// Rotate should come first before scale to match orientation transform
	if(isNumber(rotate)&&rotate!==0){transforms.push('rotate('+rotate+'deg)');}if(isNumber(scaleX)&&scaleX!==1){transforms.push('scaleX('+scaleX+')');}if(isNumber(scaleY)&&scaleY!==1){transforms.push('scaleY('+scaleY+')');}return transforms.length?transforms.join(' '):'none';}function getRotatedSizes(data,reversed){var deg=Math.abs(data.degree)%180;var arc=(deg>90?180-deg:deg)*Math.PI/180;var sinArc=Math.sin(arc);var cosArc=Math.cos(arc);var width=data.width;var height=data.height;var aspectRatio=data.aspectRatio;var newWidth=void 0;var newHeight=void 0;if(!reversed){newWidth=width*cosArc+height*sinArc;newHeight=width*sinArc+height*cosArc;}else{newWidth=width/(cosArc+sinArc/aspectRatio);newHeight=newWidth/aspectRatio;}return{width:newWidth,height:newHeight};}function getSourceCanvas(image,data){var canvas=createElement('canvas');var context=canvas.getContext('2d');var dstX=0;var dstY=0;var dstWidth=data.naturalWidth;var dstHeight=data.naturalHeight;var rotate=data.rotate;var scaleX=data.scaleX;var scaleY=data.scaleY;var scalable=isNumber(scaleX)&&isNumber(scaleY)&&(scaleX!==1||scaleY!==1);var rotatable=isNumber(rotate)&&rotate!==0;var advanced=rotatable||scalable;var canvasWidth=dstWidth*Math.abs(scaleX||1);var canvasHeight=dstHeight*Math.abs(scaleY||1);var translateX=void 0;var translateY=void 0;var rotated=void 0;if(scalable){translateX=canvasWidth/2;translateY=canvasHeight/2;}if(rotatable){rotated=getRotatedSizes({width:canvasWidth,height:canvasHeight,degree:rotate});canvasWidth=rotated.width;canvasHeight=rotated.height;translateX=canvasWidth/2;translateY=canvasHeight/2;}canvas.width=canvasWidth;canvas.height=canvasHeight;if(advanced){dstX=-dstWidth/2;dstY=-dstHeight/2;context.save();context.translate(translateX,translateY);}// Rotate should come first before scale as in the "getTransform" function
	if(rotatable){context.rotate(rotate*Math.PI/180);}if(scalable){context.scale(scaleX,scaleY);}context.drawImage(image,Math.floor(dstX),Math.floor(dstY),Math.floor(dstWidth),Math.floor(dstHeight));if(advanced){context.restore();}return canvas;}function getStringFromCharCode(dataView,start,length){var str='';var i=start;for(length+=start;i<length;i++){str+=fromCharCode(dataView.getUint8(i));}return str;}function getOrientation(arrayBuffer){var dataView=new DataView(arrayBuffer);var length=dataView.byteLength;var orientation=void 0;var exifIDCode=void 0;var tiffOffset=void 0;var firstIFDOffset=void 0;var littleEndian=void 0;var endianness=void 0;var app1Start=void 0;var ifdStart=void 0;var offset=void 0;var i=void 0;// Only handle JPEG image (start by 0xFFD8)
	if(dataView.getUint8(0)===0xFF&&dataView.getUint8(1)===0xD8){offset=2;while(offset<length){if(dataView.getUint8(offset)===0xFF&&dataView.getUint8(offset+1)===0xE1){app1Start=offset;break;}offset++;}}if(app1Start){exifIDCode=app1Start+4;tiffOffset=app1Start+10;if(getStringFromCharCode(dataView,exifIDCode,4)==='Exif'){endianness=dataView.getUint16(tiffOffset);littleEndian=endianness===0x4949;if(littleEndian||endianness===0x4D4D/* bigEndian */){if(dataView.getUint16(tiffOffset+2,littleEndian)===0x002A){firstIFDOffset=dataView.getUint32(tiffOffset+4,littleEndian);if(firstIFDOffset>=0x00000008){ifdStart=tiffOffset+firstIFDOffset;}}}}}if(ifdStart){length=dataView.getUint16(ifdStart,littleEndian);for(i=0;i<length;i++){offset=ifdStart+i*12+2;if(dataView.getUint16(offset,littleEndian)===0x0112/* Orientation */){// 8 is the offset of the current tag's value
	offset+=8;// Get the original orientation value
	orientation=dataView.getUint16(offset,littleEndian);// Override the orientation with its default value for Safari
	if(IS_SAFARI_OR_UIWEBVIEW){dataView.setUint16(offset,1,littleEndian);}break;}}}return orientation;}function dataURLToArrayBuffer(dataURL){var base64=dataURL.replace(REGEXP_DATA_URL_HEAD,'');var binary=atob(base64);var length=binary.length;var arrayBuffer=new ArrayBuffer(length);var dataView=new Uint8Array(arrayBuffer);var i=void 0;for(i=0;i<length;i++){dataView[i]=binary.charCodeAt(i);}return arrayBuffer;}// Only available for JPEG image
	function arrayBufferToDataURL(arrayBuffer){var dataView=new Uint8Array(arrayBuffer);var length=dataView.length;var base64='';var i=void 0;for(i=0;i<length;i++){base64+=fromCharCode(dataView[i]);}return'data:image/jpeg;base64,'+btoa(base64);}/***/},/* 5 *//***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _utilities=__webpack_require__(4);var $=_interopRequireWildcard(_utilities);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}var DATA_PREVIEW='preview';exports.default={initPreview:function initPreview(){var self=this;var preview=self.options.preview;var image=$.createElement('img');var crossOrigin=self.crossOrigin;var url=crossOrigin?self.crossOriginUrl:self.url;if(crossOrigin){image.crossOrigin=crossOrigin;}image.src=url;$.appendChild(self.viewBox,image);self.image2=image;if(!preview){return;}var previews=document.querySelectorAll(preview);self.previews=previews;$.each(previews,function(element){var img=$.createElement('img');// Save the original size for recover
	$.setData(element,DATA_PREVIEW,{width:element.offsetWidth,height:element.offsetHeight,html:element.innerHTML});if(crossOrigin){img.crossOrigin=crossOrigin;}img.src=url;/**
		       * Override img element styles
		       * Add `display:block` to avoid margin top issue
		       * Add `height:auto` to override `height` attribute on IE8
		       * (Occur only when margin-top <= -height)
		       */img.style.cssText='display:block;'+'width:100%;'+'height:auto;'+'min-width:0!important;'+'min-height:0!important;'+'max-width:none!important;'+'max-height:none!important;'+'image-orientation:0deg!important;"';$.empty(element);$.appendChild(element,img);});},resetPreview:function resetPreview(){$.each(this.previews,function(element){var data=$.getData(element,DATA_PREVIEW);$.setStyle(element,{width:data.width,height:data.height});element.innerHTML=data.html;$.removeData(element,DATA_PREVIEW);});},preview:function preview(){var self=this;var imageData=self.imageData;var canvasData=self.canvasData;var cropBoxData=self.cropBoxData;var cropBoxWidth=cropBoxData.width;var cropBoxHeight=cropBoxData.height;var width=imageData.width;var height=imageData.height;var left=cropBoxData.left-canvasData.left-imageData.left;var top=cropBoxData.top-canvasData.top-imageData.top;var transform=$.getTransform(imageData);var transforms={WebkitTransform:transform,msTransform:transform,transform:transform};if(!self.cropped||self.disabled){return;}$.setStyle(self.image2,$.extend({width:width,height:height,marginLeft:-left,marginTop:-top},transforms));$.each(self.previews,function(element){var data=$.getData(element,DATA_PREVIEW);var originalWidth=data.width;var originalHeight=data.height;var newWidth=originalWidth;var newHeight=originalHeight;var ratio=1;if(cropBoxWidth){ratio=originalWidth/cropBoxWidth;newHeight=cropBoxHeight*ratio;}if(cropBoxHeight&&newHeight>originalHeight){ratio=originalHeight/cropBoxHeight;newWidth=cropBoxWidth*ratio;newHeight=originalHeight;}$.setStyle(element,{width:newWidth,height:newHeight});$.setStyle($.getByTag(element,'img')[0],$.extend({width:width*ratio,height:height*ratio,marginLeft:-left*ratio,marginTop:-top*ratio},transforms));});}};/***/},/* 6 *//***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _utilities=__webpack_require__(4);var $=_interopRequireWildcard(_utilities);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}// Events
	var EVENT_MOUSE_DOWN='mousedown touchstart pointerdown MSPointerDown';var EVENT_MOUSE_MOVE='mousemove touchmove pointermove MSPointerMove';var EVENT_MOUSE_UP='mouseup touchend touchcancel pointerup pointercancel'+' MSPointerUp MSPointerCancel';var EVENT_WHEEL='wheel mousewheel DOMMouseScroll';var EVENT_DBLCLICK='dblclick';var EVENT_RESIZE='resize';var EVENT_CROP_START='cropstart';var EVENT_CROP_MOVE='cropmove';var EVENT_CROP_END='cropend';var EVENT_CROP='crop';var EVENT_ZOOM='zoom';exports.default={bind:function bind(){var self=this;var options=self.options;var element=self.element;var cropper=self.cropper;if($.isFunction(options.cropstart)){$.addListener(element,EVENT_CROP_START,options.cropstart);}if($.isFunction(options.cropmove)){$.addListener(element,EVENT_CROP_MOVE,options.cropmove);}if($.isFunction(options.cropend)){$.addListener(element,EVENT_CROP_END,options.cropend);}if($.isFunction(options.crop)){$.addListener(element,EVENT_CROP,options.crop);}if($.isFunction(options.zoom)){$.addListener(element,EVENT_ZOOM,options.zoom);}$.addListener(cropper,EVENT_MOUSE_DOWN,self.onCropStart=$.proxy(self.cropStart,self));if(options.zoomable&&options.zoomOnWheel){$.addListener(cropper,EVENT_WHEEL,self.onWheel=$.proxy(self.wheel,self));}if(options.toggleDragModeOnDblclick){$.addListener(cropper,EVENT_DBLCLICK,self.onDblclick=$.proxy(self.dblclick,self));}$.addListener(document,EVENT_MOUSE_MOVE,self.onCropMove=$.proxy(self.cropMove,self));$.addListener(document,EVENT_MOUSE_UP,self.onCropEnd=$.proxy(self.cropEnd,self));if(options.responsive){$.addListener(window,EVENT_RESIZE,self.onResize=$.proxy(self.resize,self));}},unbind:function unbind(){var self=this;var options=self.options;var element=self.element;var cropper=self.cropper;if($.isFunction(options.cropstart)){$.removeListener(element,EVENT_CROP_START,options.cropstart);}if($.isFunction(options.cropmove)){$.removeListener(element,EVENT_CROP_MOVE,options.cropmove);}if($.isFunction(options.cropend)){$.removeListener(element,EVENT_CROP_END,options.cropend);}if($.isFunction(options.crop)){$.removeListener(element,EVENT_CROP,options.crop);}if($.isFunction(options.zoom)){$.removeListener(element,EVENT_ZOOM,options.zoom);}$.removeListener(cropper,EVENT_MOUSE_DOWN,self.onCropStart);if(options.zoomable&&options.zoomOnWheel){$.removeListener(cropper,EVENT_WHEEL,self.onWheel);}if(options.toggleDragModeOnDblclick){$.removeListener(cropper,EVENT_DBLCLICK,self.onDblclick);}$.removeListener(document,EVENT_MOUSE_MOVE,self.onCropMove);$.removeListener(document,EVENT_MOUSE_UP,self.onCropEnd);if(options.responsive){$.removeListener(window,EVENT_RESIZE,self.onResize);}}};/***/},/* 7 *//***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.REGEXP_ACTIONS=undefined;var _utilities=__webpack_require__(4);var $=_interopRequireWildcard(_utilities);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}var REGEXP_ACTIONS=exports.REGEXP_ACTIONS=/^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/;exports.default={resize:function resize(){var self=this;var restore=self.options.restore;var container=self.container;var containerData=self.containerData;// Check `container` is necessary for IE8
	if(self.disabled||!containerData){return;}var ratio=container.offsetWidth/containerData.width;var canvasData=void 0;var cropBoxData=void 0;// Resize when width changed or height changed
	if(ratio!==1||container.offsetHeight!==containerData.height){if(restore){canvasData=self.getCanvasData();cropBoxData=self.getCropBoxData();}self.render();if(restore){self.setCanvasData($.each(canvasData,function(n,i){canvasData[i]=n*ratio;}));self.setCropBoxData($.each(cropBoxData,function(n,i){cropBoxData[i]=n*ratio;}));}}},dblclick:function dblclick(){var self=this;if(self.disabled){return;}self.setDragMode($.hasClass(self.dragBox,'cropper-crop')?'move':'crop');},wheel:function wheel(event){var self=this;var e=$.getEvent(event);var ratio=Number(self.options.wheelZoomRatio)||0.1;var delta=1;if(self.disabled){return;}e.preventDefault();// Limit wheel speed to prevent zoom too fast (#21)
	if(self.wheeling){return;}self.wheeling=true;setTimeout(function(){self.wheeling=false;},50);if(e.deltaY){delta=e.deltaY>0?1:-1;}else if(e.wheelDelta){delta=-e.wheelDelta/120;}else if(e.detail){delta=e.detail>0?1:-1;}self.zoom(-delta*ratio,e);},cropStart:function cropStart(event){var self=this;var options=self.options;var e=$.getEvent(event);var touches=e.touches;var touchesLength=void 0;var touch=void 0;var action=void 0;if(self.disabled){return;}if(touches){touchesLength=touches.length;if(touchesLength>1){if(options.zoomable&&options.zoomOnTouch&&touchesLength===2){touch=touches[1];self.startX2=touch.pageX;self.startY2=touch.pageY;action='zoom';}else{return;}}touch=touches[0];}action=action||$.getData(e.target,'action');if(REGEXP_ACTIONS.test(action)){if($.dispatchEvent(self.element,'cropstart',{originalEvent:e,action:action})===false){return;}e.preventDefault();self.action=action;self.cropping=false;self.startX=touch?touch.pageX:e.pageX;self.startY=touch?touch.pageY:e.pageY;if(action==='crop'){self.cropping=true;$.addClass(self.dragBox,'cropper-modal');}}},cropMove:function cropMove(event){var self=this;var options=self.options;var e=$.getEvent(event);var touches=e.touches;var action=self.action;var touchesLength=void 0;var touch=void 0;if(self.disabled){return;}if(touches){touchesLength=touches.length;if(touchesLength>1){if(options.zoomable&&options.zoomOnTouch&&touchesLength===2){touch=touches[1];self.endX2=touch.pageX;self.endY2=touch.pageY;}else{return;}}touch=touches[0];}if(action){if($.dispatchEvent(self.element,'cropmove',{originalEvent:e,action:action})===false){return;}e.preventDefault();self.endX=touch?touch.pageX:e.pageX;self.endY=touch?touch.pageY:e.pageY;self.change(e.shiftKey,action==='zoom'?e:null);}},cropEnd:function cropEnd(event){var self=this;var options=self.options;var e=$.getEvent(event);var action=self.action;if(self.disabled){return;}if(action){e.preventDefault();if(self.cropping){self.cropping=false;$.toggleClass(self.dragBox,'cropper-modal',self.cropped&&options.modal);}self.action='';$.dispatchEvent(self.element,'cropend',{originalEvent:e,action:action});}}};/***/},/* 8 *//***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _utilities=__webpack_require__(4);var $=_interopRequireWildcard(_utilities);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}// Actions
	var ACTION_EAST='e';var ACTION_WEST='w';var ACTION_SOUTH='s';var ACTION_NORTH='n';var ACTION_SOUTH_EAST='se';var ACTION_SOUTH_WEST='sw';var ACTION_NORTH_EAST='ne';var ACTION_NORTH_WEST='nw';exports.default={change:function change(shiftKey,originalEvent){var self=this;var options=self.options;var containerData=self.containerData;var canvasData=self.canvasData;var cropBoxData=self.cropBoxData;var aspectRatio=options.aspectRatio;var action=self.action;var width=cropBoxData.width;var height=cropBoxData.height;var left=cropBoxData.left;var top=cropBoxData.top;var right=left+width;var bottom=top+height;var minLeft=0;var minTop=0;var maxWidth=containerData.width;var maxHeight=containerData.height;var renderable=true;var offset=void 0;// Locking aspect ratio in "free mode" by holding shift key
	if(!aspectRatio&&shiftKey){aspectRatio=width&&height?width/height:1;}if(self.limited){minLeft=cropBoxData.minLeft;minTop=cropBoxData.minTop;maxWidth=minLeft+Math.min(containerData.width,canvasData.width,canvasData.left+canvasData.width);maxHeight=minTop+Math.min(containerData.height,canvasData.height,canvasData.top+canvasData.height);}var range={x:self.endX-self.startX,y:self.endY-self.startY};if(aspectRatio){range.X=range.y*aspectRatio;range.Y=range.x/aspectRatio;}switch(action){// Move crop box
	case'all':left+=range.x;top+=range.y;break;// Resize crop box
	case ACTION_EAST:if(range.x>=0&&(right>=maxWidth||aspectRatio&&(top<=minTop||bottom>=maxHeight))){renderable=false;break;}width+=range.x;if(aspectRatio){height=width/aspectRatio;top-=range.Y/2;}if(width<0){action=ACTION_WEST;width=0;}break;case ACTION_NORTH:if(range.y<=0&&(top<=minTop||aspectRatio&&(left<=minLeft||right>=maxWidth))){renderable=false;break;}height-=range.y;top+=range.y;if(aspectRatio){width=height*aspectRatio;left+=range.X/2;}if(height<0){action=ACTION_SOUTH;height=0;}break;case ACTION_WEST:if(range.x<=0&&(left<=minLeft||aspectRatio&&(top<=minTop||bottom>=maxHeight))){renderable=false;break;}width-=range.x;left+=range.x;if(aspectRatio){height=width/aspectRatio;top+=range.Y/2;}if(width<0){action=ACTION_EAST;width=0;}break;case ACTION_SOUTH:if(range.y>=0&&(bottom>=maxHeight||aspectRatio&&(left<=minLeft||right>=maxWidth))){renderable=false;break;}height+=range.y;if(aspectRatio){width=height*aspectRatio;left-=range.X/2;}if(height<0){action=ACTION_NORTH;height=0;}break;case ACTION_NORTH_EAST:if(aspectRatio){if(range.y<=0&&(top<=minTop||right>=maxWidth)){renderable=false;break;}height-=range.y;top+=range.y;width=height*aspectRatio;}else{if(range.x>=0){if(right<maxWidth){width+=range.x;}else if(range.y<=0&&top<=minTop){renderable=false;}}else{width+=range.x;}if(range.y<=0){if(top>minTop){height-=range.y;top+=range.y;}}else{height-=range.y;top+=range.y;}}if(width<0&&height<0){action=ACTION_SOUTH_WEST;height=0;width=0;}else if(width<0){action=ACTION_NORTH_WEST;width=0;}else if(height<0){action=ACTION_SOUTH_EAST;height=0;}break;case ACTION_NORTH_WEST:if(aspectRatio){if(range.y<=0&&(top<=minTop||left<=minLeft)){renderable=false;break;}height-=range.y;top+=range.y;width=height*aspectRatio;left+=range.X;}else{if(range.x<=0){if(left>minLeft){width-=range.x;left+=range.x;}else if(range.y<=0&&top<=minTop){renderable=false;}}else{width-=range.x;left+=range.x;}if(range.y<=0){if(top>minTop){height-=range.y;top+=range.y;}}else{height-=range.y;top+=range.y;}}if(width<0&&height<0){action=ACTION_SOUTH_EAST;height=0;width=0;}else if(width<0){action=ACTION_NORTH_EAST;width=0;}else if(height<0){action=ACTION_SOUTH_WEST;height=0;}break;case ACTION_SOUTH_WEST:if(aspectRatio){if(range.x<=0&&(left<=minLeft||bottom>=maxHeight)){renderable=false;break;}width-=range.x;left+=range.x;height=width/aspectRatio;}else{if(range.x<=0){if(left>minLeft){width-=range.x;left+=range.x;}else if(range.y>=0&&bottom>=maxHeight){renderable=false;}}else{width-=range.x;left+=range.x;}if(range.y>=0){if(bottom<maxHeight){height+=range.y;}}else{height+=range.y;}}if(width<0&&height<0){action=ACTION_NORTH_EAST;height=0;width=0;}else if(width<0){action=ACTION_SOUTH_EAST;width=0;}else if(height<0){action=ACTION_NORTH_WEST;height=0;}break;case ACTION_SOUTH_EAST:if(aspectRatio){if(range.x>=0&&(right>=maxWidth||bottom>=maxHeight)){renderable=false;break;}width+=range.x;height=width/aspectRatio;}else{if(range.x>=0){if(right<maxWidth){width+=range.x;}else if(range.y>=0&&bottom>=maxHeight){renderable=false;}}else{width+=range.x;}if(range.y>=0){if(bottom<maxHeight){height+=range.y;}}else{height+=range.y;}}if(width<0&&height<0){action=ACTION_NORTH_WEST;height=0;width=0;}else if(width<0){action=ACTION_SOUTH_WEST;width=0;}else if(height<0){action=ACTION_NORTH_EAST;height=0;}break;// Move canvas
	case'move':self.move(range.x,range.y);renderable=false;break;// Zoom canvas
	case'zoom':self.zoom(function(x1,y1,x2,y2){var z1=Math.sqrt(x1*x1+y1*y1);var z2=Math.sqrt(x2*x2+y2*y2);return(z2-z1)/z1;}(Math.abs(self.startX-self.startX2),Math.abs(self.startY-self.startY2),Math.abs(self.endX-self.endX2),Math.abs(self.endY-self.endY2)),originalEvent);self.startX2=self.endX2;self.startY2=self.endY2;renderable=false;break;// Create crop box
	case'crop':if(!range.x||!range.y){renderable=false;break;}offset=$.getOffset(self.cropper);left=self.startX-offset.left;top=self.startY-offset.top;width=cropBoxData.minWidth;height=cropBoxData.minHeight;if(range.x>0){action=range.y>0?ACTION_SOUTH_EAST:ACTION_NORTH_EAST;}else if(range.x<0){left-=width;action=range.y>0?ACTION_SOUTH_WEST:ACTION_NORTH_WEST;}if(range.y<0){top-=height;}// Show the crop box if is hidden
	if(!self.cropped){$.removeClass(self.cropBox,'cropper-hidden');self.cropped=true;if(self.limited){self.limitCropBox(true,true);}}break;// No default
	}if(renderable){cropBoxData.width=width;cropBoxData.height=height;cropBoxData.left=left;cropBoxData.top=top;self.action=action;self.renderCropBox();}// Override
	self.startX=self.endX;self.startY=self.endY;}};/***/},/* 9 *//***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _utilities=__webpack_require__(4);var $=_interopRequireWildcard(_utilities);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}exports.default={// Show the crop box manually
	crop:function crop(){var self=this;if(self.ready&&!self.disabled){if(!self.cropped){self.cropped=true;self.limitCropBox(true,true);if(self.options.modal){$.addClass(self.dragBox,'cropper-modal');}$.removeClass(self.cropBox,'cropper-hidden');}self.setCropBoxData(self.initialCropBoxData);}return self;},// Reset the image and crop box to their initial states
	reset:function reset(){var self=this;if(self.ready&&!self.disabled){self.imageData=$.extend({},self.initialImageData);self.canvasData=$.extend({},self.initialCanvasData);self.cropBoxData=$.extend({},self.initialCropBoxData);self.renderCanvas();if(self.cropped){self.renderCropBox();}}return self;},// Clear the crop box
	clear:function clear(){var self=this;if(self.cropped&&!self.disabled){$.extend(self.cropBoxData,{left:0,top:0,width:0,height:0});self.cropped=false;self.renderCropBox();self.limitCanvas();// Render canvas after crop box rendered
	self.renderCanvas();$.removeClass(self.dragBox,'cropper-modal');$.addClass(self.cropBox,'cropper-hidden');}return self;},/**
		   * Replace the image's src and rebuild the cropper
		   *
		   * @param {String} url
		   * @param {Boolean} onlyColorChanged (optional)
		   */replace:function replace(url,onlyColorChanged){var self=this;if(!self.disabled&&url){if(self.isImg){self.element.src=url;}if(onlyColorChanged){self.url=url;self.image.src=url;if(self.ready){self.image2.src=url;$.each(self.previews,function(element){$.getByTag(element,'img')[0].src=url;});}}else{if(self.isImg){self.replaced=true;}// Clear previous data
	self.options.data=null;self.load(url);}}return self;},// Enable (unfreeze) the cropper
	enable:function enable(){var self=this;if(self.ready){self.disabled=false;$.removeClass(self.cropper,'cropper-disabled');}return self;},// Disable (freeze) the cropper
	disable:function disable(){var self=this;if(self.ready){self.disabled=true;$.addClass(self.cropper,'cropper-disabled');}return self;},// Destroy the cropper and remove the instance from the image
	destroy:function destroy(){var self=this;var element=self.element;var image=self.image;if(self.loaded){if(self.isImg&&self.replaced){element.src=self.originalUrl;}self.unbuild();$.removeClass(element,'cropper-hidden');}else if(self.isImg){$.removeListener(element,'load',self.start);}else if(image){$.removeChild(image);}$.removeData(element,'cropper');return self;},/**
		   * Move the canvas with relative offsets
		   *
		   * @param {Number} offsetX
		   * @param {Number} offsetY (optional)
		   */move:function move(offsetX,offsetY){var self=this;var canvasData=self.canvasData;return self.moveTo($.isUndefined(offsetX)?offsetX:canvasData.left+Number(offsetX),$.isUndefined(offsetY)?offsetY:canvasData.top+Number(offsetY));},/**
		   * Move the canvas to an absolute point
		   *
		   * @param {Number} x
		   * @param {Number} y (optional)
		   */moveTo:function moveTo(x,y){var self=this;var canvasData=self.canvasData;var changed=false;// If "y" is not present, its default value is "x"
	if($.isUndefined(y)){y=x;}x=Number(x);y=Number(y);if(self.ready&&!self.disabled&&self.options.movable){if($.isNumber(x)){canvasData.left=x;changed=true;}if($.isNumber(y)){canvasData.top=y;changed=true;}if(changed){self.renderCanvas(true);}}return self;},/**
		   * Zoom the canvas with a relative ratio
		   *
		   * @param {Number} ratio
		   * @param {Event} _originalEvent (private)
		   */zoom:function zoom(ratio,_originalEvent){var self=this;var canvasData=self.canvasData;ratio=Number(ratio);if(ratio<0){ratio=1/(1-ratio);}else{ratio=1+ratio;}return self.zoomTo(canvasData.width*ratio/canvasData.naturalWidth,_originalEvent);},/**
		   * Zoom the canvas to an absolute ratio
		   *
		   * @param {Number} ratio
		   * @param {Event} _originalEvent (private)
		   */zoomTo:function zoomTo(ratio,_originalEvent){var self=this;var options=self.options;var canvasData=self.canvasData;var width=canvasData.width;var height=canvasData.height;var naturalWidth=canvasData.naturalWidth;var naturalHeight=canvasData.naturalHeight;var newWidth=void 0;var newHeight=void 0;var offset=void 0;var center=void 0;ratio=Number(ratio);if(ratio>=0&&self.ready&&!self.disabled&&options.zoomable){newWidth=naturalWidth*ratio;newHeight=naturalHeight*ratio;if($.dispatchEvent(self.element,'zoom',{originalEvent:_originalEvent,oldRatio:width/naturalWidth,ratio:newWidth/naturalWidth})===false){return self;}if(_originalEvent){offset=$.getOffset(self.cropper);center=_originalEvent.touches?$.getTouchesCenter(_originalEvent.touches):{pageX:_originalEvent.pageX,pageY:_originalEvent.pageY};// Zoom from the triggering point of the event
	canvasData.left-=(newWidth-width)*((center.pageX-offset.left-canvasData.left)/width);canvasData.top-=(newHeight-height)*((center.pageY-offset.top-canvasData.top)/height);}else{// Zoom from the center of the canvas
	canvasData.left-=(newWidth-width)/2;canvasData.top-=(newHeight-height)/2;}canvasData.width=newWidth;canvasData.height=newHeight;self.renderCanvas(true);}return self;},/**
		   * Rotate the canvas with a relative degree
		   *
		   * @param {Number} degree
		   */rotate:function rotate(degree){var self=this;return self.rotateTo((self.imageData.rotate||0)+Number(degree));},/**
		   * Rotate the canvas to an absolute degree
		   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#rotate()
		   *
		   * @param {Number} degree
		   */rotateTo:function rotateTo(degree){var self=this;degree=Number(degree);if($.isNumber(degree)&&self.ready&&!self.disabled&&self.options.rotatable){self.imageData.rotate=degree%360;self.rotated=true;self.renderCanvas(true);}return self;},/**
		   * Scale the image
		   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#scale()
		   *
		   * @param {Number} scaleX
		   * @param {Number} scaleY (optional)
		   */scale:function scale(scaleX,scaleY){var self=this;var imageData=self.imageData;var changed=false;// If "scaleY" is not present, its default value is "scaleX"
	if($.isUndefined(scaleY)){scaleY=scaleX;}scaleX=Number(scaleX);scaleY=Number(scaleY);if(self.ready&&!self.disabled&&self.options.scalable){if($.isNumber(scaleX)){imageData.scaleX=scaleX;changed=true;}if($.isNumber(scaleY)){imageData.scaleY=scaleY;changed=true;}if(changed){self.renderImage(true);}}return self;},/**
		   * Scale the abscissa of the image
		   *
		   * @param {Number} scaleX
		   */scaleX:function scaleX(_scaleX){var self=this;var scaleY=self.imageData.scaleY;return self.scale(_scaleX,$.isNumber(scaleY)?scaleY:1);},/**
		   * Scale the ordinate of the image
		   *
		   * @param {Number} scaleY
		   */scaleY:function scaleY(_scaleY){var self=this;var scaleX=self.imageData.scaleX;return self.scale($.isNumber(scaleX)?scaleX:1,_scaleY);},/**
		   * Get the cropped area position and size data (base on the original image)
		   *
		   * @param {Boolean} rounded (optional)
		   * @return {Object} data
		   */getData:function getData(rounded){var self=this;var options=self.options;var imageData=self.imageData;var canvasData=self.canvasData;var cropBoxData=self.cropBoxData;var ratio=void 0;var data=void 0;if(self.ready&&self.cropped){data={x:cropBoxData.left-canvasData.left,y:cropBoxData.top-canvasData.top,width:cropBoxData.width,height:cropBoxData.height};ratio=imageData.width/imageData.naturalWidth;$.each(data,function(n,i){n/=ratio;data[i]=rounded?Math.round(n):n;});}else{data={x:0,y:0,width:0,height:0};}if(options.rotatable){data.rotate=imageData.rotate||0;}if(options.scalable){data.scaleX=imageData.scaleX||1;data.scaleY=imageData.scaleY||1;}return data;},/**
		   * Set the cropped area position and size with new data
		   *
		   * @param {Object} data
		   */setData:function setData(data){var self=this;var options=self.options;var imageData=self.imageData;var canvasData=self.canvasData;var cropBoxData={};var rotated=void 0;var scaled=void 0;var ratio=void 0;if($.isFunction(data)){data=data.call(self.element);}if(self.ready&&!self.disabled&&$.isPlainObject(data)){if(options.rotatable){if($.isNumber(data.rotate)&&data.rotate!==imageData.rotate){imageData.rotate=data.rotate;self.rotated=rotated=true;}}if(options.scalable){if($.isNumber(data.scaleX)&&data.scaleX!==imageData.scaleX){imageData.scaleX=data.scaleX;scaled=true;}if($.isNumber(data.scaleY)&&data.scaleY!==imageData.scaleY){imageData.scaleY=data.scaleY;scaled=true;}}if(rotated){self.renderCanvas();}else if(scaled){self.renderImage();}ratio=imageData.width/imageData.naturalWidth;if($.isNumber(data.x)){cropBoxData.left=data.x*ratio+canvasData.left;}if($.isNumber(data.y)){cropBoxData.top=data.y*ratio+canvasData.top;}if($.isNumber(data.width)){cropBoxData.width=data.width*ratio;}if($.isNumber(data.height)){cropBoxData.height=data.height*ratio;}self.setCropBoxData(cropBoxData);}return self;},/**
		   * Get the container size data
		   *
		   * @return {Object} data
		   */getContainerData:function getContainerData(){var self=this;return self.ready?self.containerData:{};},/**
		   * Get the image position and size data
		   *
		   * @return {Object} data
		   */getImageData:function getImageData(){var self=this;return self.loaded?self.imageData:{};},/**
		   * Get the canvas position and size data
		   *
		   * @return {Object} data
		   */getCanvasData:function getCanvasData(){var self=this;var canvasData=self.canvasData;var data={};if(self.ready){$.each(['left','top','width','height','naturalWidth','naturalHeight'],function(n){data[n]=canvasData[n];});}return data;},/**
		   * Set the canvas position and size with new data
		   *
		   * @param {Object} data
		   */setCanvasData:function setCanvasData(data){var self=this;var canvasData=self.canvasData;var aspectRatio=canvasData.aspectRatio;if($.isFunction(data)){data=data.call(self.element);}if(self.ready&&!self.disabled&&$.isPlainObject(data)){if($.isNumber(data.left)){canvasData.left=data.left;}if($.isNumber(data.top)){canvasData.top=data.top;}if($.isNumber(data.width)){canvasData.width=data.width;canvasData.height=data.width/aspectRatio;}else if($.isNumber(data.height)){canvasData.height=data.height;canvasData.width=data.height*aspectRatio;}self.renderCanvas(true);}return self;},/**
		   * Get the crop box position and size data
		   *
		   * @return {Object} data
		   */getCropBoxData:function getCropBoxData(){var self=this;var cropBoxData=self.cropBoxData;var data=void 0;if(self.ready&&self.cropped){data={left:cropBoxData.left,top:cropBoxData.top,width:cropBoxData.width,height:cropBoxData.height};}return data||{};},/**
		   * Set the crop box position and size with new data
		   *
		   * @param {Object} data
		   */setCropBoxData:function setCropBoxData(data){var self=this;var cropBoxData=self.cropBoxData;var aspectRatio=self.options.aspectRatio;var widthChanged=void 0;var heightChanged=void 0;if($.isFunction(data)){data=data.call(self.element);}if(self.ready&&self.cropped&&!self.disabled&&$.isPlainObject(data)){if($.isNumber(data.left)){cropBoxData.left=data.left;}if($.isNumber(data.top)){cropBoxData.top=data.top;}if($.isNumber(data.width)){widthChanged=true;cropBoxData.width=data.width;}if($.isNumber(data.height)){heightChanged=true;cropBoxData.height=data.height;}if(aspectRatio){if(widthChanged){cropBoxData.height=cropBoxData.width/aspectRatio;}else if(heightChanged){cropBoxData.width=cropBoxData.height*aspectRatio;}}self.renderCropBox();}return self;},/**
		   * Get a canvas drawn the cropped image
		   *
		   * @param {Object} options (optional)
		   * @return {HTMLCanvasElement} canvas
		   */getCroppedCanvas:function getCroppedCanvas(options){var self=this;if(!self.ready||!window.HTMLCanvasElement){return null;}// Return the whole canvas if not cropped
	if(!self.cropped){return $.getSourceCanvas(self.image,self.imageData);}if(!$.isPlainObject(options)){options={};}var data=self.getData();var originalWidth=data.width;var originalHeight=data.height;var aspectRatio=originalWidth/originalHeight;var scaledWidth=void 0;var scaledHeight=void 0;var scaledRatio=void 0;if($.isPlainObject(options)){scaledWidth=options.width;scaledHeight=options.height;if(scaledWidth){scaledHeight=scaledWidth/aspectRatio;scaledRatio=scaledWidth/originalWidth;}else if(scaledHeight){scaledWidth=scaledHeight*aspectRatio;scaledRatio=scaledHeight/originalHeight;}}// The canvas element will use `Math.floor` on a float number, so floor first
	var canvasWidth=Math.floor(scaledWidth||originalWidth);var canvasHeight=Math.floor(scaledHeight||originalHeight);var canvas=$.createElement('canvas');var context=canvas.getContext('2d');canvas.width=canvasWidth;canvas.height=canvasHeight;if(options.fillColor){context.fillStyle=options.fillColor;context.fillRect(0,0,canvasWidth,canvasHeight);}// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
	var parameters=function(){var source=$.getSourceCanvas(self.image,self.imageData);var sourceWidth=source.width;var sourceHeight=source.height;var canvasData=self.canvasData;var params=[source];// Source canvas
	var srcX=data.x+canvasData.naturalWidth*(Math.abs(data.scaleX||1)-1)/2;var srcY=data.y+canvasData.naturalHeight*(Math.abs(data.scaleY||1)-1)/2;var srcWidth=void 0;var srcHeight=void 0;// Destination canvas
	var dstX=void 0;var dstY=void 0;var dstWidth=void 0;var dstHeight=void 0;if(srcX<=-originalWidth||srcX>sourceWidth){srcX=srcWidth=dstX=dstWidth=0;}else if(srcX<=0){dstX=-srcX;srcX=0;srcWidth=dstWidth=Math.min(sourceWidth,originalWidth+srcX);}else if(srcX<=sourceWidth){dstX=0;srcWidth=dstWidth=Math.min(originalWidth,sourceWidth-srcX);}if(srcWidth<=0||srcY<=-originalHeight||srcY>sourceHeight){srcY=srcHeight=dstY=dstHeight=0;}else if(srcY<=0){dstY=-srcY;srcY=0;srcHeight=dstHeight=Math.min(sourceHeight,originalHeight+srcY);}else if(srcY<=sourceHeight){dstY=0;srcHeight=dstHeight=Math.min(originalHeight,sourceHeight-srcY);}params.push(Math.floor(srcX),Math.floor(srcY),Math.floor(srcWidth),Math.floor(srcHeight));// Scale destination sizes
	if(scaledRatio){dstX*=scaledRatio;dstY*=scaledRatio;dstWidth*=scaledRatio;dstHeight*=scaledRatio;}// Avoid "IndexSizeError" in IE and Firefox
	if(dstWidth>0&&dstHeight>0){params.push(Math.floor(dstX),Math.floor(dstY),Math.floor(dstWidth),Math.floor(dstHeight));}return params;}();context.drawImage.apply(context,_toConsumableArray(parameters));return canvas;},/**
		   * Change the aspect ratio of the crop box
		   *
		   * @param {Number} aspectRatio
		   */setAspectRatio:function setAspectRatio(aspectRatio){var self=this;var options=self.options;if(!self.disabled&&!$.isUndefined(aspectRatio)){// 0 -> NaN
	options.aspectRatio=Math.max(0,aspectRatio)||NaN;if(self.ready){self.initCropBox();if(self.cropped){self.renderCropBox();}}}return self;},/**
		   * Change the drag mode
		   *
		   * @param {String} mode (optional)
		   */setDragMode:function setDragMode(mode){var self=this;var options=self.options;var dragBox=self.dragBox;var face=self.face;var croppable=void 0;var movable=void 0;if(self.loaded&&!self.disabled){croppable=mode==='crop';movable=options.movable&&mode==='move';mode=croppable||movable?mode:'none';$.setData(dragBox,'action',mode);$.toggleClass(dragBox,'cropper-crop',croppable);$.toggleClass(dragBox,'cropper-move',movable);if(!options.cropBoxMovable){// Sync drag mode to crop box when it is not movable
	$.setData(face,'action',mode);$.toggleClass(face,'cropper-crop',croppable);$.toggleClass(face,'cropper-move',movable);}}return self;}};/***/}/******/]));});;//# sourceMappingURL=cropper.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(98)(module)))

/***/ },
/* 98 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ }
/******/ ])
});
;