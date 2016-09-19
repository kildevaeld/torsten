"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const views_1 = require('views');
//import {template} from '../utils';
//import {getMimeIcon} from '../mime-types';
//import {fileModel} from '../../models/index'
const orange_1 = require('orange');
const orange_dom_1 = require('orange.dom');
const index_1 = require('../templates/index');
const mimetypes_1 = require('../gallery/mimetypes');
let FileListItemView = class FileListItemView extends views_1.View {
    onRender() {
        let model = this.model;
        let isDir = model.get('is_dir');
        orange_dom_1.removeClass(this.ui['mime'], 'mime-unknown');
        if (isDir) {
            orange_dom_1.addClass(this.ui['mime'], 'mime-folder');
        }
        else {
            let mime = mimetypes_1.getMimeIcon(model.get('mime')); //model.get('mime').replace(/\//, '-')
            orange_dom_1.addClass(this.ui['mime'], mime);
        }
        this.ui['name'].textContent = orange_1.truncate(model.get('name') || model.get('filename'), 25);
        if (/^image\/.*/.test(model.get('mime'))) {
            let img = new Image();
            img.src = "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI=";
            //img.setAttribute('data-src', `${url}?thumbnail=true`)
            this.model.open({ thumbnail: true })
                .then(blob => {
                img.setAttribute('data-src', URL.createObjectURL(blob));
                this.ui['mime'].parentNode.insertBefore(img, this.ui['mime']);
                this.ui['mime'].style.display = 'none';
                this.trigger('image');
            });
        }
        //let url = model.getURL();
        /*let img = new Image();
        img.src = "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI="
        img.setAttribute('data-src', `${url}?thumbnail=true`)*/
        //*/
    }
    _onClick(e) {
        e.preventDefault();
        let target = e.target;
        if (target === this.ui['remove'])
            return;
        this.triggerMethod('click', this.model);
    }
    _onDblClick(e) {
        this.triggerMethod('dblclick', this.model);
    }
};
FileListItemView = __decorate([
    views_1.attributes({
        template: () => index_1.default['list-item'],
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
    }), 
    __metadata('design:paramtypes', [])
], FileListItemView);
exports.FileListItemView = FileListItemView;
