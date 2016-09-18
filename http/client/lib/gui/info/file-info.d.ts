import { View, ViewOptions } from 'views';
import { FileInfoModel } from '../collection';
import { IClient } from '../../types';
export interface FileInfoViewOptions extends ViewOptions {
    client: IClient;
}
export declare class FileInfoView extends View<HTMLDivElement> {
    options: FileInfoViewOptions;
    __rendered: boolean;
    model: FileInfoModel;
    client: IClient;
    constructor(options: FileInfoViewOptions);
    onModel(model: FileInfoModel): this;
    onRender(): void;
    clear(): this;
    _update_ui(model: FileInfoModel): this;
}
