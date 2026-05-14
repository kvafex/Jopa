import { Figure, Point, Edge, Polygon } from "../entities";

const sin = (x: number): number => Math.sin(x);
const cos = (x: number): number => Math.cos(x);

type TEllipsoid = {
    x0: number,
    y0: number,
    z0: number,
    a: number,
    b: number,
    c: number,
    count: number,
    color: string,
}

class Ellipsoid extends Figure {
    x: number = 0;
    y: number = 0;
    z: number = 0;
    a: number = 10;
    b: number = 6;
    c: number = 4;
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

    init({x0, y0, z0, a, b, c, count, color}: TEllipsoid): void {
        const PI = Math.PI;
        const dTeta = PI / count;
        const dPhi = PI * 2 / count;
        for (let teta = 0; teta <= PI ; teta += dTeta) {
            for (let phi = 0; phi < PI * 2; phi += dPhi) {
                const x = a * cos(phi) * sin (teta) + x0;
                const y = b * sin(phi) * sin (teta) + y0;
                const z = c * cos(teta) + z0;
                this.points.push(new Point(x, z, y))
            }
        }

        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i + 1]) {
                if ((i + 1) % count === 0) {
                    if (this.points[i - count]) {
                        this.edges.push(new Edge(this.points[i], this.points[i + 1 - count]));
                    }
                } else {
                    this.edges.push(new Edge(this.points[i], this.points[i + 1]));
                }
            }
            if (this.points[i + count]) {
                this.edges.push(new Edge(this.points[i], this.points[i + count]));
            }
        }

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
    }
}

export default Ellipsoid;