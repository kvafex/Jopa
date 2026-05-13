import { Figure, Point, Edge, Polygon } from "../entities";

type TChips = {
    a: number,
    b: number,
    count: number,
    color: string
}

class Chips extends Figure {
    a: number = 3.5;
    b: number = 3.5;
    count: number = 20;
    color: string = '#ff00ff';
    constructor() {
        super();
        this.init({
            a: this.a,
            b: this.b,
            color: this.color,
            count: this.count
        });
    }

    init({a, b, count, color}: TChips): void {
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                const x = (i - count / 2) / a ** 2;
                const y = (j - count / 2) / b ** 2;
                const z = x ** 2 - y ** 2;
                this.points.push(new Point(x, y, z))
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
}

export default Chips;