import { ICalculator } from "../types"

class RealCalculator implements ICalculator<number>{
    add(a: number, b: number): number { return a + b}
    sub(a: number, b: number): number { return a - b}
    mult(a: number, b: number): number { return a * b}
    div(a: number, b: number): number { return a / b}
    one(): number { return 1}
    zero(): number { return 0}
    pow(a: number, b: number) { return a ** b}
    prod(a: number, b: number) { return a * b}
}

export default RealCalculator;