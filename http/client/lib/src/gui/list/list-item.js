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
//import {template} from '../utils';
//import {getMimeIcon} from '../mime-types';
//import {fileModel} from '../../models/index'
var orange_1 = require('orange');
var orange_dom_1 = require('orange.dom');
var index_1 = require('../templates/index');
var FileListItemView = (function (_super) {
    __extends(FileListItemView, _super);
    function FileListItemView() {
        _super.apply(this, arguments);
    }
    FileListItemView.prototype.onRender = function () {
        var _this = this;
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
            var img_1 = new Image();
            img_1.src = "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI=";
            //img.setAttribute('data-src', `${url}?thumbnail=true`)
            this.model.open({ thumbnail: true })
                .then(function (blob) {
                img_1.setAttribute('data-src', URL.createObjectURL(blob));
                _this.ui['mime'].parentNode.insertBefore(img_1, _this.ui['mime']);
                _this.ui['mime'].style.display = 'none';
                _this.trigger('image');
            });
        }
        //let url = model.getURL();
        /*let img = new Image();
        img.src = "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI="
        img.setAttribute('data-src', `${url}?thumbnail=true`)*/
        //*/
    };
    FileListItemView.prototype._onClick = function (e) {
        e.preventDefault();
        var target = e.target;
        if (target === this.ui['remove'])
            return;
        this.triggerMethod('click', this.model);
    };
    FileListItemView.prototype._onDblClick = function (e) {
        this.triggerMethod('dblclick', this.model);
    };
    FileListItemView = __decorate([
        views_1.attributes({
            template: function () { return index_1["default"]['list-item']; },
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
        })
    ], FileListItemView);
    return FileListItemView;
}(views_1.View));
exports.FileListItemView = FileListItemView;
