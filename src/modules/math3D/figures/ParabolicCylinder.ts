import { Figure, Point, Edge, Polygon } from "../entities";

const sqrt = (x: number): number => Math.sqrt(x);

type TParabolicCylinder = {
    x0: number,
    y0: number, 
    z0: number, 
    p: number, 
    u: number, 
    count: number, 
    color: string
}

class ParabolicCylinder extends Figure {
    x: number = 0;
    y: number = 0;
    z: number = 0;
    p: number = 5;
    u: number = 5;
    count: number = 20;
    color: string = '#ffff00';    
    constructor() {
        super();
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

    init({x0, y0, z0, p, u, count, color}: TParabolicCylinder): void {
        for (let t = -Math.PI * 2; t < Math.PI * 2; t += Math.PI * 2 / count) {
            const x = t + x0;
            const z = sqrt(2 * p * t) + y0;
            const y = u + z0;
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