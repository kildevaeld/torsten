
import {LayoutView, attributes, ViewOptions} from 'views';
import {extend} from 'orange';
import {IClient} from '../../types'

import {FileListView} from '../list/index';
import {FileInfoView} from '../info/index'
import templates from '../templates/index';
import {FileInfoModel, FileCollection} from '../collection';
import {DropZone} from './dropzone';

export interface GalleryViewOptions extends ViewOptions {
    client: IClient;
    showDirectories: boolean;
}

@attributes({
    template: () => templates['gallery'],
    className: 'file-gallery'
})
export class GalleryView extends LayoutView<HTMLDivElement> {
    info: FileInfoView;
    list: FileListView;
    drop: DropZone;

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
        this.collections[0].fetch({
                params: {
                    show_hidden: false
                }
            });
    }

    get root() { return this._root; }

    private _selected: FileInfoModel;
    get selected() {
        return this._selected;
    }

    set selected(model:FileInfoModel) {
        this._selected = model;
        this.info.model = model.get('is_dir') ? null : model;
        
    }  

    constructor(public options: GalleryViewOptions) {

        super(extend({}, options, {
            regions: {
                list: '.gallery-list',
                info: '.gallery-info'
            }
        }));

        this.client = options.client;

        this.list = new FileListView({
            showDirectories: options.showDirectories||false
        });

        this.info = new FileInfoView({
            client: this.client
        });

        this.drop = new DropZone({
            el: this.el
        });

        this.listenTo(this.list, 'selected', this._onFileInfoSelected);
        this.listenTo(this.list, 'remove', this._onFileInfoRemoved)
        this.listenTo(this.drop, 'drop', this._onFileDrop);
    }

    private _onFileInfoSelected(view, model:FileInfoModel) {
        this.selected = model;
    }

    private _onFileInfoRemoved(view, model:FileInfoModel) {
        
        this.client.remove(model.fullPath)
        .then( res => {
            if (res.message === 'ok') {
                model.remove();
            }
            console.log(res)
        })
    }

    private _setCollection(collection:FileCollection) {
        this.list.collection = collection;
    }

    private _onFileDrop(file:File) {
        console.log(file);
        let collection = this.collections[this.collections.length - 1];

        collection.upload(file.name, file, {
            progress: (e) => {
                let pc = 100 / e.total * e.loaded;
                console.log(pc);
            }
        });
    }

    onRender() {
        this.regions['list'].show(this.list);
        this.regions['info'].show(this.info);
        this.drop.render();
    }
}