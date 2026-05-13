import Calculator from "../Calculator";
import { TAnyType } from "../types";
import Complex from "./Complex";
import Matrix from "./Matrix";
import Member from "./Member";
import Vector from "./Vector";

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
        let length = 0;

        if (x instanceof Vector || x instanceof Matrix) {
            length = x.values.length;
        }

        if (x instanceof Polynom) {
            length = x.members.length;
        }

        return this.members.reduce((S, elem) => 
            calc.add(S, calc.prod(calc.pow(x, elem.power), elem.value)),
            calc.zero(length)   // первоначальное значение S
            );
    }
}

export default Polynom;