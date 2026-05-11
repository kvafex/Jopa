import { TAnyType } from "../types";

class Matrix {
    values: TAnyType[][];

    constructor(values: TAnyType[][] = [[]]) {
        const vals: TAnyType[][] = [];

        for (let i = 0; i < values.length; i++) {
            vals.push([]);
            for (let j = 0; j < values[i].length; j++) {
                vals[i][j] = values[i][j];
            }
        }

        this.values = vals;

    }

    toString(): string {
        return `[${this.values.map(
            row => row.map(elem => elem.toString()).join(', ')
        ).join(';\n')}]`;
    }
}

export default Matrix;