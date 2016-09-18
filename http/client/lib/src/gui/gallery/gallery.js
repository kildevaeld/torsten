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
var orange_1 = require('orange');
var index_1 = require('../list/index');
var index_2 = require('../info/index');
var index_3 = require('../templates/index');
var collection_1 = require('../collection');
var GalleryView = (function (_super) {
    __extends(GalleryView, _super);
    function GalleryView(options) {
        _super.call(this, orange_1.extend({}, options, {
            regions: {
                list: '.gallery-list',
                info: '.gallery-info'
            }
        }));
        this.options = options;
        this.collections = [];
        this.client = options.client;
        this.list = new index_1.FileListView();
        this.info = new index_2.FileInfoView();
        this.listenTo(this.list, 'selected', this._onFileInfoSelected);
    }
    Object.defineProperty(GalleryView.prototype, "root", {
        get: function () { return this._root; },
        set: function (path) {
            if (this._root == path)
                return;
            this._root = path;
            for (var i = 0, ii = this.collections.length; i < ii; i++) {
                this.collections[i].destroy();
            }
            this.collections = [new collection_1.FileCollection(null, {
                    client: this.client,
                    path: this._root
                })];
            this._setCollection(this.collections[0]);
            this.collections[0].fetch();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GalleryView.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (model) {
            this._selected = model;
            this.info.model = model;
        },
        enumerable: true,
        configurable: true
    });
    GalleryView.prototype._onFileInfoSelected = function (model) {
        this.selected = model;
    };
    GalleryView.prototype._setCollection = function (collection) {
        this.list.collection = collection;
    };
    GalleryView.prototype.onRender = function () {
        this.regions['list'].show(this.list);
        this.regions['info'].show(this.info);
    };
    GalleryView = __decorate([
        views_1.attributes({
            template: function () { return index_3["default"]['gallery']; },
            className: 'file-gallery'
        })
    ], GalleryView);
    return GalleryView;
}(views_1.LayoutView));
exports.GalleryView = GalleryView;
