import {Stream} from 'stream';

export function stream() {
  var stream: any = new Stream();

  stream.writable = true;
  stream.readable = true;

  stream.write = function(data) {
    //console.log("write")
    stream.emit("data", data)
  }

  stream.end = function() {
    //console.log("end")
    stream.emit("end")
  }

  stream.destroy = function() {
    //console.log("destroy")
    stream.emit("close")
  }

  return stream;
}