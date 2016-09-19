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
const index_1 = require('../templates/index');
let FileInfoView = class FileInfoView extends views_1.View {
    constructor(options) {
        super(options);
        this.options = options;
        this.client = options.client;
    }
    onModel(model) {
        if (model == null) {
            return this.clear();
        }
        this._update_ui(model);
    }
    onRender() {
        this.__rendered = true;
        if (this.model)
            this._update_ui(this.model);
    }
    clear() {
        if (!this.__rendered)
            return this;
        let ui = this.ui;
        ui.name.textContent = '';
        ui.mime.textContent = '';
        ui.size.textContent = '';
        ui.download.textContent = '';
        this.el.style.opacity = "0";
        return this;
    }
    _update_ui(model) {
        if (!this.__rendered)
            return this;
        let ui = this.ui;
        ui.name.textContent = model.get('name');
        ui.mime.textContent = model.get('mime');
        ui.size.textContent = model.get('size');
        ui.download.textContent = model.get('name');
        let url = this.client.endpoint + model.fullPath + '?download=true';
        ui.download.setAttribute('href', url);
        this.el.style.opacity = "1";
    }
};
FileInfoView = __decorate([
    views_1.attributes({
        className: 'file-info',
        template: () => index_1.default['file-info'],
        ui: {
            name: '.name',
            mime: '.mimetype',
            size: '.size',
            download: '.download a'
        }
    }), 
    __metadata('design:paramtypes', [Object])
], FileInfoView);
exports.FileInfoView = FileInfoView;
