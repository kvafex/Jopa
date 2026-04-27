import RealCalculator from "./RealCalculator";
import { Matrix } from "../types";

class MatrixCalculator extends RealCalculator {
    constructor(calc = new RealCalculator()) {
        super();
        this.calc = calc;
    }
    add(a, b) {
        return new Matrix(
            a.values.map(
                (rowA, i) => rowA.map(
                    (elemA, j) => this.calc.add(elemA, b.values[i][j])
                )
            )
        )
    }

    sub(a, b) {
        return new Matrix(
            a.values.map(
                (rowA, i) => rowA.map(
                    (elemA, j) => this.calc.sub(elemA, b.values[i][j])
                )
            )
        )
    }

    mult(a, b) {
        let values = [];
        for (let i = 0; i < a.values.length; i++) {
            values.push([]);
            for (let j = 0; j < a.values.length; j++) {
                values[i][j] = this.calc.zero(a.values.length);
                for (let k = 0; k < a.values.length; k++) {
                    values[i][j] = this.calc.add(values[i][j], this.calc.mult(a.values[i][k], b.values[k][j]));
                }
            }
        }
        return new Matrix(values);
    }

    div() { return null }

    one(length) {
        let values = this.zero(length).values;
        for (let i = 0; i < length; i++) {
            values[i][i] = this.calc.one(length);
        }
        return new Matrix(values);
    }

    zero(length) {
        let values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = this.calc.zero(length);
            }
        }
        return new Matrix(values);
    }

    pow(a, b) {
        const bNum = b.re;
        if (bNum === 0) {
            return this.one(a.values.length)
        }
        const result = a;
        for (let i = 1; i < bNum; i++) {
            a = this.mult(a, result);
        }
        return new Matrix(a.values);
    }

    prod(a, b) {
        let values = [];
        for (let i = 0; i < a.values.length; i++) {
            values.push([]);
            for (let j = 0; j < a.values.length; j++) {
                values[i][j] = this.calc.prod(a.values[i][j], b)
            }
        }
        return new Matrix(values);
    }
}

export default MatrixCalculator;