import { Figure, Point, Edge, Polygon } from "../entities";

const sin = (x: number): number => Math.sin(x);
const cos = (x: number): number => Math.cos(x);

type TTor = {
    x0: number, 
    y0: number, 
    z0: number, 
    R: number, 
    r: number, 
    count: number, 
    color: string,
}

class Tor extends Figure {
    x: number = 0; 
    y: number = 0; 
    z: number = 0; 
    r: number = 5; 
    R: number = 10; 
    count: number = 20;
    center: Point = new Point();
    color: string = '#ffff00';
    constructor () {
        super();
        this.init({
            x0: this.x,
            y0: this.y,
            z0: this.z,
            R: this.R,
            r: this.r,
            count: this.count,
            color: this.color,
        });
    }
    
    init({x0, y0, z0, R, r, count, color}: TTor): void {
        for (let b = 0; b < Math.PI * 2; b += Math.PI * 2 / count) {
            for (let a = 0; a < Math.PI * 2; a += Math.PI * 2 / count) {
                const x = (R + r * cos(b)) * cos(a) + x0;
                const z = (R + r * cos(b)) * sin(a) + y0;
                const y = r * sin(b) + z0;
                this.points.push(new Point(x, z, y));
            }
        }

        // ребра первой половины фигуры (разделение на половины произошло из за порядка генерации точек)
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
            if (this.points[i - count]) {
                this.edges.push(new Edge(this.points[i], this.points[i - count]));
            }

        }

        // ребра второй половины фигуры (разделение на половины произошло из за порядка генерации точек)
        for (let i = 0; i < count; i++) {
            this.edges.push(new Edge(this.points[i], this.points[i + this.points.length - count]));
        }
        this.edges.push(new Edge(this.points[0], this.points[count - 1]));
        this.edges.push(new Edge(this.points[this.points.length - 1], this.points[this.points.length - count]));

        // полигоны первой половины фигуры (разделение на половины произошло из за порядка генерации точек)
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

        // полигоны второй половины фигуры
        for (let i = 0; i < count; i++) {
            if (this.points[i + 1] && this.points[i + 1 + this.points.length - count]) {
                this.polygons.push(new Polygon([
                        this.points[i],
                        this.points[i + 1],
                        this.points[i + 1 + this.points.length - count],
                        this.points[i + this.points.length - count]], color))                
            }
        }
        // конечный последний незакрашеный полигон
        this.polygons.push(new Polygon([this.points[0],
                                        this.points[19],
                                        this.points[this.points.length - 1],
                                        this.points[this.points.length - count]], color));
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
            R: this.R,
            r: r,
            count: this.count,
            color: this.color,
        });
    }

    setBigRadius(R: number): void {
        this.clear();
        this.R = R;
        this.init({
            x0: this.x,
            y0: this.y,
            z0: this.z,
            R: R,
            r: this.r,
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
            R: this.R,
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
            R: this.R,
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
            R: this.R,
            r: this.r,
            count: this.count,
            color: color,
        });
    }
}

export default Tor;