import { Figure, Point, Edge, Polygon } from "../entities";

const sin = (x) => Math.sin(x);
const cos = (x) => Math.cos(x);

class BottleKleine extends Figure {
    constructor(){
        super();
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.count = 20;
        this.color = '#aa00dd';
        this.init({ 
            x0: this.x,
            y0: this.y,
            z0: this.z,
            count: this.count,
            color: this.color,
        });
    }

    init({x0, y0, z0, count, color}) {
        const d = Math.PI / count;
        for (let u = 0; u < Math.PI; u += d) {
            for (let v = 0; v < 2 * Math.PI; v += 2 * d) {
                const x = 6 * cos(u) * (1 + sin(u)) + 4 * (1 - cos(u) / 2) * cos(u) * cos(v);
                const y = 16 * sin(u) + 4 * (1 - cos(u) / 2) * sin(u) * cos(v);
                const z = 4 * (1 - cos(u) / 2) * sin(v);
                this.points.push(new Point(x + x0, y + y0, z + z0));
            }
        }

        for (let u = Math.PI; u < 2 * Math.PI; u += 2 * d) {
            for (let v = 0; v < 2 * Math.PI; v += 2 * d) {
                const x = 6 * cos(u) * (1 + sin(u)) + 4 * (1 - cos(u) / 2) * cos(v + Math.PI);
                const y = 16 * sin(u);
                const z = 4 * (1 - cos(u) / 2) * sin(v);
                this.points.push(new Point(x + x0, y + y0, z + z0));
            }
        }


        for (let i = 0; i < this.points.length; i++) {
            if (!((i + 1) % count === 0)) {
                this.edges.push(new Edge(this.points[i],this.points[i + 1]));
            } else {
                this.edges.push(new Edge(this.points[i], this.points[i + 1 - count]));
            }
        }

        for (let i = 0; i < this.points.length - count; i++) {
            this.edges.push(new Edge(this.points[i], this.points[i + count]));
        }

        for (let i = 0; i < count; i++) {
            this.edges.push(new Edge(this.points[i], this.points[this.points.length - count / 2 - i]));
        }


        for (let i = 0; i < this.points.length; i++) {
            if ((i + 1) % count === 0 && this.points[i + 1 - count] && this.points[i + count]){
                this.polygons.push(new Polygon([
                    this.points[i],
                    this.points[i + 1 - count],
                    this.points[i + 1],
                    this.points[i + count]], color));
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

        for (let i = 0; i < 2 * count; i++) {
            if (this.points[this.points.length + count / 2 - i]) {
                this.polygons.push(new Polygon([
                    this.points[i-1],
                    this.points[this.points.length - count / 2 - i +1],
                    this.points[this.points.length - count / 2 - i],
                    this.points[i]], color));
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
            a: this.a,
            b: this.b,
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
            a: this.a,
            b: this.b,
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
            a: this.a,
            b: this.b,
            count: this.count,
            color: color,
        });
    }
}

export default BottleKleine;