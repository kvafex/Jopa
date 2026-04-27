import RealCalculator from "./RealCalculator";
import { Complex } from "../types";

class ComplexCalculator extends RealCalculator {
    add(a, b) {
        return new Complex(
            super.add(a.re, b.re),
            super.add(a.im, b.im)
        )
    }

    sub(a, b) {
        return new Complex(
            super.sub(a.re, b.re),
            super.sub(a.im, b.im)
        )
    }

    mult(a, b) {
        return new Complex(
            super.sub(super.mult(a.re, b.re), super.mult(a.im, b.im)),
            super.add(super.mult(a.re, b.im), super.mult(a.im, b.re))
        )
    }

    one() { return new Complex(1) }
    zero() { return new Complex() }

    prod(a, p) {
        return new Complex(
            super.mult(p, a.re),
            super.mult(p, a.im)
        )
    }

    inv(a) {
        return new Complex(
            super.div(a.re, super.add(super.pow(a.re, 2), super.pow(a.im, 2))),
            super.div(-a.im, super.add(super.pow(a.re, 2), super.pow(a.im, 2))))
    }

    div(a, b) { return this.mult(a, this.inv(b)) }

    pow(a, b) {
        const bNum = b.re;
        if (bNum === 0) {
            return new Complex(this.one());
        }
        const result = a;
        for (let i = 1; i < bNum; i++) {
            a = this.mult(result, a);
        }
        return a;
    }
}

export default ComplexCalculator;