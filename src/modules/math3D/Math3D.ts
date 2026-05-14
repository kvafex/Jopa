import { TWIN3D } from "../canvas/Canvas";
import { Figure, Light, Point, Polygon } from "./entities";
import { EDist } from "./entities/Polygon";

export type TMatrix = number[][];
type TVector = number[];
type TShadow = {
    isShadow: boolean,
    dark?: number,
}
export enum ETransform {
    zoom = 'zoom',
    move = 'move',
    rotateOx = 'rotateOx',
    rotateOy = 'rotateOy',
    rotateOz = 'rotateOz'
}

const sin = (x: number): number => Math.sin(x);
const cos = (x: number): number => Math.cos(x);
const sqrt = (x: number): number => Math.sqrt(x);

class Math3D {
    WIN: TWIN3D;

    constructor(WIN: TWIN3D) {
        this.WIN = WIN;
    }

    xs(point: Point): number {
        const Cz = this.WIN.CAMERA.z;
        const Fz = this.WIN.FOCUS.z;
        return point.x * (Fz - Cz) / (point.z - Cz);
    }

    ys(point: Point): number {
        const Cz = this.WIN.CAMERA.z;
        const Fz = this.WIN.FOCUS.z;
        return point.y * (Fz - Cz) / (point.z - Cz);
    }

    multMToP(M: TMatrix, P: TVector): TVector {
        const c = [0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
            let s = 0;
            for (let j = 0; j < 4; j++) {
                s += M[j][i] * P[j];
            }
            c[i] = s;
        }
        return c;
    }

    multMtoM(a: TMatrix, b: TMatrix): TMatrix {
        const c = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let s = 0;
                for (let k = 0; k < 4; k++) {
                    s += a[i][k] * b[k][j];
                }
                c[i][j] = s;
            }
        }
        return c;
    }

    [ETransform.zoom](delta: number): TMatrix {
        return [
            [delta, 0, 0, 0],
            [0, delta, 0, 0],
            [0, 0, delta, 0],
            [0, 0, 0, 1]
        ];
    }

    [ETransform.move](dx: number, dy: number, dz: number): TMatrix {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [dx, dy, dz, 1]
        ];
    }

    [ETransform.rotateOx](alpha: number): TMatrix {
        return [
            [1, 0, 0, 0],
            [0, cos(alpha), sin(alpha), 0],
            [0, -sin(alpha), cos(alpha), 0],
            [0, 0, 0, 1]
        ];
    }

    [ETransform.rotateOy](alpha: number): TMatrix {
        return [
            [cos(alpha), 0, -sin(alpha), 0],
            [0, 1, 0, 0],
            [sin(alpha), 0, cos(alpha), 0],
            [0, 0, 0, 1]
        ];
    }

    [ETransform.rotateOz](alpha: number): TMatrix {
        return [
            [cos(alpha), sin(alpha), 0, 0],
            [-sin(alpha), cos(alpha), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
    }

    transform(matrix: TMatrix, point: Point): void {
        const c = this.multMToP(
            matrix,
            [point.x, point.y, point.z, 1]
        );
        point.x = c[0];
        point.y = c[1];
        point.z = c[2];
    }

    getTransform(...args: TMatrix[]): TMatrix {
        return args.reduce(
            (s, t) => this.multMtoM(s, t),
            [
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ]
        );
    }

    calcCenter(polygon: Polygon): void {
        let x = 0;
        let y = 0;
        let z = 0;
        polygon.points.forEach(point => {
            x += point.x;
            y += point.y;
            z += point.z;
        });
        polygon.center.x = x / polygon.points.length;
        polygon.center.y = y / polygon.points.length;
        polygon.center.z = z / polygon.points.length;
    }

    calcDistance(polygon: Polygon, endPoint: Point, name: EDist): void {
        polygon[name] = sqrt((endPoint.x - polygon.center.x) ** 2 +
            (endPoint.y - polygon.center.y) ** 2 +
            (endPoint.z - polygon.center.z) ** 2);
    }

    sortByArtist(polygons: Polygon[]): void {
        polygons.sort((a, b) => b.distance - a.distance);
    }

    calcIllumination(lumen: number, lumenPower: number): number {
        const res = lumen ? lumenPower / lumen ** 3 : 1;
        return res > 1 ? 1 : res;
    }

    calcVector(a: Point, b: Point): Point { // вычисление вектора
        return new Point(b.x - a.x, b.y - a.y, b.z - a.z);
    }

    vectorProd(a: Point, b: Point): Point { // векторное произведение
        return new Point(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    }

    calcVectorModule(a: Point): number {
        return Math.sqrt((a.x ** 2) + (a.y ** 2) + (a.z ** 2));
    }

    calcRadius(polygon: Polygon): void {
        const center = polygon.center;
        polygon.R = polygon.points.reduce((s, point) => 
            s + this.calcVectorModule(this.calcVector(center, point)), 0) / polygon.points.length;
    }

    calcShadow(polygon: Polygon, scenes: Array<Figure>, light: Light): TShadow {
        const M1 = polygon.center;
        const R = polygon.R;
        const S = this.calcVector(M1, light);
        for (let i = 0; i < scenes.length; i++) {
            if (polygon.figureIndex === i) {
                continue;
            }
            for (let j = 0; j < scenes[i].polygons.length; j++) {
                const polygon2 = scenes[i].polygons[j];
                const M0 = polygon2.center;
                if (M1.x === M0.x && M1.y === M0.y && M1.z === M0.z) {
                    continue;
                }

                if (polygon2.lumen > polygon.lumen) {
                    continue;
                }

                const dark = this.calcVectorModule(this.vectorProd(this.calcVector(M0, M1), S)) / this.calcVectorModule(S);
                if (dark < R) {
                    return {
                        isShadow: true,
                        dark: dark / 1.3,
                    };
                }
            }
        }

        return {
            isShadow: false,
        }
    }
}

export default Math3D;