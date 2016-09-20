"use strict";
function getCropping(size, ratio) {
    let width = size.width, height = size.height;
    let nh = height, nw = width;
    if (width > height) {
        nh = width / ratio;
    }
    else {
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
exports.getCropping = getCropping;
