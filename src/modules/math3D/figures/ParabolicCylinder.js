import { Figure, Point, Edge, Polygon } from "../entities";

const sqrt = (x) => Math.sqrt(x);

class ParabolicCylinder extends Figure {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.p = 5;
        this.u = 5;
        this.count = 20;
        this.color = '#ffff00';
        this.init({
            x0: this.x,
            y0: this.y,
            z0: this.z,
            p: this.p,
            u: this.u,
            count: this.count,
            color: this.color,
        });
        
    }

    init({x0, y0, z0, p, u, count, color}) {
        for (let t = -Math.PI * 2; t < Math.PI * 2; t += Math.PI * 2 / count) {
            const x = t;
            const z = sqrt(2 * p * t);
            const y = u;
            this.points.push(new Point(x, y, z));
            this.points.push(new Point(x, y, -z));
            this.points.push(new Point(x, -y, z));
            this.points.push(new Point(x, -y, -z));
        }

        for (let i = 0; i < this.points.length - 2; i++) {
            if (this.points[i + 4]) {
                this.edges.push(new Edge(this.points[i], this.points[i + 4]));
            }
                
        }

        for (let i = 0; i < this.points.length - 2; i+=4) {
            if (this.points[i+2]) {
                this.edges.push(new Edge(this.points[i], this.points[i+2]));
            }
            if (this.points[i+3]) {
                this.edges.push(new Edge(this.points[i+1], this.points[i+3]));
            }
        }

        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i + 4]) {
                this.polygons.push(new Polygon([
                    this.points[i],
                    this.points[i+4],
                    this.points[i+2],
                    this.points[i+2],
                ], color));
            }
            
            
        }
    }
}

export default ParabolicCylinder;