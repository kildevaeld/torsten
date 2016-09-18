
import {View, attributes, ViewOptions} from 'views';
//import {template} from '../utils';
//import {getMimeIcon} from '../mime-types';
//import {fileModel} from '../../models/index'
import {truncate} from 'orange';
import {addClass, removeClass} from 'orange.dom';
import templates from '../templates/index';
import {FileInfoModel} from '../collection'

@attributes({
    template: () => templates['list-item'],
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
export class FileListItemView extends View<HTMLDivElement> {
    model: FileInfoModel;

    onRender() {
        let model = this.model

        let isDir = model.get('is_dir');
        let mime = model.get('mime') //.replace(/\//, '-')


        removeClass(this.ui['mime'], 'mime-unknown')
        //mime = getMimeIcon(mime.replace(/\//, '-'));
        if (!isDir) {
            addClass(this.ui['mime'], mime);
        }

        this.ui['name'].textContent = truncate(model.get('name') || model.get('filename'), 25)

        if (/^image\/.*/.test(mime)) {
            let img = new Image();
            img.src = "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI="
            //img.setAttribute('data-src', `${url}?thumbnail=true`)

            this.model.open({ thumbnail: true })
                .then(blob => {
                    img.setAttribute('data-src', URL.createObjectURL(blob));
                    this.ui['mime'].parentNode.insertBefore(img, this.ui['mime']);
                    this.ui['mime'].style.display = 'none'
                    this.trigger('image')
                })


        }




        //let url = model.getURL();

		/*let img = new Image();
		img.src = "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI="
		img.setAttribute('data-src', `${url}?thumbnail=true`)*/

        //*/
    }

    private _onClick(e: Event) {
        e.preventDefault();
        let target = e.target;
        if (target === this.ui['remove']) return;

        this.triggerMethod('click', this.model);
    }

    private _onDblClick(e) {
        this.triggerMethod('dblclick', this.model);
    }

}
