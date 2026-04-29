import Point from "./Point";

class Edge {
    p1: Point;
    p2: Point;
    constructor(p1: Point = new Point(), p2: Point = new Point()) {
        this.p1 = p1;
        this.p2 = p2;
    }
}

export default Edge;