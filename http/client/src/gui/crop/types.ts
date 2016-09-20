
export interface ICropping {
    x: number;
    y: number;
    width: number;
    height: number;
    rotate: number;
    scaleX: number;
    scaleY: number;
}

export interface ICropper {
    getCroppedCanvas(o?): any;
    getCanvasData(): any;
    getContainerData(): any;
    destroy();
} 


export function getCropping(size: { width: number; height: number; }, ratio: number) {

    let width = size.width,
        height = size.height;

    let nh = height, nw = width;
    if (width > height) {
        nh = width / ratio;
    } else {
        nw = height * ratio;
    }

    return {
        x: 0,
        y: 0,
        width: nw,
        height: nh,
        rotate: 0,
        scaleX: 1,
        scaleY: 1
    };
}