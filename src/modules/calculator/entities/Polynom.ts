import Calculator from "../Calculator";
import { TAnyType } from "../types";
import Member from "./Member";

class Polynom {
    members: Member[]
    constructor(members: Member[] = []) {
        this.members = members;
        this.members.sort((a,b) => b.power - a.power);
    }

    toString(): string {
        return this.members.map(member => member.toString()).join(' + ').replaceAll('+ -','- ');
    }

    getValueP(x: TAnyType): TAnyType {
        const calc = new Calculator();
        return this.members.reduce((S, elem) => 
            calc.add(S, calc.prod(calc.pow(x, elem.power), elem.value)),
            calc.zero(x)   // первоначальное значение S
            );
    }
}

export default Polynom;