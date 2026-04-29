import { Point } from "../math3D";

export type TWIN = {
    LEFT: Number;
    BOTTOM: number;
    WIDTH: number;
    HEIGHT: number;
}

export type TWIN3D = TWIN & {
    CAMERA: Point;
    FOCUS: Point;
}

class Canvas{
    constructor({id, WIN, width = 500, height = 500, callbacks = {} }){
        this.canvas = document.getElementById(id);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');
        this.WIN = WIN;
        const { wheel, mouseup, mousedown, mousemove, mouseleave, click, contextmenu, keydown } = callbacks;
        this.canvas.addEventListener('wheel', wheel);
        this.canvas.addEventListener('mouseup',mouseup);
        this.canvas.addEventListener('mousedown',mousedown);
        this.canvas.addEventListener('mousemove',mousemove);
        this.canvas.addEventListener('mouseleave',mouseleave);
        this.canvas.addEventListener('click', click);
        this.canvas.addEventListener('contextmenu', contextmenu);
        this.canvas.addEventListener('keydown', keydown);

        this.canvasV = document.createElement('canvas');
        this.canvasV.width = width;
        this.canvasV.height = height;
        this.contextV = this.canvasV.getContext('2d');
    }

    // из дек в экр
    xs(x) {
        return (x - this.WIN.LEFT) / this.WIN.WIDTH * this.canvas.width;
    }

    ys(y) {
        return this.canvas.height * (1 - (y - this.WIN.BOTTOM) / this.WIN.HEIGHT);
    }

    // из экр в дек
    sx(x) {
        return x * this.WIN.WIDTH / this.canvas.width;
    }

    sy(y) {
        return -y * this.WIN.HEIGHT / this.canvas.height;
    }

    clear() {
        this.contextV.fillStyle = '#eee';
        this.contextV.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line(x1, y1, x2, y2, color = '#000', width = 1, isDash = false) {
        this.contextV.beginPath();
        this.contextV.strokeStyle = color;
        this.contextV.lineWidth = width;
        if (isDash) {
            this.contextV.setLineDash([10, 5]);
        } else {
            this.contextV.setLineDash([]);
        }
        this.contextV.moveTo(this.xs(x1), this.ys(y1));
        this.contextV.lineTo(this.xs(x2), this.ys(y2));
        this.contextV.closePath();
        this.contextV.stroke();
    }

    point(x, y, color = '#f00', size = 2) {
        this.contextV.beginPath();
        this.contextV.strokeStyle = color;
        this.contextV.fillStyle = color;
        this.contextV.arc(this.xs(x), this.ys(y), size, 0, Math.PI * 2);
        this.contextV.closePath();
        this.contextV.stroke();
        this.contextV.fill();
    }

    angle(x, y, angle, color = '#f00', size = 2) {
        this.contextV.beginPath();
        this.contextV.strokeStyle = color;
        this.contextV.arc(this.xs(x), this.ys(y), size, 0, angle);
        this.contextV.closePath();
        this.contextV.stroke();
    }

    text(x, y, text, color = '#000', font = '22px Times New Roman') {
        this.contextV.font = font;
        this.contextV.fillStyle = color;
        this.contextV.fillText(text, this.xs(x), this.ys(y));
    }

    polygon(points, color = '#f004') {
        if (points.length >= 3) {
            this.contextV.beginPath();
            this.contextV.strokeStyle = color;
            this.contextV.lineWidth = 1;
            this.contextV.fillStyle = color;
            this.contextV.setLineDash([]);
            this.contextV.moveTo(this.xs(points[0].x), this.ys(points[0].y));
            for (let i = 1; i < points.length; i++) {
                this.contextV.lineTo(this.xs(points[i].x), this.ys(points[i].y));
            }
            this.contextV.moveTo(this.xs(points[0].x), this.ys(points[0].y));
            this.contextV.closePath();
            this.contextV.stroke();
            this.contextV.fill();
        }
    }

    render() {
        this.context.drawImage(this.canvasV, 0, 0);
    }
}

export default Canvas;