import { TAnyType } from "../types";

class Vector{
    values: TAnyType[];

    constructor(values: TAnyType[] = []){
        this.values = values.map(elem => elem);
    }

    toString(): string{
        return `(${this.values.map(elem => elem.toString()).join(', ')})`;
    }
}

export default Vector;