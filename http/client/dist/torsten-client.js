(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("orange"), require(undefined));
	else if(typeof define === 'function' && define.amd)
		define(["orange", ], factory);
	else if(typeof exports === 'object')
		exports["torsten"] = factory(require("orange"), require(undefined));
	else
		root["torsten"] = factory(root["orange"], root[undefined]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_7__) {
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
	var error_1 = __webpack_require__(5);
	exports.TorstenClientError = error_1.TorstenClientError;
	var utils_1 = __webpack_require__(3);
	exports.readBlobAsText = utils_1.readBlobAsText;
	exports.readBlobAsArrayBuffer = utils_1.readBlobAsArrayBuffer;
	exports.readBlobAsDataURL = utils_1.readBlobAsDataURL;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var orange_1 = __webpack_require__(2);
	var utils_1 = __webpack_require__(3);
	var file_info_1 = __webpack_require__(4);
	var error_1 = __webpack_require__(5);
	var request = __webpack_require__(6);
	var orange_request_1 = __webpack_require__(7);
	function validateConfig(options) {}

	var TorstenClient = function () {
	    function TorstenClient(options) {
	        _classCallCheck(this, TorstenClient);

	        validateConfig(options);
	        this._options = options;
	    }

	    _createClass(TorstenClient, [{
	        key: 'create',
	        value: function create(path, data) {
	            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	            if (data == null) return Promise.reject(error_1.createError("no data"));
	            var req = orange_1.extend({}, options);
	            var promise = void 0;
	            if (utils_1.isNode && utils_1.isReadableStream(data)) {} else {
	                promise = request.upload(this._toUrl(path), req, data);
	            }
	            return promise.then(function (res) {
	                return res.json();
	            }).then(function (json) {
	                if (json.message != "ok") {
	                    throw error_1.createError("invalid response");
	                }
	                return json.data;
	            });
	        }
	    }, {
	        key: 'stat',
	        value: function stat(path) {
	            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            var url = this._toUrl(path);
	            return request.request(orange_request_1.HttpMethod.GET, url, {
	                progress: options.progress,
	                params: { stat: true }
	            }).then(function (res) {
	                return res.json();
	            }).then(function (i) {
	                return new file_info_1.FileInfo(i.data);
	            });
	        }
	    }, {
	        key: 'statById',
	        value: function statById(id) {
	            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            return request.request(orange_request_1.HttpMethod.GET, this.endpoint, {
	                progress: options.progress,
	                params: { stat: true, id: id }
	            }).then(function (res) {
	                return res.json();
	            }).then(function (i) {
	                return new file_info_1.FileInfo(i.data);
	            });
	        }
	    }, {
	        key: 'list',
	        value: function list(path) {
	            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            var req = request.request(orange_request_1.HttpMethod.GET, this._toUrl(path), options);
	            return req.then(function (res) {
	                return res.json();
	            }).then(function (infos) {
	                if (infos.message != 'ok') return [];
	                return infos.data.map(function (i) {
	                    return new file_info_1.FileInfo(i);
	                });
	            });
	        }
	    }, {
	        key: 'open',
	        value: function open(path) {
	            var _this = this;

	            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            return this.stat(path, options).then(function (info) {
	                var r = { progress: options.progress };
	                if (options.thumbnail) {
	                    r.params = r.params || {};
	                    r.params.thumbnail = true;
	                }
	                if (utils_1.isNode && options.stream) {}
	                return request.request(orange_request_1.HttpMethod.GET, _this._toUrl(path), r).then(function (r) {
	                    return r.blob();
	                });
	            });
	        }
	    }, {
	        key: 'remove',
	        value: function remove(path) {
	            var url = this._toUrl(path);
	            return request.request(orange_request_1.HttpMethod.DELETE, url, {}).then(function (res) {
	                return res.json();
	            });
	        }
	    }, {
	        key: '_toUrl',
	        value: function _toUrl(path) {
	            if (path.substr(0, 1) != "/") {
	                path = "/" + path;
	            }
	            return this._options.endpoint + path;
	        }
	    }, {
	        key: 'endpoint',
	        get: function get() {
	            return this._options.endpoint;
	        }
	    }]);

	    return TorstenClient;
	}();

	exports.TorstenClient = TorstenClient;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var orange_1 = __webpack_require__(2);

	var ReadableStream = function ReadableStream() {
	    _classCallCheck(this, ReadableStream);
	};

	exports.ReadableStream = ReadableStream;
	exports.isNode = !new Function("try {return this===window;}catch(e){ return false;}")();
	var orange_2 = __webpack_require__(2);
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var orange_1 = __webpack_require__(2);
	var props = ['name', 'mime', 'size', 'ctime', 'mtime', 'mode', 'gid', 'uid', 'meta', 'path', 'is_dir', 'hidden'];

	var FileInfo = function () {
	    function FileInfo() {
	        var _this = this;

	        var attr = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, FileInfo);

	        props.forEach(function (m) {
	            if (orange_1.has(attr, m)) {
	                _this[m] = attr[m];
	            }
	        });
	        if (!(this.ctime instanceof Date)) {
	            this.ctime = new Date(this.ctime);
	        }
	        if (!(this.mtime instanceof Date)) {
	            this.mtime = new Date(this.mtime);
	        }
	    }

	    _createClass(FileInfo, [{
	        key: 'fullPath',
	        get: function get() {
	            return this.path + this.name;
	        }
	    }]);

	    return FileInfo;
	}();

	exports.FileInfo = FileInfo;

/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var orange_request_1 = __webpack_require__(7);
	var utils_1 = __webpack_require__(3);
	function request(method, url) {
	    var r = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    var req = new orange_request_1.HttpRequest(method, url);
	    if (r.params) req.params(r.params);
	    if (r.headers) req.header(r.headers);
	    req.header("User-Agent", "torsten-client/0.0.1");
	    return req.downloadProgress(r.progress).end(r.data).then(function (res) {
	        return res;
	    });
	}
	exports.request = request;
	function upload(url, r, data) {
	    var req = new orange_request_1.HttpRequest(orange_request_1.HttpMethod.POST, url);
	    req.uploadProgress(r.progress);
	    if (r.params) req.params(r.params);
	    if (r.headers) req.header(r.headers);
	    var mimeType = void 0;
	    req.header("User-Agent", "torsten-client/0.0.1");
	    if (utils_1.isString(data)) {
	        req.header('Content-Length', data.length);
	        mimeType = r.mime || "text/plain";
	    } else if (utils_1.isBuffer(data)) {
	        req.header('Content-Length', data.length);
	    } else if (utils_1.isObject(data) && !utils_1.isFile(data) && !utils_1.isFormData(data)) {
	        try {
	            data = JSON.stringify(data);
	            req.header('Content-Length', data.length);
	            mimeType = "application/json";
	        } catch (e) {
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

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }
/******/ ])
});
;