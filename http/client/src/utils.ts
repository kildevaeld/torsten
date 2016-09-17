export declare class Buffer {
    static isBuffer(a): boolean;
    length: number;
}
export class ReadableStream { }
export const isNode = !(new Function("try {return this===window;}catch(e){ return false;}"))();


export {isObject, isString, isFunction} from 'orange'

export function isBuffer(a: any): a is Buffer {
    if (isNode) Buffer.isBuffer(a)
    return false
}

export function isFormData(a: any): a is FormData {
    if (isNode) return false;
    return a instanceof FormData;
}

export function isReadableStream(a: any): a is ReadableStream {
    if (typeof a.read === 'function' && a.pipe === 'function') {
        return true
    }
    return false;
}

export function isFile(a: any): a is File {
    if (isNode) return false;
    if (a instanceof File) return true;
    return false;
}

function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
        reader.onload = function () {
            resolve(reader.result)
        }
        reader.onerror = function () {
            reject(reader.error)
        }
    })
}

function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
}

export function readBlobAsText(blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return fileReaderReady(reader)
}

export module path {
    export function join(...parts: string[]) {
        let out = []
        for (let i = 0, ii = parts.length; i < ii; i++) {
            var s = 0, e = parts[i].length;
            if (parts[i] == "" || parts[i] == '') continue;
            if (parts[i][0] === '/') s = 1;
            if (parts[i][e - 1] === '/') e--;

            out.push(parts[i].substring(s, e))
        }
        return '/' + out.join('/');
    }

    export function base(path:string) {
        if (!path) return "";
        let split = path.split('/')
        return split[split.length-1];
    }

    export function dir(path:string) {
        if (!path) return "";
        let split = path.split('/')
        split.pop();
        return join(...split);
    }
}