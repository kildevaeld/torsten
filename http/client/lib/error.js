"use strict";
class TorstenClientError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.TorstenClientError = TorstenClientError;
function createError(msg) {
    return new TorstenClientError(msg);
}
exports.createError = createError;
