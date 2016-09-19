
import {View, attributes, ViewOptions} from 'views';
import templates from '../templates/index';
import {FileInfoModel} from '../collection';
import {IClient} from '../../types'
import {Html} from 'orange.dom';


export interface FileInfoViewOptions extends ViewOptions {
    client: IClient;
}

@attributes({
    className: 'file-info',
    template: () => templates['file-info'],
    ui: {
        name: '.name',
        mime: '.mimetype',
        size: '.size',
        download: '.download a'
    }
})
export class FileInfoView extends View<HTMLDivElement> {
    __rendered: boolean;
    model: FileInfoModel;
    client: IClient;
    constructor(public options:FileInfoViewOptions) {
        super(options);
        this.client = options.client;
    }

    onModel(model: FileInfoModel) {
        if (model == null) {
            return this.clear()
        }
        this._update_ui(model)
    }

    onRender() {
        this.__rendered = true;
        if (this.model) this._update_ui(this.model);
    }

    clear() {
        if (!this.__rendered) return this;
        let ui = <any>this.ui;
        ui.name.textContent = ''
        ui.mime.textContent = ''
        ui.size.textContent = ''
        ui.download.textContent = ''
        this.el.style.opacity = "0";
        return this
    }

    _update_ui(model:FileInfoModel) {
        if (!this.__rendered) return this;
        let ui = <any>this.ui;
        
        ui.name.textContent = model.get('name');
        ui.mime.textContent = model.get('mime');
        ui.size.textContent = model.get('size');
        ui.download.textContent = model.get('name');
        
        let url = this.client.endpoint + model.fullPath + '?download=true';
        ui.download.setAttribute('href', url);
        this.el.style.opacity = "1";
    }

}