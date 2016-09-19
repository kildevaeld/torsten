"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const views_1 = require('views');
const orange_dom_1 = require('orange.dom');
let DropZone = class DropZone extends views_1.View {
    constructor(options = {}) {
        super(options);
    }
    _onDragEnter(e) {
        orange_dom_1.addClass(this.el, 'drag-enter');
        e.preventDefault();
        e.stopPropagation();
    }
    _onDragEnd(e) {
        orange_dom_1.removeClass(this.el, 'drag-enter');
        e.preventDefault();
        e.stopPropagation();
    }
    _onDrop(e) {
        orange_dom_1.removeClass(this.el, 'drag-enter');
        console.log('drop', e.dataTransfer.files);
        e.preventDefault();
        e.stopPropagation();
        this.triggerMethod('drop', e.dataTransfer.files[0]);
    }
};
DropZone = __decorate([
    views_1.events({
        dragenter: '_onDragEnter',
        dragleave: '_onDragEnd',
        dragstart: '_onDragEnter',
        drop: '_onDrop',
        drag: '_onDragEnter',
        dragover: '_onDragEnter'
    }), 
    __metadata('design:paramtypes', [Object])
], DropZone);
exports.DropZone = DropZone;
