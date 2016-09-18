import { CollectionView, CollectionViewOptions } from 'views';
import { FileCollection } from '../collection';
export interface FileListOptions extends CollectionViewOptions {
    deleteable?: boolean;
}
export declare const FileListEmptyView: {};
export declare class FileListView extends CollectionView<HTMLDivElement> {
    private _current;
    private _blazy;
    private _timer;
    private _progress;
    private index;
    options: FileListOptions;
    collection: FileCollection;
    constructor(options?: FileListOptions);
    onCollection(model: any): void;
    private _initEvents();
    onRenderCollection(): void;
    private _showLoaderView();
    private _hideLoaderView();
    private _onSroll(e);
    private _initBlazy();
    private _initHeight();
    onShow(): void;
}
