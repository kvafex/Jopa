import { ICalculator, TAnyType } from "../types";
import { Vector } from "../entities";

class VectorCalculator implements ICalculator<Vector> {
    calc: ICalculator<TAnyType>;

    constructor(calc: ICalculator<TAnyType>) {
        this.calc = calc;
    }

    add(a: Vector, b: Vector): Vector {
        return new Vector(a.values.map((elemA, index) => this.calc.add(elemA, b.values[index])));
    }

    div(): Vector | null {
        return null;
    }

    sub(a: Vector, b: Vector): Vector {
        return new Vector(a.values.map((elemA, index) => this.calc.sub(elemA, b.values[index])));
    }

    mult(a: Vector, b: Vector): Vector {
        const {sub, mult} = this.calc;
        return new Vector([
            sub(mult(a.values[1], b.values[2]), mult(a.values[2], b.values[1])),
            sub(mult(a.values[2], b.values[0]), mult(a.values[0], b.values[2])),
            sub(mult(a.values[0], b.values[1]), mult(a.values[1], b.values[0]))
        ])
    }

    prod(a: Vector, b: number): Vector { return new Vector(a.values.map(a => this.calc.prod(a, b))) }

    one(length: TAnyType = 0): Vector {
        const values = [];
        for (let i = 0; i < (length as number); i++) {
            values.push(i === 0 ? this.calc.one(length) : this.calc.zero(length));
        }
        return new Vector(values);
    }

    zero(length: TAnyType = 0): Vector {
        const values = [];
        for (let i = 0; i < (length as number); i++) {
            values.push(this.calc.zero(length));
        }
        return new Vector(values);
    }
    
    pow(a: Vector, b: number): Vector {
        if (b === 0) {
            return this.one(a.values.length);
        }
        const result = a;
        for (let i = 1; i < b; i++) {
            a = this.mult(result, a);
        }
        return a;
    }
}

export default VectorCalculator;