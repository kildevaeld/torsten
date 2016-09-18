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
var orange_1 = require('orange');
var Progress = (function (_super) {
    __extends(Progress, _super);
    function Progress(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.options = orange_1.extend({}, {
            size: 220,
            lineWidth: 15,
            rotate: 0,
            background: '#efefef',
            foreground: '#555555'
        }, options);
        this._percent = 0;
    }
    Progress.prototype.setPercent = function (percent) {
        var _this = this;
        var newPercent = percent;
        var diff = Math.abs(percent - this._percent);
        requestAnimationFrame(function () {
            _this.ctx.clearRect(0, 0, 100, 100);
            _this._drawCircle(_this.ctx, _this.options.background, _this.options.lineWidth, 100 / 100);
            _this._drawCircle(_this.ctx, _this.options.foreground, _this.options.lineWidth, percent / 100);
            _this.el.querySelector('span').textContent = Math.floor(percent) + '%';
        });
    };
    Progress.prototype._drawCircle = function (ctx, color, lineWidth, percent) {
        var radius = (this.options.size - this.options.lineWidth) / 2;
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = 'round'; // butt, round or square
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    };
    Progress.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.innerHTML = "";
        //let percent = parseInt(this.el.getAttribute('data-percent')||<any>0);
        var options = this.options;
        var canvas = document.createElement('canvas');
        var span = document.createElement('span');
        //span.textContent = Math.round(percent) + '%';
        if (typeof (G_vmlCanvasManager) !== 'undefined') {
            G_vmlCanvasManager.initElement(canvas);
        }
        var ctx = canvas.getContext('2d');
        canvas.width = canvas.height = options.size;
        this.el.appendChild(span);
        this.el.appendChild(canvas);
        this.el.style.width = options.size + 'px';
        this.el.style.height = options.size + 'px';
        ctx.translate(options.size / 2, options.size / 2); // change center
        ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg
        span.style.lineHeight = options.size + 'px';
        span.style.width = options.size + 'px';
        span.style.fontSize = options.size / 5 + 'px';
        this.ctx = ctx;
        this.setPercent(0);
        return this;
    };
    Progress = __decorate([
        views_1.attributes({
            className: "progress"
        })
    ], Progress);
    return Progress;
}(views_1.View));
exports.Progress = Progress;
