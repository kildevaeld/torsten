(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["views"] = factory();
	else
		root["torsten"] = root["torsten"] || {}, root["torsten"]["views"] = factory();
})(this, function() {
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
	__export(__webpack_require__(33));

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

	var FileInfoModel = function (_collection_1$Model) {
	    _inherits(FileInfoModel, _collection_1$Model);

	    function FileInfoModel(attr, options) {
	        _classCallCheck(this, FileInfoModel);

	        var _this = _possibleConstructorReturn(this, (FileInfoModel.__proto__ || Object.getPrototypeOf(FileInfoModel)).call(this, attr, options));

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

	var FileCollection = function (_collection_1$Collect) {
	    _inherits(FileCollection, _collection_1$Collect);

	    function FileCollection(models, options) {
	        _classCallCheck(this, FileCollection);

	        var _this2 = _possibleConstructorReturn(this, (FileCollection.__proto__ || Object.getPrototypeOf(FileCollection)).call(this, models, options));

	        _this2.Model = FileInfoModel;
	        options = options || {};
	        if (!options.client) {
	            throw new error_1.TorstenGuiError("No client");
	        }
	        if (!options.path || options.path == "") {
	            options.path = "/";
	        }
	        _this2._client = options.client;
	        _this2._path = normalizePath(options.path);
	        //this._url = this._client.endpoint + path;
	        return _this2;
	    }

	    _createClass(FileCollection, [{
	        key: 'fetch',
	        value: function fetch(options) {
	            var _this3 = this;

	            options = options ? orange_1.extend({}, options) : {};
	            this.trigger('before:fetch');
	            return this._client.list(this.path, {
	                progress: function progress(e) {
	                    if (e.lengthComputable) {
	                        console.log(e.loaded, e.total);
	                        _this3.trigger('progress', e);
	                    }
	                }
	            }).then(function (files) {
	                _this3[options.reset ? 'reset' : 'set'](files, options);
	                _this3.trigger('fetch');
	                return _this3.models;
	            });
	        }
	    }, {
	        key: 'create',
	        value: function create(name, data) {
	            var _this4 = this;

	            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	            var fullPath = utils_1.path.join(this.path, name);
	            return this._client.create(fullPath, data, {
	                progress: function progress(e) {
	                    _this4.trigger('progress', e);
	                    if (options.progress) options.progress(e);
	                }
	            }).then(function (info) {
	                var model = new FileInfoModel(info, {
	                    client: _this4._client
	                });
	                _this4.add(model);
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
	}(collection_1.Collection);

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

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

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
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

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

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

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
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 27 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

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
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {"use strict";

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ReadableStream = function ReadableStream() {
	    _classCallCheck(this, ReadableStream);
	};

	exports.ReadableStream = ReadableStream;
	exports.isNode = !new Function("try {return this===window;}catch(e){ return false;}")();
	var orange_1 = __webpack_require__(20);
	exports.isObject = orange_1.isObject;
	exports.isString = orange_1.isString;
	exports.isFunction = orange_1.isFunction;
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
	    return new Promise(function (resolve, reject) {
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
	exports.readBlobAsText = readBlobAsText;
	var path;
	(function (path_1) {
	    function join() {
	        var out = [];

	        for (var _len = arguments.length, parts = Array(_len), _key = 0; _key < _len; _key++) {
	            parts[_key] = arguments[_key];
	        }

	        for (var i = 0, ii = parts.length; i < ii; i++) {
	            var s = 0,
	                e = parts[i].length;
	            if (parts[i] == "" || parts[i] == '') continue;
	            if (parts[i][0] === '/') s = 1;
	            if (parts[i][e - 1] === '/') e--;
	            out.push(parts[i].substring(s, e));
	        }
	        return '/' + out.join('/');
	    }
	    path_1.join = join;
	    function base(path) {
	        if (!path) return "";
	        var split = path.split('/');
	        return split[split.length - 1];
	    }
	    path_1.base = base;
	    function dir(path) {
	        if (!path) return "";
	        var split = path.split('/');
	        split.pop();
	        return join.apply(undefined, _toConsumableArray(split));
	    }
	    path_1.dir = dir;
	})(path = exports.path || (exports.path = {}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29).Buffer))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict';

	var base64 = __webpack_require__(30);
	var ieee754 = __webpack_require__(31);
	var isArray = __webpack_require__(32);

	exports.Buffer = Buffer;
	exports.SlowBuffer = SlowBuffer;
	exports.INSPECT_MAX_BYTES = 50;

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength();

	function typedArraySupport() {
	  try {
	    var arr = new Uint8Array(1);
	    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {
	        return 42;
	      } };
	    return arr.foo() === 42 && // typed array instances can be augmented
	    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
	  } catch (e) {
	    return false;
	  }
	}

	function kMaxLength() {
	  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
	}

	function createBuffer(that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length');
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length);
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length);
	    }
	    that.length = length;
	  }

	  return that;
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer(arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length);
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error('If encoding is specified then the first argument must be a string');
	    }
	    return allocUnsafe(this, arg);
	  }
	  return from(this, arg, encodingOrOffset, length);
	}

	Buffer.poolSize = 8192; // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype;
	  return arr;
	};

	function from(that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number');
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length);
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset);
	  }

	  return fromObject(that, value);
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length);
	};

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype;
	  Buffer.__proto__ = Uint8Array;
	  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    });
	  }
	}

	function assertSize(size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number');
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative');
	  }
	}

	function alloc(that, size, fill, encoding) {
	  assertSize(size);
	  if (size <= 0) {
	    return createBuffer(that, size);
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
	  }
	  return createBuffer(that, size);
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding);
	};

	function allocUnsafe(that, size) {
	  assertSize(size);
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0;
	    }
	  }
	  return that;
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size);
	};
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size);
	};

	function fromString(that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8';
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding');
	  }

	  var length = byteLength(string, encoding) | 0;
	  that = createBuffer(that, length);

	  var actual = that.write(string, encoding);

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual);
	  }

	  return that;
	}

	function fromArrayLike(that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0;
	  that = createBuffer(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}

	function fromArrayBuffer(that, array, byteOffset, length) {
	  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds');
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds');
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array);
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset);
	  } else {
	    array = new Uint8Array(array, byteOffset, length);
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array;
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array);
	  }
	  return that;
	}

	function fromObject(that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0;
	    that = createBuffer(that, len);

	    if (that.length === 0) {
	      return that;
	    }

	    obj.copy(that, 0, 0, len);
	    return that;
	  }

	  if (obj) {
	    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0);
	      }
	      return fromArrayLike(that, obj);
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data);
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
	}

	function checked(length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
	  }
	  return length | 0;
	}

	function SlowBuffer(length) {
	  if (+length != length) {
	    // eslint-disable-line eqeqeq
	    length = 0;
	  }
	  return Buffer.alloc(+length);
	}

	Buffer.isBuffer = function isBuffer(b) {
	  return !!(b != null && b._isBuffer);
	};

	Buffer.compare = function compare(a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers');
	  }

	  if (a === b) return 0;

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }

	  if (x < y) return -1;
	  if (y < x) return 1;
	  return 0;
	};

	Buffer.isEncoding = function isEncoding(encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true;
	    default:
	      return false;
	  }
	};

	Buffer.concat = function concat(list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers');
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0);
	  }

	  var i;
	  if (length === undefined) {
	    length = 0;
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length;
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length);
	  var pos = 0;
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i];
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers');
	    }
	    buf.copy(buffer, pos);
	    pos += buf.length;
	  }
	  return buffer;
	};

	function byteLength(string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length;
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength;
	  }
	  if (typeof string !== 'string') {
	    string = '' + string;
	  }

	  var len = string.length;
	  if (len === 0) return 0;

	  // Use a for loop to avoid recursion
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len;
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length;
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2;
	      case 'hex':
	        return len >>> 1;
	      case 'base64':
	        return base64ToBytes(string).length;
	      default:
	        if (loweredCase) return utf8ToBytes(string).length; // assume utf8
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer.byteLength = byteLength;

	function slowToString(encoding, start, end) {
	  var loweredCase = false;

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0;
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return '';
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length;
	  }

	  if (end <= 0) {
	    return '';
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0;
	  start >>>= 0;

	  if (end <= start) {
	    return '';
	  }

	  if (!encoding) encoding = 'utf8';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end);

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end);

	      case 'ascii':
	        return asciiSlice(this, start, end);

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end);

	      case 'base64':
	        return base64Slice(this, start, end);

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end);

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true;

	function swap(b, n, m) {
	  var i = b[n];
	  b[n] = b[m];
	  b[m] = i;
	}

	Buffer.prototype.swap16 = function swap16() {
	  var len = this.length;
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits');
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1);
	  }
	  return this;
	};

	Buffer.prototype.swap32 = function swap32() {
	  var len = this.length;
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits');
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3);
	    swap(this, i + 1, i + 2);
	  }
	  return this;
	};

	Buffer.prototype.swap64 = function swap64() {
	  var len = this.length;
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits');
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7);
	    swap(this, i + 1, i + 6);
	    swap(this, i + 2, i + 5);
	    swap(this, i + 3, i + 4);
	  }
	  return this;
	};

	Buffer.prototype.toString = function toString() {
	  var length = this.length | 0;
	  if (length === 0) return '';
	  if (arguments.length === 0) return utf8Slice(this, 0, length);
	  return slowToString.apply(this, arguments);
	};

	Buffer.prototype.equals = function equals(b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
	  if (this === b) return true;
	  return Buffer.compare(this, b) === 0;
	};

	Buffer.prototype.inspect = function inspect() {
	  var str = '';
	  var max = exports.INSPECT_MAX_BYTES;
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	    if (this.length > max) str += ' ... ';
	  }
	  return '<Buffer ' + str + '>';
	};

	Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer');
	  }

	  if (start === undefined) {
	    start = 0;
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0;
	  }
	  if (thisStart === undefined) {
	    thisStart = 0;
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length;
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index');
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0;
	  }
	  if (thisStart >= thisEnd) {
	    return -1;
	  }
	  if (start >= end) {
	    return 1;
	  }

	  start >>>= 0;
	  end >>>= 0;
	  thisStart >>>= 0;
	  thisEnd >>>= 0;

	  if (this === target) return 0;

	  var x = thisEnd - thisStart;
	  var y = end - start;
	  var len = Math.min(x, y);

	  var thisCopy = this.slice(thisStart, thisEnd);
	  var targetCopy = target.slice(start, end);

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i];
	      y = targetCopy[i];
	      break;
	    }
	  }

	  if (x < y) return -1;
	  if (y < x) return 1;
	  return 0;
	};

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1;

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset;
	    byteOffset = 0;
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff;
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000;
	  }
	  byteOffset = +byteOffset; // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : buffer.length - 1;
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1;else byteOffset = buffer.length - 1;
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0;else return -1;
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding);
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1;
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
	  } else if (typeof val === 'number') {
	    val = val & 0xFF; // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
	      }
	    }
	    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
	  }

	  throw new TypeError('val must be string, number or Buffer');
	}

	function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1;
	  var arrLength = arr.length;
	  var valLength = val.length;

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase();
	    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1;
	      }
	      indexSize = 2;
	      arrLength /= 2;
	      valLength /= 2;
	      byteOffset /= 2;
	    }
	  }

	  function read(buf, i) {
	    if (indexSize === 1) {
	      return buf[i];
	    } else {
	      return buf.readUInt16BE(i * indexSize);
	    }
	  }

	  var i;
	  if (dir) {
	    var foundIndex = -1;
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex;
	        foundIndex = -1;
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true;
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false;
	          break;
	        }
	      }
	      if (found) return i;
	    }
	  }

	  return -1;
	}

	Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1;
	};

	Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
	};

	Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
	};

	function hexWrite(buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length;
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (isNaN(parsed)) return i;
	    buf[offset + i] = parsed;
	  }
	  return i;
	}

	function utf8Write(buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
	}

	function asciiWrite(buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length);
	}

	function latin1Write(buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length);
	}

	function base64Write(buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length);
	}

	function ucs2Write(buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
	}

	Buffer.prototype.write = function write(string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	    // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset;
	    length = this.length;
	    offset = 0;
	    // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0;
	    if (isFinite(length)) {
	      length = length | 0;
	      if (encoding === undefined) encoding = 'utf8';
	    } else {
	      encoding = length;
	      length = undefined;
	    }
	    // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
	  }

	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds');
	  }

	  if (!encoding) encoding = 'utf8';

	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length);

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length);

	      case 'ascii':
	        return asciiWrite(this, string, offset, length);

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length);

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length);

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length);

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer.prototype.toJSON = function toJSON() {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  };
	};

	function base64Slice(buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf);
	  } else {
	    return base64.fromByteArray(buf.slice(start, end));
	  }
	}

	function utf8Slice(buf, start, end) {
	  end = Math.min(buf.length, end);
	  var res = [];

	  var i = start;
	  while (i < end) {
	    var firstByte = buf[i];
	    var codePoint = null;
	    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint;

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }
	          break;
	        case 2:
	          secondByte = buf[i + 1];
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break;
	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break;
	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint;
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD;
	      bytesPerSequence = 1;
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000;
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	      codePoint = 0xDC00 | codePoint & 0x3FF;
	    }

	    res.push(codePoint);
	    i += bytesPerSequence;
	  }

	  return decodeCodePointsArray(res);
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000;

	function decodeCodePointsArray(codePoints) {
	  var len = codePoints.length;
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = '';
	  var i = 0;
	  while (i < len) {
	    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
	  }
	  return res;
	}

	function asciiSlice(buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret;
	}

	function latin1Slice(buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret;
	}

	function hexSlice(buf, start, end) {
	  var len = buf.length;

	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;

	  var out = '';
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i]);
	  }
	  return out;
	}

	function utf16leSlice(buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	  }
	  return res;
	}

	Buffer.prototype.slice = function slice(start, end) {
	  var len = this.length;
	  start = ~~start;
	  end = end === undefined ? len : ~~end;

	  if (start < 0) {
	    start += len;
	    if (start < 0) start = 0;
	  } else if (start > len) {
	    start = len;
	  }

	  if (end < 0) {
	    end += len;
	    if (end < 0) end = 0;
	  } else if (end > len) {
	    end = len;
	  }

	  if (end < start) end = start;

	  var newBuf;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end);
	    newBuf.__proto__ = Buffer.prototype;
	  } else {
	    var sliceLen = end - start;
	    newBuf = new Buffer(sliceLen, undefined);
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start];
	    }
	  }

	  return newBuf;
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset(offset, ext, length) {
	  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
	}

	Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val;
	};

	Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }

	  var val = this[offset + --byteLength];
	  var mul = 1;
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }

	  return val;
	};

	Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset];
	};

	Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | this[offset + 1] << 8;
	};

	Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] << 8 | this[offset + 1];
	};

	Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
	};

	Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
	};

	Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val;
	};

	Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var i = byteLength;
	  var mul = 1;
	  var val = this[offset + --i];
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val;
	};

	Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return this[offset];
	  return (0xff - this[offset] + 1) * -1;
	};

	Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | this[offset + 1] << 8;
	  return val & 0x8000 ? val | 0xFFFF0000 : val;
	};

	Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | this[offset] << 8;
	  return val & 0x8000 ? val | 0xFFFF0000 : val;
	};

	Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
	};

	Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
	};

	Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return ieee754.read(this, offset, true, 23, 4);
	};

	Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return ieee754.read(this, offset, false, 23, 4);
	};

	Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return ieee754.read(this, offset, true, 52, 8);
	};

	Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return ieee754.read(this, offset, false, 52, 8);
	};

	function checkInt(buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
	  if (offset + ext > buf.length) throw new RangeError('Index out of range');
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var mul = 1;
	  var i = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = value / mul & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = value / mul & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  this[offset] = value & 0xff;
	  return offset + 1;
	};

	function objectWriteUInt16(buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2;
	};

	Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 8;
	    this[offset + 1] = value & 0xff;
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2;
	};

	function objectWriteUInt32(buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = value >>> 24;
	    this[offset + 2] = value >>> 16;
	    this[offset + 1] = value >>> 8;
	    this[offset] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4;
	};

	Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 24;
	    this[offset + 1] = value >>> 16;
	    this[offset + 2] = value >>> 8;
	    this[offset + 3] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4;
	};

	Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = 0;
	  var mul = 1;
	  var sub = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  var sub = 0;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = value & 0xff;
	  return offset + 1;
	};

	Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2;
	};

	Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 8;
	    this[offset + 1] = value & 0xff;
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2;
	};

	Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	    this[offset + 2] = value >>> 16;
	    this[offset + 3] = value >>> 24;
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4;
	};

	Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 24;
	    this[offset + 1] = value >>> 16;
	    this[offset + 2] = value >>> 8;
	    this[offset + 3] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4;
	};

	function checkIEEE754(buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range');
	  if (offset < 0) throw new RangeError('Index out of range');
	}

	function writeFloat(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4;
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert);
	};

	Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert);
	};

	function writeDouble(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8;
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert);
	};

	Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert);
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy(target, targetStart, start, end) {
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0;
	  if (target.length === 0 || this.length === 0) return 0;

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds');
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
	  if (end < 0) throw new RangeError('sourceEnd out of bounds');

	  // Are we oob?
	  if (end > this.length) end = this.length;
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }

	  var len = end - start;
	  var i;

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else {
	    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
	  }

	  return len;
	};

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill(val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start;
	      start = 0;
	      end = this.length;
	    } else if (typeof end === 'string') {
	      encoding = end;
	      end = this.length;
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0);
	      if (code < 256) {
	        val = code;
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string');
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding);
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255;
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index');
	  }

	  if (end <= start) {
	    return this;
	  }

	  start = start >>> 0;
	  end = end === undefined ? this.length : end >>> 0;

	  if (!val) val = 0;

	  var i;
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val;
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
	    var len = bytes.length;
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len];
	    }
	  }

	  return this;
	};

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

	function base64clean(str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return '';
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str;
	}

	function stringtrim(str) {
	  if (str.trim) return str.trim();
	  return str.replace(/^\s+|\s+$/g, '');
	}

	function toHex(n) {
	  if (n < 16) return '0' + n.toString(16);
	  return n.toString(16);
	}

	function utf8ToBytes(string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue;
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue;
	        }

	        // valid lead
	        leadSurrogate = codePoint;

	        continue;
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue;
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }

	    leadSurrogate = null;

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break;
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break;
	      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break;
	      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break;
	      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
	    } else {
	      throw new Error('Invalid code point');
	    }
	  }

	  return bytes;
	}

	function asciiToBytes(str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray;
	}

	function utf16leToBytes(str, units) {
	  var c, hi, lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break;

	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray;
	}

	function base64ToBytes(str) {
	  return base64.toByteArray(base64clean(str));
	}

	function blitBuffer(src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if (i + offset >= dst.length || i >= src.length) break;
	    dst[i + offset] = src[i];
	  }
	  return i;
	}

	function isnan(val) {
	  return val !== val; // eslint-disable-line no-self-compare
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29).Buffer, (function() { return this; }())))

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	exports.toByteArray = toByteArray;
	exports.fromByteArray = fromByteArray;

	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

	function init() {
	  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	  for (var i = 0, len = code.length; i < len; ++i) {
	    lookup[i] = code[i];
	    revLookup[code.charCodeAt(i)] = i;
	  }

	  revLookup['-'.charCodeAt(0)] = 62;
	  revLookup['_'.charCodeAt(0)] = 63;
	}

	init();

	function toByteArray(b64) {
	  var i, j, l, tmp, placeHolders, arr;
	  var len = b64.length;

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4');
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

	  // base64 is 4/3 + up to two characters of the original data
	  arr = new Arr(len * 3 / 4 - placeHolders);

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len;

	  var L = 0;

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
	    arr[L++] = tmp >> 16 & 0xFF;
	    arr[L++] = tmp >> 8 & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  if (placeHolders === 2) {
	    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
	    arr[L++] = tmp & 0xFF;
	  } else if (placeHolders === 1) {
	    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
	    arr[L++] = tmp >> 8 & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  return arr;
	}

	function tripletToBase64(num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
	}

	function encodeChunk(uint8, start, end) {
	  var tmp;
	  var output = [];
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
	    output.push(tripletToBase64(tmp));
	  }
	  return output.join('');
	}

	function fromByteArray(uint8) {
	  var tmp;
	  var len = uint8.length;
	  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
	  var output = '';
	  var parts = [];
	  var maxChunkLength = 16383; // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1];
	    output += lookup[tmp >> 2];
	    output += lookup[tmp << 4 & 0x3F];
	    output += '==';
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
	    output += lookup[tmp >> 10];
	    output += lookup[tmp >> 4 & 0x3F];
	    output += lookup[tmp << 2 & 0x3F];
	    output += '=';
	  }

	  parts.push(output);

	  return parts.join('');
	}

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? nBytes - 1 : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];

	  i += d;

	  e = s & (1 << -nBits) - 1;
	  s >>= -nBits;
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : (s ? -1 : 1) * Infinity;
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
	};

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
	  var i = isLE ? 0 : nBytes - 1;
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = e << mLen | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(34));
	__export(__webpack_require__(52));
	__export(__webpack_require__(54));

