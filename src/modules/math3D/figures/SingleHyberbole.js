import { Figure, Point, Edge, Polygon } from "../entities";

const sinh = (x) => Math.sinh(x);
const cosh = (x) => Math.cosh(x);
const sin = (x) => Math.sin(x);
const cos = (x) => Math.cos(x);

class SingleHyperbole extends Figure {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.a = 1;
        this.b = 1;
        this.c = 1;
        this.count = 20;
        this.color = '#ffff00';
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

    init({x0, y0, z0, a, b, c, count, color}) {
        const dPI = Math.PI * 2 / count;
        for (let i = 0; i <= Math.PI ; i += dPI) {
            for (let j = 0; j < Math.PI * 2; j += dPI) {
                const x = a * cosh(i) * cos(j);
                const y = b * cosh(i) * sin(j);
                const z = c * sinh(i);
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
            if (this.points[i + 1 - count] && this.points[i + count]) {
                this.polygons.push(new Polygon([
                    this.points[i],
                    this.points[i + 1 - count],
                    this.points[i + 1],
                    this.points[i + count],
                ], color));
            } 
        }
    }
}

export default SingleHyperbole;