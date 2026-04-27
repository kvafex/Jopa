import { Figure, Point, Edge, Polygon } from "../entities";

const sin = (x) => Math.sin(x);
const cos = (x) => Math.cos(x);

class Tor extends Figure {
    constructor ({x = 0, y = 0, z = 0, r = 5, R = 10, count = 20, center = new Point(), color = '#ffff00'}) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
        this.R = R;
        this.r = r;
        this.count = count;
        this.color = color;
        this.center = center;
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
    
    init({x0, y0, z0, R, r, count, color}) {
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
            R: this.R,
            r: r,
            count: this.count,
            color: this.color,
        });
    }

    setBigRadius(R) {
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

    setCount(count) {
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

    setCenter(x, y, z) {
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

    setColor(color) {
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