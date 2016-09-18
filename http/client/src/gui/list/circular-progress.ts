declare var G_vmlCanvasManager;
import {View, ViewOptions, attributes} from 'views'
import {extend} from 'orange';
import {IProgress} from '../types';

export interface ProgressOptions extends ViewOptions {
    size?: number;
    lineWidth?: number;
    rotate?: number;
    background?: string;
    foreground?: string
}


@attributes({
    className: "progress"
})
export class Progress extends View<HTMLDivElement> implements IProgress {
    options: ProgressOptions;
    _percent: number;
    ctx: CanvasRenderingContext2D;
    constructor(options: ProgressOptions = {}) {
        super(options)
        this.options = extend({}, {
            size: 220,
            lineWidth: 15,
            rotate: 0,
            background: '#efefef',
            foreground: '#555555'
        }, options);
        this._percent = 0;
    }

    setPercent(percent: number) {

        let newPercent = percent;
        let diff = Math.abs(percent - this._percent)

        requestAnimationFrame(() => {
            this.ctx.clearRect(0, 0, 100, 100)
            this._drawCircle(this.ctx, this.options.background, this.options.lineWidth, 100 / 100);
            this._drawCircle(this.ctx, this.options.foreground, this.options.lineWidth, percent / 100);
            this.el.querySelector('span').textContent = Math.floor(percent) + '%'
        });

    }

    

    private _drawCircle(ctx:CanvasRenderingContext2D, color, lineWidth, percent) {
        var radius = (this.options.size - this.options.lineWidth) / 2;
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = 'round'; // butt, round or square
        ctx.lineWidth = lineWidth
        ctx.stroke();
    }

    render() {
        super.render();

        this.el.innerHTML = "";

        //let percent = parseInt(this.el.getAttribute('data-percent')||<any>0);
        var options = this.options
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

        span.style.fontSize = options.size / 5 + 'px'

        this.ctx = ctx;

        this.setPercent(0)

        return this;
    }
}