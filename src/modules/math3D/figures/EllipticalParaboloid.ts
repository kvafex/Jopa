import { Figure, Point, Edge, Polygon } from "../entities";

const sin = (x: number): number => Math.sin(x);
const cos = (x: number): number => Math.cos(x);

type TEllipticalParaboloid = {
    x0: number,
    y0: number,
    z0: number,
    r: number,
    count: number,
    color: string,
}

class EllipticalParaboloid extends Figure {
    x: number = 0;
    y: number = 0;
    z: number = 0;
    r: number = 1;
    count: number = 20;
    color: string = '#ffff00';
    constructor() {
        super();
        this.init({
            x0: this.x,
            y0: this.y,
            z0: this.z,
            r: this.r,
            count: this.count,
            color: this.color,
        });
    }

    init({x0, y0, z0, r, count, color}: TEllipticalParaboloid) {
        const PI = Math.PI;
        const dTeta = PI / count;
        const dPhi = PI * 2 / count;
        for (let teta = 0; teta <= PI ; teta += dTeta) {
            for (let phi = 0; phi < PI * 2; phi += dPhi) {
                const x = r * cos(phi) * teta + x0;     // sin и cos прописан в index.js 
                const y = r * sin(phi) * teta + y0;
                const z = r * (teta ** 2) / 2 + z0;
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

    clear(): void {
        this.points = [];
        this.edges = [];
        this.polygons = [];
    }

    setRadius(r: number): void {
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

    setCount(count: number): void {
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

    setCenter(x: number, y: number, z: number): void {
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

    setOCenter(center: Point): void {
        this.center = center;
    }

    setColor(color: string): void {
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

export default EllipticalParaboloid;