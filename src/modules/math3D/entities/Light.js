import Point from "./Point";

class Light extends Point {
    constructor(x, y, z, lumenPower = 10000) {
        super(x, y, z);
        this.lumenPower = lumenPower;
    }
}

export default Light