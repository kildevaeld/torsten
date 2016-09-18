"use strict";
var stream_1 = require('stream');
function stream() {
    var stream = new stream_1.Stream();
    stream.writable = true;
    stream.readable = true;
    stream.write = function (data) {
        //console.log("write")
        stream.emit("data", data);
    };
    stream.end = function () {
        //console.log("end")
        stream.emit("end");
    };
    stream.destroy = function () {
        //console.log("destroy")
        stream.emit("close");
    };
    return stream;
}
exports.stream = stream;
