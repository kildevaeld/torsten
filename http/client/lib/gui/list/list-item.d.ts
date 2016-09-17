import { View } from 'views';
import { FileInfoModel } from '../collection';
export declare class FileListItemView extends View<HTMLDivElement> {
    model: FileInfoModel;
    onRender(): void;
    private _onClick(e);
    private _onDblClick(e);
}
