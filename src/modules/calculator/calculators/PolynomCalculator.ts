import { ICalculator } from "../types";
import { Member, Polynom } from "../entities";

class PolynomCalculator implements ICalculator<Polynom> {
    div(): Polynom | null { return null }

    add(a: Polynom, b: Polynom): Polynom {
        const members: Member[] = [];
        a.members.forEach(elemA => {
            const member = b.members.find(elemB => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(elemA.value + member.value, elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.members.forEach(elemB => {
            if (!members.find(elem => elem.power === elemB.power)) {
                members.push(new Member(elemB.value, elemB.power));
            }
        });
        return new Polynom(members.filter(elem => elem.value !== 0));
    }

    sub(a: Polynom, b: Polynom): Polynom {
        const members: Member[] = [];
        a.members.forEach(elemA => {
            const member = b.members.find(elemB => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(elemA.value - member.value, elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.members.forEach(elemB => {
            if (!members.find(elem => elem.power === elemB.power)) {
                members.push(new Member(-elemB.value, elemB.power));
            }
        });
        return new Polynom(members.filter(elem => elem.value !== 0));
    }

    one(): Polynom { return new Polynom([new Member(1)]) }

    zero(): Polynom { return new Polynom([new Member()]) }

    mult(a: Polynom, b: Polynom): Polynom {
        let polynom = this.zero();
        a.members.forEach(elemA => {
            const members: Member[] = [];
            b.members.forEach(elemB => {
                members.push(new Member(elemA.value * elemB.value, elemA.power + elemB.power));
            });
            polynom = this.add(polynom, new Polynom(members));
        });
        return polynom;
    }

    pow(a: Polynom, b: number): Polynom {
        if (b === 0) {
            return this.one();
        }
        const result = a;
        for (let i = 1; i < b; i++) {
            a = this.mult(result, a);
        }
        return a;
    }

    prod(a: Polynom, b: number): Polynom {
        if (b === 0) {
            return this.one();
        }
        const members: Member[] = [];
        for (let i = 0; i < a.members.length; i++) {
            members.push(new Member(a.members[i].value * b, a.members[i].power));
        }
        return new Polynom(members);
    }
}

export default PolynomCalculator;