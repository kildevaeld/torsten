
import {View, attributes, ViewOptions} from 'views';
import {ICropping,getCropping} from './types';
import {getImageSize} from '../utils';

export interface CropPreViewOptions extends ViewOptions {
    aspectRatio?: number;
}

@attributes({
    className: 'torsten cropping-preview',
    ui: {
        image: 'img'
    }
})
export class CropPreView extends View<HTMLDivElement> {
    protected _cropping: ICropping;
    private size: { width: number; height: number; };
    options: CropPreViewOptions
    set cropping(cropping: ICropping) {
        this._cropping = cropping;
        this.update();
    }

    get cropping() {
        return this._cropping;
    }
    
    constructor(options:CropPreViewOptions = {}) {
        super(options);
        this.options = options;
    }

    render() {

        this.triggerMethod('before:render');
        
        this.undelegateEvents();
        
        let image = <HTMLImageElement>this.el.querySelector('img');
        
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
        
        var img = <HTMLImageElement>this.ui['image'];
        
        return getImageSize(img)
            .then(size => {

                if (this.ui['image'] == null) return this;
                
                
                let el = this.el;

                if (this._cropping == null) {
                    if (this.options.aspectRatio == null) {
                        return this;
                    }
                    
                    this._cropping = getCropping(size, this.options.aspectRatio);
                   
                }

                let cropping = this._cropping;

                let cw = el.clientWidth,
                    ch = el.clientHeight,
                    rx = cw / cropping.width,
                    ry = ch / cropping.height;
                let width = size.width, height = size.height;

                let e = {
                    width: Math.round(rx * width) + 'px',
                    height: Math.round(ry * height) + 'px',
                    marginLeft: '-' + Math.round(rx * cropping.x) + 'px',
                    marginTop: '-' + Math.round(ry * cropping.y) + 'px'
                }

                for (let key in e) {
                    (<any>img).style[key] = e[key];
                }

                this.triggerMethod('update');
            });

    }

    

}