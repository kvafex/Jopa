import { Figure, Point, Edge, Polygon } from "../entities";

const sin = (x) => Math.sin(x);
const cos = (x) => Math.cos(x);

class Ellipsoid extends Figure {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.r = 10;
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
}

export default Ellipsoid;