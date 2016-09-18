"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var views_1 = require('views');
var index_1 = require('../templates/index');
var FileInfoView = (function (_super) {
    __extends(FileInfoView, _super);
    function FileInfoView() {
        _super.apply(this, arguments);
    }
    FileInfoView.prototype.onModel = function (model) {
        if (model == null) {
            return this.clear();
        }
        this._update_ui();
    };
    FileInfoView.prototype.onRender = function () {
        this.__rendered = true;
        if (this.model)
            this._update_ui();
    };
    FileInfoView.prototype.clear = function () {
        if (!this.__rendered)
            return this;
        var ui = this.ui;
        ui.name.textContent = '';
        ui.mime.textContent = '';
        ui.size.textContent = '';
        return this;
    };
    FileInfoView.prototype._update_ui = function () {
        if (!this.__rendered)
            return this;
        var ui = this.ui;
        ui.name.textContent = this.model.get('name');
        ui.mime.textContent = this.model.get('mime');
        ui.size.textContent = this.model.get('size');
    };
    FileInfoView = __decorate([
        views_1.attributes({
            template: function () { return index_1["default"]['file-info']; },
            ui: {
                name: '.name',
                mime: 'mimetype',
                size: '.size',
                download: '.download a'
            }
        })
    ], FileInfoView);
    return FileInfoView;
}(views_1.View));
exports.FileInfoView = FileInfoView;
