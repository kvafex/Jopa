import Point from "./Point";

class Figure {
    constructor(points = [], edges = [], polygons = [], center = new Point()) {
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.center = center;
        this.animations = [];
    }

    dropAnimation() {
        this.animations = [];
    }

    addAnimation(method, value, center) {
        this.animations.push({ method, value, center: center || this.center });
    }

    doAnimation(math3D) {
        const ms = [];
        this.animations.forEach(({ method, value, center }) => {
            const M1 = math3D.move([-center.x, -center.y, -center.z]);
            const M2 = math3D[method](value);
            const M3 = math3D.move([center.x, center.y, center.z]);
            ms.push(math3D.getTransform(M1, M2, M3));
        });
        const M = ms.reduce((s, t) => math3D.multMtoM(s, t), [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
        this.points.forEach(point => math3D.transform(M, point));
        math3D.transform(M, this.center);
    }

}

export default Figure;