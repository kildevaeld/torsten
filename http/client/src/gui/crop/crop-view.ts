import {View, ViewOptions, attributes} from 'views';
import Cropper from 'cropperjs';
import {ICropper, ICropping, getCropping} from './types';
import {FileInfoModel} from '../collection';
import {CropPreView} from './crop-preview';
import {getImageSize} from '../utils';
import {imageLoaded} from 'orange.dom';
import {extend} from 'orange';


const emptyImage = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

function isFunction(a: any): a is Function {
    return (typeof a === 'function');
}

export interface CropViewOptions extends ViewOptions, cropperjs.CropperOptions {
    resize: boolean;
    previewView?: CropPreView;

}

@attributes({
    className: 'torsten cropping-view',
    ui: {
        image: 'img'
    }
})
export class CropView extends View<HTMLDivElement> {
    model: FileInfoModel;
    private _cropper: ICropper;
    protected _cropping: ICropping;
    options: CropViewOptions;

    get cropper() {
        if (this._cropper != null) return this._cropper;
        if (this.ui['image'] == null) return null;

        return this.activate()._cropper;
    }

    get cropping() {
        return this._cropping;
    }

    set cropping(cropping: ICropping) {
        this._cropping = cropping
        if (this.options.previewView) this.options.previewView.cropping = cropping;
    }

    setModel(model) {

        if (this.ui['image'] == null) return this;

        this.deactivate();

        let image = <HTMLImageElement>this.ui['image'];

        image.style.display = 'none';
        if (model == null) {
            image.src = null;
            if (this.model) this.stopListening(this.model);
            this._model = model;
            return;
        }

        super.setModel(model);

        //image.src = model.getURL();


        this._updateImage()
            .then((loaded) => {
                if (loaded) image.style.display = 'block';
                return loaded
            }).then((loaded) => {
                if (!loaded) return;
                let cropping = model.get('meta.cropping');
                if (cropping) {
                    this.cropping = cropping;
                    //this.triggerMethod('crop', cropping);

                } else if (this.options.aspectRatio != null) {

                    getImageSize(image).then(size => {
                        this.cropping = getCropping(size, this.options.aspectRatio);

                        //this.triggerMethod('crop', cropping);
                    }).catch(e => {
                        this.trigger('error', e);
                    });
                }
            })


        return this;
    }

    constructor(options: CropViewOptions = { resize: false }) {
        super(options);
        this.options = options;
    }

    activate() {

        if (this._cropper != null) {
            return this;
        }

        let o = this.options;

        let opts: cropperjs.CropperOptions = {
            crop: e => {
                this._cropping = e.detail;
                this.triggerMethod('crop', e.detail)
                if (isFunction(o.crop)) o.crop(e);
            },
            data: this.cropping,
            built: () => {
                this.triggerMethod('built');
                if (isFunction(o.built)) o.built();
            },
            cropstart: e => {
                this.triggerMethod('cropstart');
                if (isFunction(o.cropstart)) o.cropstart(e);
            },
            cropmove: e => {
                this.triggerMethod('cropmove', e);
                if (isFunction(o.cropmove)) o.cropmove(e);
            },
            cropend: e => {
                this.triggerMethod('cropend', e);
                if (isFunction(o.cropend)) o.cropend(e);
            }
        };

        opts = extend({}, this.options, opts);
        
        this._cropper = new Cropper(<HTMLImageElement>this.ui['image'], opts);

        return this;
    }

    deactivate()  {
        if (this._cropper) {
            this._cropper.destroy();
            this._cropper = void 0;
        }
        return this;
    }

    toggle() {
        return this._cropper != null ? this.deactivate() : this.activate();
    }

    onCrop(cropping: cropperjs.Data) {

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

    private _updateImage() {
        let img = <HTMLImageElement>this.el.querySelector('img');
        if (this.model === null) {
            img.src = emptyImage;
            return Promise.resolve(false);
        }
        this.triggerMethod('before:image');
        
        img.src = this.model.url;
        return imageLoaded(img).then((loaded) => {
            this.triggerMethod('image', loaded)
            return loaded;
        }).catch(e => {
            this.triggerMethod('error', new Error('image not loaded'))
            return Promise.resolve(false);
        });
    }

    destroy() {
        this.deactivate();
        super.destroy();

    }

}