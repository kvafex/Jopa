import Point from "./Point";

class Light extends Point {
    lumenPower: number;
    constructor(x: number, y: number, z: number, lumenPower = 10000) {
        super(x, y, z);
        this.lumenPower = lumenPower;
    }
}

export default Light