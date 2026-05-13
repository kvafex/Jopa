import Math3D, { ETransform, TMatrix } from "../Math3D";
import Point from "./Point";
import Edge from "./Edge";
import Polygon from "./Polygon";

type TAnimation = { 
    method: ETransform, 
    value: number, 
    center: Point 
};

class Figure {
    points: Point[];
    edges: Edge[];
    polygons: Polygon[];
    center: Point;
    animations: TAnimation[] = [];

    constructor(points: Point[] = [], edges: Edge[] = [], polygons: Polygon[] = [], center: Point = new Point()) {
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.center = center;
    }

    dropAnimation(): void {
        this.animations = [];
    }

    addAnimation(method: ETransform, value: number, center: Point): void {
        this.animations.push({ method, value, center: center || this.center });
    }

    doAnimation(math3D: Math3D): void {
        const ms: TMatrix[] = [];
        this.animations.forEach(({ method, value, center }) => {
            const M1 = math3D[ETransform.move](-center.x, -center.y, -center.z);
            const M2 = math3D[method](value, value, value);
            const M3 = math3D[ETransform.move](center.x, center.y, center.z);
            ms.push(math3D.getTransform(M1, M2, M3));
        });
        const M = ms.reduce((s, t) => math3D.multMtoM(s, t), [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
        this.points.forEach(point => math3D.transform(M, point));
        math3D.transform(M, this.center);
    }
}

export default Figure;