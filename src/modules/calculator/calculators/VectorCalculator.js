import RealCalculator from "./RealCalculator";
import { Vector } from "../types";

class VectorCalculator extends RealCalculator {
    constructor(calc = new RealCalculator()) {
        super();
        this.calc = calc;
    }
    add(a, b) {
        return new Vector(a.values.map((elemA, index) => this.calc.add(elemA, b.values[index])));
    }

    div() {
        return null;
    }

    sub(a, b) {
        return new Vector(a.values.map((elemA, index) => this.calc.sub(elemA, b.values[index])));
    }

    mult(a, b) {
        const {sub, mult} = this.calc;
        return new Vector([
            sub(mult(a.values[1], b.values[2]), mult(a.values[2], b.values[1])),
            sub(mult(a.values[2], b.values[0]), mult(a.values[0], b.values[2])),
            sub(mult(a.values[0], b.values[1]), mult(a.values[1], b.values[0]))
        ])
    }

    prod(a, b) { return new Vector(a.values.map(a => this.calc.prod(a, b))) }

    one(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(i === 0 ? this.calc.one(length) : this.calc.zero(length));
        }
        return new Vector(values);
    }

    zero(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(this.calc.zero(length));
        }
        return new Vector(values);
    }
    
    pow(a, b) {
        const bNum = b.re;
        if (bNum === 0) {
            return this.one(a.values.length);
        }
        const result = a;
        for (let i = 1; i < bNum; i++) {
            a = this.mult(result, a);
        }
        return a;
    }
}

export default VectorCalculator;