import {Complex, Matrix, Vector, Polynom} from "./entities"

export type TAnyType = Complex | Matrix | Vector | Polynom | number;

export interface ICalculator<T> {
    add: (a: T, b: T) => T;
    sub: (a: T, b: T) => T;
    mult: (a: T, b: T) => T;
    div: (a: T, b: T) => T | null;
    one: (length: number) => T;
    zero: (length: number) => T;
    pow: (a: T, b: number) => T;
    prod: (a: T, b: number) => T;
}