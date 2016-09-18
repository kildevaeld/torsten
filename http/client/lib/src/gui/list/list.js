"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var views_1 = require('views');
var orange_dom_1 = require('orange.dom');
var orange_1 = require('orange');
var list_item_1 = require('./list-item');
var progress_1 = require('./progress');
//import {AssetsCollection} from '../../models/index';
var Blazy = require('blazy');
exports.FileListEmptyView = views_1.View.extend({
    className: 'file-list-empty-view',
    template: 'No files uploaded yet.'
});
var FileListView = (function (_super) {
    __extends(FileListView, _super);
    function FileListView(options) {
        _super.call(this, options);
        this.options = options || {};
        this.sort = false;
        this._onSroll = throttle(orange_1.bind(this._onSroll, this), 0);
        this._initBlazy();
    }
    FileListView.prototype.onCollection = function (model) {
        if (model)
            this._initEvents();
    };
    FileListView.prototype._initEvents = function () {
        var _this = this;
        this.listenTo(this, 'childview:click', function (view, model) {
            if (this._current)
                orange_dom_1.removeClass(this._current.el, 'active');
            this._current = view;
            orange_dom_1.addClass(view.el, 'active');
            this.trigger('selected', view, model);
        });
        this.listenTo(this, 'childview:dblclick', function (view, model) {
            if (this._current)
                orange_dom_1.removeClass(this._current.el, 'active');
            this._current = view;
            orange_dom_1.addClass(view.el, 'active');
            this.trigger('selected', view, model);
            this.trigger('dblclick', view, model);
        });
        this.listenTo(this, 'childview:remove', function (view, _a) {
            var model = _a.model;
            if (this.options.deleteable === true) {
                var remove = true;
                if (model.has('deleteable')) {
                    remove = !!model.get('deleteable');
                }
                if (remove)
                    model.remove();
            }
            else {
            }
        });
        this.listenTo(this, 'childview:image', function (view) {
            var _this = this;
            var img = view.$('img')[0];
            if (img.src === img.getAttribute('data-src')) {
                return;
            }
            setTimeout(function () {
                if (elementInView(view.el, _this.el)) {
                    _this._blazy.load(view.$('img')[0]);
                }
            }, 100);
        });
        this.listenTo(this.collection, 'before:fetch', this._showLoaderView);
        this.listenTo(this.collection, 'fetch', this._hideLoaderView);
        this.listenTo(this.collection, 'progress', function (e) {
            if (!e.lengthComputable)
                return;
            if (_this._progress)
                _this._progress.setPercent(100 / e.total * e.loaded);
        });
    };
    FileListView.prototype.onRenderCollection = function () {
        if (this._blazy) {
            this._blazy.revalidate();
        }
        else {
            this._initBlazy();
        }
    };
    FileListView.prototype._showLoaderView = function () {
        if (this._progress)
            return;
        this._progress = new progress_1.Progress({
            size: 60,
            lineWidth: 6
        });
        this.el.appendChild(this._progress.render().el);
        orange_dom_1.addClass(this._progress.el, 'loader');
    };
    FileListView.prototype._hideLoaderView = function () {
        if (!this._progress)
            return;
        this._progress.remove().destroy();
    };
    FileListView.prototype._onSroll = function (e) {
        var index = this.index ? this.index : (this.index = 0), len = this.children.length;
        for (var i = index; i < len; i++) {
            var view = this.children[i], img = view.$('img')[0];
            if (img == null)
                continue;
            if (img.src === img.getAttribute('data-src')) {
                index = i;
            }
            else if (elementInView(img, this.el)) {
                index = i;
                this._blazy.load(img, true);
            }
        }
        this.index = index;
        var el = this.el;
        if (el.scrollTop < (el.scrollHeight - el.clientHeight) - el.clientHeight) {
        }
        else if (this.collection.hasNext()) {
            this.collection.getNextPage();
        }
    };
    FileListView.prototype._initBlazy = function () {
        this._blazy = new Blazy({
            container: '.assets-list',
            selector: 'img',
            error: function (img) {
                if (!img || !img.parentNode)
                    return;
                var m = img.parentNode.querySelector('.mime');
                if (m) {
                    m.style.display = 'block';
                    img.style.display = 'none';
                }
            }
        });
    };
    FileListView.prototype._initHeight = function () {
        var _this = this;
        var parent = this.el.parentElement;
        if (!parent || parent.clientHeight === 0) {
            if (!this._timer) {
                this._timer = setInterval(function () { return _this._initHeight(); }, 200);
            }
            return;
        }
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = void 0;
        }
        this.el.style.height = parent.clientHeight + 'px';
    };
    FileListView.prototype.onShow = function () {
        this._initHeight();
    };
    FileListView = __decorate([
        views_1.attributes({
            //template: () => templates.list,
            className: 'file-list collection-mode',
            childView: list_item_1.FileListItemView,
            emptyView: exports.FileListEmptyView,
            //childViewContainer: '.file-list-item-container',
            events: {}
        })
    ], FileListView);
    return FileListView;
}(views_1.CollectionView));
exports.FileListView = FileListView;
function elementInView(ele, container) {
    var viewport = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    };
    viewport.bottom = (container.innerHeight || document.documentElement.clientHeight); // + options.offset;
    viewport.right = (container.innerWidth || document.documentElement.clientWidth); // + options.offset;
    var rect = ele.getBoundingClientRect();
    return (
    // Intersection
    rect.right >= viewport.left
        && rect.bottom >= viewport.top
        && rect.left <= viewport.right
        && rect.top <= viewport.bottom) && !ele.classList.contains('b-error');
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
