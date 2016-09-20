"use strict";
function getImageSize(image) {
    const load = () => {
        return new Promise((resolve, reject) => {
            let i = new Image();
            i.onload = () => {
                resolve({
                    width: i.naturalWidth || i.width,
                    height: i.naturalHeight || i.height
                });
            };
            i.onerror = reject;
            i.src = image.src;
        });
    };
    if (image.naturalHeight === undefined) {
        return load();
    }
    else if (image.naturalHeight === 0) {
        return new Promise((resolve, reject) => {
            var time = setTimeout(() => {
                time = null;
                load().then(resolve, reject);
            }, 200);
            image.onload = () => {
                if (time !== null) {
                    clearTimeout(time);
                }
                resolve({
                    width: image.naturalWidth,
                    height: image.naturalHeight
                });
            };
        });
    }
    else {
        return Promise.resolve({
            width: image.naturalWidth,
            height: image.naturalHeight
        });
    }
}
exports.getImageSize = getImageSize;
