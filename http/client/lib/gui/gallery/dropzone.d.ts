import { View, ViewOptions } from 'views';
export interface DropZoneOptions extends ViewOptions {
}
export declare class DropZone extends View<HTMLDivElement> {
    constructor(options?: DropZoneOptions);
    private _onDragEnter(e);
    private _onDragEnd(e);
    private _onDrop(e);
}
