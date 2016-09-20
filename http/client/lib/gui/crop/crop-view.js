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
const cropperjs_1 = require('cropperjs');
const types_1 = require('./types');
const utils_1 = require('../utils');
const orange_dom_1 = require('orange.dom');
const orange_1 = require('orange');
const emptyImage = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
function isFunction(a) {
    return (typeof a === 'function');
}
let CropView = class CropView extends views_1.View {
    constructor(options = { resize: false }) {
        super(options);
        this.options = options;
    }
    get cropper() {
        if (this._cropper != null)
            return this._cropper;
        if (this.ui['image'] == null)
            return null;
        return this.activate()._cropper;
    }
    get cropping() {
        return this._cropping;
    }
    set cropping(cropping) {
        this._cropping = cropping;
        if (this.options.previewView)
            this.options.previewView.cropping = cropping;
    }
    setModel(model) {
        if (this.ui['image'] == null)
            return this;
        this.deactivate();
        let image = this.ui['image'];
        image.style.display = 'none';
        if (model == null) {
            image.src = null;
            if (this.model)
                this.stopListening(this.model);
            this._model = model;
            return;
        }
        super.setModel(model);
        //image.src = model.getURL();
        this._updateImage()
            .then((loaded) => {
            if (loaded)
                image.style.display = 'block';
            return loaded;
        }).then((loaded) => {
            if (!loaded)
                return;
            let cropping = model.get('meta.cropping');
            if (cropping) {
                this.cropping = cropping;
            }
            else if (this.options.aspectRatio != null) {
                utils_1.getImageSize(image).then(size => {
                    this.cropping = types_1.getCropping(size, this.options.aspectRatio);
                    //this.triggerMethod('crop', cropping);
                }).catch(e => {
                    this.trigger('error', e);
                });
            }
        });
        return this;
    }
    activate() {
        if (this._cropper != null) {
            return this;
        }
        let o = this.options;
        let opts = {
            crop: e => {
                this._cropping = e.detail;
                this.triggerMethod('crop', e.detail);
                if (isFunction(o.crop))
                    o.crop(e);
            },
            data: this.cropping,
            built: () => {
                this.triggerMethod('built');
                if (isFunction(o.built))
                    o.built();
            },
            cropstart: e => {
                this.triggerMethod('cropstart');
                if (isFunction(o.cropstart))
                    o.cropstart(e);
            },
            cropmove: e => {
                this.triggerMethod('cropmove', e);
                if (isFunction(o.cropmove))
                    o.cropmove(e);
            },
            cropend: e => {
                this.triggerMethod('cropend', e);
                if (isFunction(o.cropend))
                    o.cropend(e);
            }
        };
        opts = orange_1.extend({}, this.options, opts);
        this._cropper = new cropperjs_1.default(this.ui['image'], opts);
        return this;
    }
    deactivate() {
        if (this._cropper) {
            this._cropper.destroy();
            this._cropper = void 0;
        }
        return this;
    }
    toggle() {
        return this._cropper != null ? this.deactivate() : this.activate();
    }
    onCrop(cropping) {
        if (this.options.previewView) {
            this.options.previewView.cropping = cropping;
        }
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
        return this;
    }
    _updateImage() {
        let img = this.el.querySelector('img');
        if (this.model === null) {
            img.src = emptyImage;
            return Promise.resolve(false);
        }
        this.triggerMethod('before:image');
        img.src = this.model.url;
        return orange_dom_1.imageLoaded(img).then((loaded) => {
            this.triggerMethod('image', loaded);
            return loaded;
        }).catch(e => {
            this.triggerMethod('error', new Error('image not loaded'));
            return Promise.resolve(false);
        });
    }
    destroy() {
        this.deactivate();
        super.destroy();
    }
};
CropView = __decorate([
    views_1.attributes({
        className: 'torsten cropping-view',
        ui: {
            image: 'img'
        }
    }), 
    __metadata('design:paramtypes', [Object])
], CropView);
exports.CropView = CropView;
