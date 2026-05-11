import { ICalculator } from "../types";
import { Complex } from "../entities";

class ComplexCalculator implements ICalculator<Complex> {
    add(a: Complex, b: Complex): Complex {
        return new Complex( a.re + b.re, a.im + b.im )
    }

    sub(a: Complex, b: Complex): Complex {
        return new Complex(a.re - b.re, a.im - b.im)
    }

    mult(a: Complex, b: Complex): Complex {
        return new Complex( a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re )
    }

    one(): Complex { return new Complex(1) }
    zero(): Complex { return new Complex() }

    prod(a: Complex, p: number): Complex {
        return new Complex( p * a.re, p * a.im );
    }

    inv(a: Complex): Complex {
        const dt = a.re ** 2 + a.im ** 2;
        return new Complex( a.re / dt, -a.im / dt );
    }

    div(a: Complex, b: Complex): Complex { return this.mult(a, this.inv(b)) }

    pow(a: Complex, b: number): Complex {
        if (b === 0) {
            return this.one();
        }
        const result = a;
        for (let i = 1; i < b; i++) {
            a = this.mult(result, a);
        }
        return a;
    }
}

export default ComplexCalculator;