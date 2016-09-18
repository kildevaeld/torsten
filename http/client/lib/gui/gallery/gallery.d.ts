import { LayoutView, ViewOptions } from 'views';
import { IClient } from '../../types';
import { FileListView } from '../list/index';
import { FileInfoView } from '../info/index';
import { FileInfoModel, FileCollection } from '../collection';
export interface GalleryViewOptions extends ViewOptions {
    client: IClient;
}
export declare class GalleryView extends LayoutView<HTMLDivElement> {
    options: GalleryViewOptions;
    info: FileInfoView;
    list: FileListView;
    client: IClient;
    collections: FileCollection[];
    private _root;
    root: string;
    private _selected;
    selected: FileInfoModel;
    constructor(options: GalleryViewOptions);
    private _onFileInfoSelected(view, model);
    private _setCollection(collection);
    onRender(): void;
}
