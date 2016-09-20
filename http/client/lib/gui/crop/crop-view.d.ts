import { View, ViewOptions } from 'views';
import { ICropper, ICropping } from './types';
import { FileInfoModel } from '../collection';
import { CropPreView } from './crop-preview';
export interface CropViewOptions extends ViewOptions, cropperjs.CropperOptions {
    resize: boolean;
    previewView?: CropPreView;
}
export declare class CropView extends View<HTMLDivElement> {
    model: FileInfoModel;
    private _cropper;
    protected _cropping: ICropping;
    options: CropViewOptions;
    cropper: ICropper;
    cropping: ICropping;
    setModel(model: any): this;
    constructor(options?: CropViewOptions);
    activate(): this;
    deactivate(): this;
    toggle(): this;
    onCrop(cropping: cropperjs.Data): void;
    render(): this;
    private _updateImage();
    destroy(): void;
}
