"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TorstenClientError = (function (_super) {
    __extends(TorstenClientError, _super);
    function TorstenClientError(message) {
        _super.call(this, message);
        this.message = message;
    }
    return TorstenClientError;
}(Error));
exports.TorstenClientError = TorstenClientError;
function createError(msg) {
    return new TorstenClientError(msg);
}
exports.createError = createError;
