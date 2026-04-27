import Point from "./Point";

class Edge {
    constructor(p1 = new Point(), p2 = new Point()) {
        this.p1 = p1;
        this.p2 = p2;
    }
}

export default Edge;