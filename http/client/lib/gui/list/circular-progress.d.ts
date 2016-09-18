import { View, ViewOptions } from 'views';
import { IProgress } from '../types';
export interface ProgressOptions extends ViewOptions {
    size?: number;
    lineWidth?: number;
    rotate?: number;
    background?: string;
    foreground?: string;
}
export declare class Progress extends View<HTMLDivElement> implements IProgress {
    options: ProgressOptions;
    _percent: number;
    ctx: CanvasRenderingContext2D;
    constructor(options?: ProgressOptions);
    setPercent(percent: number): void;
    private _drawCircle(ctx, color, lineWidth, percent);
    render(): this;
}
