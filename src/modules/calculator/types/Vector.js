class Vector{
    constructor(values = []){
        this.values = values.map(elem => elem);
    }
    toString(){
        return `(${this.values.map(elem => elem.toString()).join(', ')})`;
    }
}

export default Vector;