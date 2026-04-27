import { Complex } from "../types";

class RealCalculator{
    add(a,b){ return a + b}
    sub(a,b){ return a - b}
    mult(a,b){ return a * b}
    div(a,b){ return a / b}
    one(){ return new Complex(1)}
    zero(){ return new Complex()}
    pow(a,b){ const bNum = b.re;return a ** bNum}
    prod(a,b){ return a * b}
}

export default RealCalculator;