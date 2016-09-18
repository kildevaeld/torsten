
import {LayoutView, attributes, ViewOptions} from 'views';
import {extend} from 'orange';
import {IClient} from '../../types'

import {FileListView} from '../list/index';
import {FileInfoView} from '../info/index'
import templates from '../templates/index';
import {FileInfoModel, FileCollection} from '../collection';

export interface GalleryViewOptions extends ViewOptions {
    client: IClient;
}

@attributes({
    template: () => templates['gallery'],
    className: 'file-gallery'
})
export class GalleryView extends LayoutView<HTMLDivElement> {
    info: FileInfoView;
    list: FileListView;
    client: IClient;
    collections: FileCollection[] = [];

    

    private _root: string;
    set root (path:string) {
        if (this._root == path) return;
        this._root = path;

        for (let i = 0, ii = this.collections.length; i < ii; i++) {
            this.collections[i].destroy();
        }

        this.collections = [new FileCollection(null, {
            client: this.client,
            path: this._root
        })];

        this._setCollection(this.collections[0]);
        this.collections[0].fetch();
    }

    get root() { return this._root; }

    private _selected: FileInfoModel;
    get selected() {
        return this._selected;
    }

    set selected(model:FileInfoModel) {
        this._selected = model;
        this.info.model = model;
    }  

    constructor(public options: GalleryViewOptions) {

        super(extend({}, options, {
            regions: {
                list: '.gallery-list',
                info: '.gallery-info'
            }
        }));

        this.client = options.client;

        this.list = new FileListView();
        this.info = new FileInfoView({
            client: this.client
        });

        this.listenTo(this.list, 'selected', this._onFileInfoSelected);

    }

    private _onFileInfoSelected(view, model:FileInfoModel) {
        this.selected = model;
    }

    private _setCollection(collection:FileCollection) {
        this.list.collection = collection;
    }

    onRender() {
        this.regions['list'].show(this.list);
        this.regions['info'].show(this.info);
    }
}