import { Figure, Point, Edge, Polygon } from "../entities";

type TSadle = {
    x0: number,
    y0: number,
    z0: number,
    a: number,
    b: number,
    count: number,
    color: string
}

class Sadle extends Figure {
    x: number = 0;
    y: number = 0;
    z: number = 0;
    a: number = 3.5;
    b: number = 3.5;
    count: number = 20;
    color: string = '#ff00ff';
    constructor() {
        super();
        this.init({
            x0: this.x,
            y0: this.y,
            z0: this.z,
            a: this.a,
            b: this.b,
            color: this.color,
            count: this.count
        });
    }

    init({x0, y0, z0, a, b, count, color}: TSadle): void {
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                const x = (i - count / 2) / a ** 2;
                const y = (j - count / 2) / b ** 2;
                const z = x ** 2 - y ** 2;
                this.points.push(new Point(x + x0, y + y0, z + z0))
            }
        }

        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i + 1]) {
                if (!((i + 1) % count === 0)) {
                    this.edges.push(new Edge(this.points[i], this.points[i + 1]));
                }
            }

            if (this.points[i + count]) {
                this.edges.push(new Edge(this.points[i], this.points[i + count]));
            }
        }

        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i + count + 1]) {
                if (!((i + 1) % count === 0)) {
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

    setA(a: number): void {
        this.clear();
        this.a = a,
        this.init({
            x0: this.x,
            y0: this.y,
            z0: this.z,
            a: a,
            b: this.b,
            count: this.count,
            color: this.color,
        });
    }

    setB(b: number): void {
        this.clear();
        this.b = b,
        this.init({
            x0: this.x,
            y0: this.y,
            z0: this.z,
            a: this.a,
            b: b,
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
            a: this.a,
            b: this.b,
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
            a: this.a,
            b: this.b,
            count: this.count,
            color: color,
        });
    }
}

export default Sadle;