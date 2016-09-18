"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var error_1 = require('../error');
var TorstenGuiError = (function (_super) {
    __extends(TorstenGuiError, _super);
    function TorstenGuiError() {
        _super.apply(this, arguments);
    }
    return TorstenGuiError;
}(error_1.TorstenClientError));
exports.TorstenGuiError = TorstenGuiError;
