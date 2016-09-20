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
const types_1 = require('./types');
const utils_1 = require('../utils');
let CropPreView = class CropPreView extends views_1.View {
    constructor(options = {}) {
        super(options);
        this.options = options;
    }
    set cropping(cropping) {
        this._cropping = cropping;
        this.update();
    }
    get cropping() {
        return this._cropping;
    }
    render() {
        this.triggerMethod('before:render');
        this.undelegateEvents();
        let image = this.el.querySelector('img');
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
    update() {
        this.triggerMethod('before:update');
        var img = this.ui['image'];
        return utils_1.getImageSize(img)
            .then(size => {
            if (this.ui['image'] == null)
                return this;
            let el = this.el;
            if (this._cropping == null) {
                if (this.options.aspectRatio == null) {
                    return this;
                }
                this._cropping = types_1.getCropping(size, this.options.aspectRatio);
            }
            let cropping = this._cropping;
            let cw = el.clientWidth, ch = el.clientHeight, rx = cw / cropping.width, ry = ch / cropping.height;
            let width = size.width, height = size.height;
            let e = {
                width: Math.round(rx * width) + 'px',
                height: Math.round(ry * height) + 'px',
                marginLeft: '-' + Math.round(rx * cropping.x) + 'px',
                marginTop: '-' + Math.round(ry * cropping.y) + 'px'
            };
            for (let key in e) {
                img.style[key] = e[key];
            }
            this.triggerMethod('update');
        });
    }
};
CropPreView = __decorate([
    views_1.attributes({
        className: 'torsten cropping-preview',
        ui: {
            image: 'img'
        }
    }), 
    __metadata('design:paramtypes', [Object])
], CropPreView);
exports.CropPreView = CropPreView;
