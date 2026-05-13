import { Matrix } from "../entities";
import { ICalculator, TAnyType } from "../types";

class MatrixCalculator implements ICalculator<Matrix> {
    calc: ICalculator<TAnyType>;

    constructor(calc: ICalculator<TAnyType>) {
        this.calc = calc;
    }

    add(a: Matrix, b: Matrix): Matrix {
        return new Matrix(
            a.values.map(
                (rowA, i) => rowA.map(
                    (elemA, j) => this.calc.add(elemA, b.values[i][j])
                )
            )
        )
    }

    sub(a: Matrix, b: Matrix): Matrix {
        return new Matrix(
            a.values.map(
                (rowA, i) => rowA.map(
                    (elemA, j) => this.calc.sub(elemA, b.values[i][j])
                )
            )
        )
    }

    mult(a: Matrix, b: Matrix): Matrix {
        let values: TAnyType[][] = [];
        for (let i = 0; i < a.values.length; i++) {
            values.push([]);
            for (let j = 0; j < a.values.length; j++) {
                let s = this.calc.zero(a.values.length);

                for (let k = 0; k < a.values.length; k++) {
                    s = this.calc.add(s, this.calc.mult(a.values[i][k], b.values[k][j]));
                }
                values[i][j] = s;
            }
        }
        return new Matrix(values);
    }

    div(): Matrix | null { return null }

    one(length: number = 0): Matrix {
        let values = this.zero(length).values;

        for (let i = 0; i < length; i++) {
            values[i][i] = this.calc.one(length);
        } 

        return new Matrix(values);
    }

    zero(length: number = 0): Matrix {
        let values: TAnyType[][] = [];

        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = this.calc.zero(length);
            }
        }

        return new Matrix(values);
    }

    pow(a: Matrix, b: number): Matrix {
        if (b === 0) {
            return this.one(a.values.length)
        }

        const result = a;

        for (let i = 1; i < b; i++) {
            a = this.mult(a, result);
        }
        
        return new Matrix(a.values);
    }

    prod(a: Matrix, b: number): Matrix {
        let values: TAnyType[][] = [];
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