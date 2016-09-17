export declare class TorstenClientError extends Error {
    message: string;
    constructor(message: string);
}
export declare function createError(msg: string): TorstenClientError;
