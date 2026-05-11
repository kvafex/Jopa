import { Figure, Point, Edge, Polygon } from "../entities";

const sh = (x: number): number => Math.sinh(x);
const ch = (x: number): number => Math.cosh(x);

type THyperbolic = {
    x0: number;
    y0: number;
    z0: number;
    a: number;
    b: number;
    u: number;
    count: number;
    color: string;
}

class Hyperbolic extends Figure {
    x: number = 0;
    y: number = 0;
    z: number = 0;
    a: number = 5;
    b: number = 5;
    u: number = 5;
    count: number = 20;
    color: string = '#aa00dd';
    constructor() {
        super();
        this.init({
            x0: this.x,
            y0: this.y,
            z0: this.z,
            a: this.a,
            b: this.b,
            u: this.u,
            count: this.count,
            color: this.color,
        });
    }

    init({x0, y0, z0, a, b, u, count, color}: THyperbolic): void {
        for (let t = -Math.PI; t < Math.PI; t += Math.PI / count) {
            const x = a * ch(t) + x0;
            const z = b * sh(t) + y0;
            const y = u + z0;
            this.points.push(new Point(x, y, z));
            this.points.push(new Point(x, -y, z));
            this.points.push(new Point(-x, y, z));
            this.points.push(new Point(-x, -y, z));
        }

        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i + count]) {
                this.edges.push(new Edge(this.points[i], this.points[i + count]));
            }
        }

        for (let i = 0; i < this.points.length; i+=2) {
            if (this.points[i + 1]) {
                this.edges.push(new Edge(this.points[i], this.points[i+1]));
            }
        }


        for (let i = 0; i < this.points.length; i+=2) {
            if (!((i + 1) % count === 0)){
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

    clear(): void {
        this.points = [];
        this.edges = [];
        this.polygons = [];
    }

    setCount(count: number): void {
        this.clear();
        this.count = count;
        this.init({
            x0: this.x,
            y0: this.y,
            z0: this.z,
            a: this.a,
            b: this.b,
            u: this.u,
            count: count,
            color: this.color,
        });
    }

    setCenter(x: number, y: number, z: number): void {
        this.clear();
        this.x = x;
        this.y = y;
        this.z = z;
        this.init({
            x0: x,
            y0: y,
            z0: z,
            a: this.a,
            b: this.b,
            u: this.u,
            count: this.count,
            color: this.color,
        });
    }

    setColor(color: string): void {
        this.clear();
        this.color = color;
        this.init({
            x0: this.x,
            y0: this.y,
            z0: this.z,
            a: this.a,
            b: this.b,
            u: this.u,
            count: this.count,
            color: color,
        });
    }
}

export default Hyperbolic;