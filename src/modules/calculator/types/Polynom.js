import Calculator from "../Calculator";
import Complex from "./Complex";

class Polynom {
    constructor(members = []) {
        this.members = members;
        this.members.sort((a,b) => b.power - a.power);
    }

    toString() {
        return this.members.map(member => member.toString()).join(' + ').replaceAll('+ -','- ');
    }

    getValueP(x) {
        const calc = new Calculator();
        return this.members.reduce((S, elem) => 
            calc.add(S, calc.prod(calc.pow(x, new Complex(elem.power)), elem.value)),
            calc.zero(x)   // первоначальное значение S
            );
    }
}

export default Polynom;