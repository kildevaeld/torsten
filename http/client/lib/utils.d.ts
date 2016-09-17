export declare class Buffer {
    static isBuffer(a: any): boolean;
    length: number;
}
export declare class ReadableStream {
}
export declare const isNode: boolean;
export { isObject, isString, isFunction } from 'orange';
export declare function isBuffer(a: any): a is Buffer;
export declare function isFormData(a: any): a is FormData;
export declare function isReadableStream(a: any): a is ReadableStream;
export declare function isFile(a: any): a is File;
export declare function readBlobAsText(blob: any): Promise<{}>;
export declare module path {
    function join(...parts: string[]): string;
    function base(path: string): string;
    function dir(path: string): string;
}
