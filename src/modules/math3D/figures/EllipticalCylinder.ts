import { Figure, Point, Edge, Polygon } from "../entities";

const sin = (x: number): number => Math.sin(x);
const cos = (x: number): number => Math.cos(x);

type TEllipticalCylinder = {
    a: number,
    h: number,
    count: number,
    color: string,
}

class EllipticalCylinder extends Figure {
    a: number = 4;
    h: number = 10;
    count: number = 30;
    color: string = '#00ff00';
    constructor() {
        super();
        this.init({
            a: this.a,
            h: this.h,
            count: this.count,
            color: this.color,
        });        
    }

    init({a, h, count, color}: TEllipticalCylinder): void {
        const PI = Math.PI;
        for (let t = 0; t < 2 * PI; t += 2 * PI / count) {
                const x = a * cos(t);
                const y = a * sin(t);
                for (let u = 0; u < h; u++){
                    const z = u;
                    this.points.push(new Point(x, z, y));
                }
        }


        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i + 1] && !((i + 1) % h === 0)) {
                this.edges.push(new Edge(this.points[i], this.points[i + 1]));
            }
            if (this.points[i + h]) {
                this.edges.push(new Edge(this.points[i], this.points[i + h]));
            }
        }

        for (let i = 0; i < h; i++) {
            this.edges.push(new Edge(this.points[i], this.points[this.points.length + i - h]));
        }


        for (let i = 0; i < this.points.length; i++) {
            if ((i + 1) % h === 0 && this.points[i + 1 - h] && this.points[i + h]){
                this.polygons.push(new Polygon([
                    this.points[i],
                    this.points[i + 1 - h],
                    this.points[i + 1],
                    this.points[i + h],
                ], color));
            } else {
                if (this.points[i + 1 + h]) {
                    this.polygons.push(new Polygon([
                    this.points[i],
                    this.points[i + 1],
                    this.points[i + 1 + h],
                    this.points[i + h]], color));
                }
            }
        }

        for (let i = 0; i < h; i++) {
            if (this.points[this.points.length - h + 1 + i]) {
                this.polygons.push(new Polygon([
                    this.points[i],
                    this.points[i + 1],
                    this.points[this.points.length - h + 1 + i],
                    this.points[this.points.length - h + i]], color));    
            }
        }
    }
}

export default EllipticalCylinder;