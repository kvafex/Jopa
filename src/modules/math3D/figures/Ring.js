import Figure from "../entities/Figure";
import Point from "../entities/Point";
import Edge from "../entities/Edge";
import Polygon from "../entities/Polygon";

const sin = (x) => Math.sin(x);
const cos = (x) => Math.cos(x);

class Ring extends Figure {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.r = 5;
        this.count = 20;
        this.color = '#ffff00';
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
        for (let a = 0; a < Math.PI * 2; a += Math.PI * 2 / count) {
            const x = r * sin(a) + x0;
            const y = r * cos(a) + y0;
            const z = z0;
            this.points.push(new Point(x, y, z));
        }

        for (let i = 0; i < this.points.length - 1; i++) {
            this.edges.push(new Edge(this.points[i], this.points[i + 1]));
        }
        this.edges.push(new Edge(this.points[0], this.points[this.points.length - 1]));

        for (let i = 0; i < this.points.length - 1; i++) {
            if (this.points[i + 3]) {
                this.polygons.push(new Polygon([this.points[i], this.points[i + 1], this.points[i + 2], this.points[i + 3]], color));
            }
        }
        this.polygons.push(new Polygon([this.points[this.points.length - 2], this.points[this.points.length - 1], this.points[0], this.points[1]], color));
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

export default Ring;