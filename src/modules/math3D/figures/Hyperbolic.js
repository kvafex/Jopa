import { Figure, Point, Edge, Polygon } from "../entities";

const sh = (x) => Math.sinh(x);
const ch = (x) => Math.cosh(x);

class Hyperbolic extends Figure {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.a = 5;
        this.b = 5;
        this.u = 5;
        this.count = 20;
        this.color = '#aa00dd';
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

    init({x0, y0, z0, a, b, u, count, color}) {
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

    clear() {
        this.points = [];
        this.edges = [];
        this.polygons = [];
    }

    setCount(count) {
        this.clear();
        this.count = count;
        this.init({
            x0: this.x,
            y0: this.y,
            z0: this.z,
            r: this.r,
            count: count,
            color: this.color,
        });
    }

    setCenter(x, y, z) {
        this.clear();
        this.x = x;
        this.y = y;
        this.z = z;
        this.init({
            x0: x,
            y0: y,
            z0: z,
            r: this.r,
            count: this.count,
            color: this.color,
        });
    }

    setColor(color) {
        this.clear();
        this.color = color;
        this.init({
            x0: this.x,
            y0: this.y,
            z0: this.z,
            r: this.r,
            count: this.count,
            color: color,
        });
    }
}

export default Hyperbolic;