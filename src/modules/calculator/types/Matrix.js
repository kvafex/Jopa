class Matrix {
    constructor(values = [[]]) {
        const vals = [];
        for (let i = 0; i < values.length; i++) {
            vals.push([]);
            for (let j = 0; j < values[i].length; j++) {
                vals[i][j] = values[i][j];
            }
        }
        this.values = vals;

    }
    toString() {
        return `[${this.values.map(
            row => row.map(elem => elem.toString()).join(', ')
        ).join(';\n')}]`;
    }
}

export default Matrix;