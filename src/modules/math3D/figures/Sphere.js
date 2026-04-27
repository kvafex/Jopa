import { Figure, Point, Edge, Polygon } from "../entities";

const sin = (x) => Math.sin(x);
const cos = (x) => Math.cos(x);

class Sphere extends Figure {
    constructor({x = 0, y = 0, z = 0, r = 10, count = 20, center = new Point(), color = '#ffff00'}) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = r;
        this.count = count;
        this.center = center;
        this.color = color;
        this.init({
            x0: this.x,
            y0: this.y,
            z0: this.z,
            r: this.r,
            count: this.count,
            color: this.color,
        });
    }

    init({x0, y0, z0, r, count, color}) {
        const PI = Math.PI;
        const dTeta = PI / count;
        const dPhi = PI * 2 / count;
        for (let teta = 0; teta <= PI ; teta += dTeta) {
            for (let phi = 0; phi < PI * 2; phi += dPhi) {
                const x = r * cos(phi) * sin (teta) + x0;     // sin и cos прописан в index.js 
                const y = r * sin(phi) * sin (teta) + y0;
                const z = r * cos(teta) + z0;
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

    clear() {
        this.points = [];
        this.edges = [];
        this.polygons = [];
    }

    setRadius(r) {
        this.clear();
        this.r = r;
        this.init({
            x0: this.x,
            y0: this.y,
            z0: this.z,
            r: r,
            count: this.count,
            color: this.color,
        });
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

export default Sphere;