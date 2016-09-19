(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("collection"), require("orange"), require(undefined), require("views"));
	else if(typeof define === 'function' && define.amd)
		define(["collection", "orange", , "views"], factory);
	else if(typeof exports === 'object')
		exports["views"] = factory(require("collection"), require("orange"), require(undefined), require("views"));
	else
		root["torsten"] = root["torsten"] || {}, root["torsten"]["views"] = factory(root["collection"], root["orange"], root[undefined], root["views"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_10__) {
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
	__export(__webpack_require__(8));
	__export(__webpack_require__(21));

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
	var error_1 = __webpack_require__(3);
	var orange_1 = __webpack_require__(5);
	var utils_1 = __webpack_require__(6);
	var orange_request_1 = __webpack_require__(7);
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
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var error_1 = __webpack_require__(4);

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
/* 4 */
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
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var orange_1 = __webpack_require__(5);

	var ReadableStream = function ReadableStream() {
	    _classCallCheck(this, ReadableStream);
	};

	exports.ReadableStream = ReadableStream;
	exports.isNode = !new Function("try {return this===window;}catch(e){ return false;}")();
	var orange_2 = __webpack_require__(5);
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
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(9));
	__export(__webpack_require__(15));
	__export(__webpack_require__(20));

/***/ },
/* 9 */
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
	var views_1 = __webpack_require__(10);
	var orange_dom_1 = __webpack_require__(11);
	var orange_1 = __webpack_require__(5);
	var list_item_1 = __webpack_require__(15);
	var circular_progress_1 = __webpack_require__(18);
	//import {AssetsCollection} from '../../models/index';
	var Blazy = __webpack_require__(19);
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

	                if (this.options.deleteable === true) {
	                    var remove = true;
	                    if (model.has('deleteable')) {
	                        remove = !!model.get('deleteable');
	                    }
	                    if (remove) model.remove();
	                } else {}
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
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(12));
	__export(__webpack_require__(13));
	__export(__webpack_require__(14));

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// TODO: CreateHTML

	var orange_1 = __webpack_require__(5);
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
/* 13 */
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

	var orange_1 = __webpack_require__(5);
	var dom = __webpack_require__(12);
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
/* 14 */
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

	var orange_1 = __webpack_require__(5);
	var dom_1 = __webpack_require__(12);

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
/* 15 */
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
	var views_1 = __webpack_require__(10);
	//import {template} from '../utils';
	//import {getMimeIcon} from '../mime-types';
	//import {fileModel} from '../../models/index'
	var orange_1 = __webpack_require__(5);
	var orange_dom_1 = __webpack_require__(11);
	var index_1 = __webpack_require__(16);
	var mimetypes_1 = __webpack_require__(17);
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
	        remove: '.file-list-item.close-button',
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
/* 16 */
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
/* 17 */
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
/* 18 */
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
	var views_1 = __webpack_require__(10);
	var orange_1 = __webpack_require__(5);
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
/* 19 */
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
/* 20 */
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
	var views_1 = __webpack_require__(10);
	var orange_1 = __webpack_require__(5);
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(22));

/***/ },
/* 22 */
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
	var views_1 = __webpack_require__(10);
	var orange_1 = __webpack_require__(5);
	var index_1 = __webpack_require__(8);
	var index_2 = __webpack_require__(23);
	var index_3 = __webpack_require__(16);
	var collection_1 = __webpack_require__(1);
	var dropzone_1 = __webpack_require__(25);
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(24));

/***/ },
/* 24 */
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
	var views_1 = __webpack_require__(10);
	var index_1 = __webpack_require__(16);
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
	            ui.size.textContent = model.get('size');
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
/* 25 */
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
	var views_1 = __webpack_require__(10);
	var orange_dom_1 = __webpack_require__(11);
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

/***/ }
/******/ ])
});
;