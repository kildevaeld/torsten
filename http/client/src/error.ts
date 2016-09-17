
export class TorstenClientError extends Error {
    constructor(public message: string) {
        super(message);
    }
}

export function createError(msg: string) {
    return new TorstenClientError(msg);
}