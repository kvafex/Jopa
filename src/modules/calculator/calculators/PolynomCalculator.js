import RealCalculator from "./RealCalculator";
import { Member, Polynom } from "../types";

class PolynomCalculator extends RealCalculator {
    div(a, b) { return null }

    add(a, b) {
        const members = [];
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

    sub(a, b) {
        const members = [];
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

    one() { return new Polynom([new Member(1)]) }

    zero() { return new Polynom([new Member()]) }

    mult(a, b) {
        let polynom = this.zero();
        a.members.forEach(elemA => {
            const members = [];
            b.members.forEach(elemB => {
                members.push(new Member(elemA.value * elemB.value, elemA.power + elemB.power));
            });
            polynom = this.add(polynom, new Polynom(members));
        });
        return polynom;
    }

    pow(a, b) {
        const bNum = b.re;
        if (bNum === 0) {
            return this.one();
        }
        const result = a;
        for (let i = 1; i < bNum; i++) {
            a = this.mult(result, a);
        }
        return a;
    }

    prod(a, b) {
        if (b === 0) {
            return this.one();
        }
        const members = [];
        for (let i = 0; i < a.members.length; i++) {
            members.push(new Member(a.members[i].value * b, a.members[i].power));
        }
        return new Polynom(members);
    }
}

export default PolynomCalculator;