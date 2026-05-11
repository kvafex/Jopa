import { Point, Edge, Figure, Polygon } from "../entities";

type TCube = {
    x: number,
    y: number, 
    z: number, 
    size: number, 
    color: string
}

class Cube extends Figure {
    x: number = 0;
    y: number = 0;
    z: number = 0;
    size: number = 20;
    color: string = '#ff00ff';
    constructor() {
        super();
        this.init({
            x: this.x,
            y: this.y,
            z: this.z,
            size: this.size,
            color: this.color,
        });
    }

    init({x, y, z, size, color}: TCube): void {
        this.points.push(
            new Point(size / 2 + x, size / 2 + y, size / 2 + z), //0
            new Point(-size / 2 + x, size / 2 + y, size / 2 + z), //1
            new Point(size / 2 + x, -size / 2 + y, size / 2 + z), //2
            new Point(-size / 2 + x, -size / 2 + y, size / 2 + z), //3
            new Point(size / 2 + x, size / 2 + y, -size / 2 + z), //4
            new Point(-size / 2 + x, size / 2 + y, -size / 2 + z), //5
            new Point(size / 2 + x, -size / 2 + y, -size / 2 + z), //6
            new Point(-size / 2 + x, -size / 2 + y, -size / 2 + z) //7
        );

        this.edges.push(new Edge(this.points[0], this.points[1]),
                        new Edge(this.points[0], this.points[2]),
                        new Edge(this.points[0], this.points[4]),
                        new Edge(this.points[1], this.points[3]),
                        new Edge(this.points[1], this.points[5]),
                        new Edge(this.points[2], this.points[3]),
                        new Edge(this.points[2], this.points[6]),
                        new Edge(this.points[3], this.points[7]),
                        new Edge(this.points[4], this.points[5]),
                        new Edge(this.points[4], this.points[6]),
                        new Edge(this.points[5], this.points[7]),
                        new Edge(this.points[6], this.points[7]));
        
        this.polygons.push(new Polygon([this.points[0], this.points[1], this.points[3], this.points[2]], color),
                        new Polygon([this.points[4], this.points[5], this.points[7], this.points[6]], color),
                        new Polygon([this.points[0], this.points[4], this.points[6], this.points[2]], color),
                        new Polygon([this.points[3], this.points[7], this.points[6], this.points[2]], color),
                        new Polygon([this.points[1], this.points[3], this.points[7], this.points[5]], color),
                        new Polygon([this.points[0], this.points[1], this.points[5], this.points[4]], color));
    }

    clear(): void {
        this.points = [];
        this.edges = [];
        this.polygons = [];
    }

    setSize(size: number): void {
        this.clear();
        this.size = size;
        this.init({
            x: this.x,
            y: this.y,
            z: this.z,
            size: size,
            color: this.color,
        });
    }

    setCenter(x: number, y: number, z: number): void {
        this.clear();
        this.x = x;
        this.y = y;
        this.z = z;
        this.init({
            x: x,
            y: y,
            z: z,
            size: this.size,
            color: this.color,
        });
    }

    setColor(color: string): void {
        this.clear();
        this.color = color;
        this.init({
            x: this.x,
            y: this.y,
            z: this.z,
            size: this.size,
            color: color,
        });
    }

}

export default Cube;