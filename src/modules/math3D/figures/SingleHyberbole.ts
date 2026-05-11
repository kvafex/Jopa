import { Figure, Point, Edge, Polygon } from "../entities";

const sinh = (x: number): number => Math.sinh(x);
const cosh = (x: number): number => Math.cosh(x);
const sin = (x: number): number => Math.sin(x);
const cos = (x: number): number => Math.cos(x);

type TSingleHyperbole = {
    x0: number,
    y0: number, 
    z0: number, 
    a: number, 
    b: number, 
    c: number, 
    count: number, 
    color: string
}

class SingleHyperbole extends Figure {
    x: number = 0;
    y: number = 0;
    z: number = 0;
    a: number = 1;
    b: number = 1;
    c: number = 1;
    count: number = 20;
    color: string = '#ffff00';
    constructor() {
        super();
        this.init({
            x0: this.x,
            y0: this.y,
            z0: this.z,
            a: this.a,
            b: this.b,
            c: this.c,
            count: this.count,
            color: this.color,
        });
    }

    init({x0, y0, z0, a, b, c, count, color}: TSingleHyperbole): void {
        const dPI = Math.PI * 2 / count;
        for (let i = 0; i <= Math.PI ; i += dPI) {
            for (let j = 0; j < Math.PI * 2; j += dPI) {
                const x = a * cosh(i) * cos(j) + x0;
                const y = b * cosh(i) * sin(j) + y0;
                const z = c * sinh(i) + z0;
                this.points.push(new Point(x, z, y));
            }
        }

        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i + 1]) {
                if (!((i + 1) % count === 0)) {
                    this.edges.push(new Edge(this.points[i], this.points[i + 1])); 
                } else {
                    this.edges.push(new Edge(this.points[i], this.points[i + 1 - count]));
                }
            }
            if (this.points[i + count]) {
                this.edges.push(new Edge(this.points[i], this.points[i + count]));
            }
            
        }
        this.edges.push(new Edge(this.points[this.points.length-1], this.points[this.points.length - count]));

        for (let i = 0; i < this.points.length; i++) {
            if ((i + 1) % count === 0 && this.points[i + 1 - count] && this.points[i + count]){
                this.polygons.push(new Polygon([
                    this.points[i],
                    this.points[i + 1 - count],
                    this.points[i + 1],
                    this.points[i + count],
                ], color));
            } else {
                if (this.points[i + 1 + count]) {
                    this.polygons.push(new Polygon([
                    this.points[i],
                    this.points[i + 1],
                    this.points[i + 1 + count],
                    this.points[i + count]], color));
                }
            } 
        }

        const end = this.points.length;

        for (let i = 0; i <= Math.PI ; i += dPI) {
            for (let j = 0; j < Math.PI * 2; j += dPI) {
                const x = a * cosh(i) * cos(j) + x0;
                const y = b * cosh(i) * sin(j) + y0;
                const z = c * sinh(i) + z0;
                this.points.push(new Point(x, -z, y));
            }
        }

        for (let i = end; i < this.points.length; i++) {
            if (this.points[i + 1]) {
                if (!((i + 1) % count === 0)) {
                    this.edges.push(new Edge(this.points[i], this.points[i + 1])); 
                } else {
                    this.edges.push(new Edge(this.points[i], this.points[i + 1 - count]));
                }
            }
            if (this.points[i + count]) {
                this.edges.push(new Edge(this.points[i], this.points[i + count]));
            }
            
        }
        this.edges.push(new Edge(this.points[this.points.length-1], this.points[this.points.length - count]));

        for (let i = end; i < this.points.length; i++) {
            if ((i + 1) % count === 0 && this.points[i + 1 - count] && this.points[i + count]){
                this.polygons.push(new Polygon([
                    this.points[i],
                    this.points[i + 1 - count],
                    this.points[i + 1],
                    this.points[i + count],
                ], color));
            } else {
                if (this.points[i + 1 + count]) {
                    this.polygons.push(new Polygon([
                    this.points[i],
                    this.points[i + 1],
                    this.points[i + 1 + count],
                    this.points[i + count]], color));
                }
            } 
        }
    }
}

export default SingleHyperbole;