/***/ },
/* 34 */
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
	var views_1 = __webpack_require__(35);
	var orange_dom_1 = __webpack_require__(41);
	var orange_1 = __webpack_require__(20);
	var list_item_1 = __webpack_require__(52);
	var progress_1 = __webpack_require__(54);
	//import {AssetsCollection} from '../../models/index';
	var Blazy = __webpack_require__(55);
	exports.FileListEmptyView = views_1.View.extend({
	    className: 'assets-list-empty-view',
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
	        _this._initEvents();
	        _this._initBlazy();
	        return _this;
	    }

	    _createClass(FileListView, [{
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
	            var progress;
	            this.listenTo(this.collection, 'before:fetch', function () {
	                var loader = _this3.el.querySelector('.loader');
	                if (loader) return;
	                loader = document.createElement('div');
	                orange_dom_1.addClass(loader, 'progress');
	                _this3.el.appendChild(loader);
	                progress = new progress_1.Progress({
	                    size: 60,
	                    lineWidth: 6,
	                    el: loader
	                });
	                progress.render();
	            });
	            this.listenTo(this.collection, 'fetch', function () {
	                var loader = _this3.el.querySelector('.progress');
	                if (loader) {
	                    _this3.el.removeChild(loader);
	                }
	                if (progress) {
	                    progress.destroy();
	                }
	            });
	            this.listenTo(this.collection, 'progress', function (e) {
	                if (!e.lengthComputable) {
	                    return;
	                }
	                var pc = 100 / e.total * e.loaded;
	                if (progress) progress.setPercent(pc);
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
	                this.collection.getNextPage();
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
	    className: 'assets-list collection-mode',
	    childView: list_item_1.FileListItemView,
	    emptyView: exports.FileListEmptyView,
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	var baseview_1 = __webpack_require__(36);
	__export(__webpack_require__(40));
	__export(__webpack_require__(36));
	__export(__webpack_require__(46));
	__export(__webpack_require__(47));
	__export(__webpack_require__(48));
	__export(__webpack_require__(49));
	__export(__webpack_require__(50));
	__export(__webpack_require__(51));
	exports.Version = '0.3.1';
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
/* 36 */
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
	var Debug = __webpack_require__(37);
	var debug = Debug('views:baseview');
	var object_1 = __webpack_require__(40);
	var orange_1 = __webpack_require__(20);
	var orange_dom_1 = __webpack_require__(41);
	var util_1 = __webpack_require__(45);
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(38);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return 'WebkitAppearance' in document.documentElement.style ||
	  // is firebug? http://stackoverflow.com/a/398120/376773
	  window.console && (console.firebug || console.exception && console.table) ||
	  // is firefox >= v31?
	  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function (v) {
	  return JSON.stringify(v);
	};

	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

	  if (!useColors) return args;

	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function (match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	  return args;
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch (e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch (e) {}
	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage() {
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}

/***/ },
/* 38 */
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
	exports.humanize = __webpack_require__(39);

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
/* 39 */
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
/* 40 */
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
	var Debug = __webpack_require__(37);
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(42));
	__export(__webpack_require__(43));
	__export(__webpack_require__(44));

/***/ },
/* 42 */
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
/* 43 */
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
	var dom = __webpack_require__(42);
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
/* 44 */
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
	var dom_1 = __webpack_require__(42);

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
/* 45 */
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
/* 46 */
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
	var Debug = __webpack_require__(37);
	var debug = Debug('views:region');
	var object_1 = __webpack_require__(40);
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
/* 47 */
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
	var object_1 = __webpack_require__(40);
	var region_1 = __webpack_require__(46);
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
/* 48 */
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
	var view_1 = __webpack_require__(49);
	var region_manager_1 = __webpack_require__(47);
	var orange_1 = __webpack_require__(20);
	var region_1 = __webpack_require__(46);
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
/* 49 */
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
	var Debug = __webpack_require__(37);
	var debug = Debug('views:view');
	var baseview_1 = __webpack_require__(36);
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
	            this._model = model;
	        }
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
/* 50 */
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
	var Debug = __webpack_require__(37);
	var debug = Debug('views:collectionview');
	var view_1 = __webpack_require__(49);
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
/* 51 */
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
/* 52 */
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
	var views_1 = __webpack_require__(35);
	//import {template} from '../utils';
	//import {getMimeIcon} from '../mime-types';
	//import {AssetsModel} from '../../models/index'
	var orange_1 = __webpack_require__(20);
	var orange_dom_1 = __webpack_require__(41);
	var index_1 = __webpack_require__(53);
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
	            var mime = model.get('mime'); //.replace(/\//, '-')
	            orange_dom_1.removeClass(this.ui['mime'], 'mime-unknown');
	            //mime = getMimeIcon(mime.replace(/\//, '-'));
	            if (!isDir) {
	                orange_dom_1.addClass(this.ui['mime'], mime);
	            }
	            this.ui['name'].textContent = orange_1.truncate(model.get('name') || model.get('filename'), 25);
	            if (/^image\/.*/.test(mime)) {
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
	    className: 'assets-list-item',
	    ui: {
	        remove: '.assets-list-item-close-button',
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
/* 53 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    "list-item": "<a class=\"assets-list-item-close-button\"></a>\n<div class=\"thumbnail-container\">  <i class=\"mime mime-unknown\"></i>\n</div>\n<div class=\"name\"></div>",
	    "list": ""
	};

/***/ },
/* 54 */
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
	var views_1 = __webpack_require__(35);
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
	            /*var draw = (percent) => {
	                if (percent >= newPercent) {
	                    this._percent = newPercent
	                    return
	                }
	                 requestAnimationFrame(() => {
	                    this.ctx.clearRect(0, 0, 100, 100)
	                    this.drawCircle(this.ctx, this.options.background, this.options.lineWidth, 100 / 100);
	                    this.drawCircle(this.ctx, this.options.foreground, this.options.lineWidth, percent / 100);
	                    this.el.querySelector('span').textContent = Math.floor(percent) + '%'
	                    //this._percent = percent
	                    draw(percent + 1)
	                })
	               }
	            //console.log(this._percent, newPercent)
	            draw(this._percent + 1)*/
	            requestAnimationFrame(function () {
	                _this2.ctx.clearRect(0, 0, 100, 100);
	                _this2.drawCircle(_this2.ctx, _this2.options.background, _this2.options.lineWidth, 100 / 100);
	                _this2.drawCircle(_this2.ctx, _this2.options.foreground, _this2.options.lineWidth, percent / 100);
	                _this2.el.querySelector('span').textContent = Math.floor(percent) + '%';
	                //this._percent = percent
	                // draw(percent + 1)
	            });
	        }
	    }, {
	        key: "draw",
	        value: function draw(percent) {
	            this.el.innerHTML = "";
	            //let percent = parseInt(this.el.getAttribute('data-percent')||<any>0);
	            var options = this.options;
	            var canvas = document.createElement('canvas');
	            var span = document.createElement('span');
	            span.textContent = Math.round(percent) + '%';
	            if (typeof G_vmlCanvasManager !== 'undefined') {
	                G_vmlCanvasManager.initElement(canvas);
	            }
	            var ctx = canvas.getContext('2d');
	            canvas.width = canvas.height = options.size;
	            this.el.appendChild(span);
	            this.el.appendChild(canvas);
	            ctx.translate(options.size / 2, options.size / 2); // change center
	            ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg
	            span.style.lineHeight = options.size + 'px';
	            span.style.width = options.size + 'px';
	            span.style.fontSize = options.size / 5 + 'px';
	            //imd = ctx.getImageData(0, 0, 240, 240);
	            var radius = (options.size - options.lineWidth) / 2;
	            var drawCircle = function drawCircle(color, lineWidth, percent) {
	                percent = Math.min(Math.max(0, percent || 1), 1);
	                ctx.beginPath();
	                ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
	                ctx.strokeStyle = color;
	                ctx.lineCap = 'round'; // butt, round or square
	                ctx.lineWidth = lineWidth;
	                ctx.stroke();
	            };
	            drawCircle(options.background, options.lineWidth, 100 / 100);
	            drawCircle(options.foreground, options.lineWidth, percent / 100);
	        }
	    }, {
	        key: "drawCircle",
	        value: function drawCircle(ctx, color, lineWidth, percent) {
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
	            //this.drawCircle(ctx, options.background, options.lineWidth, 100 / 100);
	            //this.drawCircle(ctx, options.foreground, options.lineWidth, 20 / 100);
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
/* 55 */
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

/***/ }
/******/ ])
});
;