import { View, ViewOptions } from 'views';
import { ICropping } from './types';
export interface CropPreViewOptions extends ViewOptions {
    aspectRatio?: number;
}
export declare class CropPreView extends View<HTMLDivElement> {
    protected _cropping: ICropping;
    private size;
    options: CropPreViewOptions;
    cropping: ICropping;
    constructor(options?: CropPreViewOptions);
    render(): this;
    update(): Promise<this>;
}
