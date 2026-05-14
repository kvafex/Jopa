import { 
    RealCalculator, ComplexCalculator, VectorCalculator,
    MatrixCalculator, PolynomCalculator 
} from "./calculators";
import { Complex, Matrix, Member, Polynom, Vector } from "./entities";
import { ICalculator, TAnyType } from "./types";

export enum EOperand {
    add = 'add',
    sub = 'sub',
    mult = 'mult',
    div = 'div',
    one = 'one', 
    zero = 'zero', 
    pow = 'pow', 
    prod = 'prod',
    getValue = 'getValue', 
}

class Calculator implements ICalculator<TAnyType>{

    getMatrix(str: string): Matrix | null {
        if(!str.includes(';') || str[0] === '(') {
            return null;
        }

        let arr: string[][] | string = str.replaceAll('[','').replaceAll(']','');

        if(str.includes('),')) {
            arr = arr.replaceAll('),','^').split(';').map(row => row.split('^'));
        } else {
            arr = arr.split(';').map(row => row.split(','));
        }

        return new Matrix(arr.map(row => row.map(elem => this.getValue(elem))));
    }

    getVector(str: string): Vector | null {
        if (!str.includes('(')) {
            return null;
        }

        str = str.replaceAll('(','').replaceAll(')','');

        return new Vector(str.split(',').map(elem => this.getValue(elem)));
    }

    getMember(str: string): Member {
        if (!str.includes('x')) {
            return new Member(Number(str));
        } else {
            let value = str.includes('-x') ? -1 : 1;
            let power = 1;
            let arr = str.split('x');

            if (arr[0].includes('*')) {
                value = Number(arr[0].replaceAll('*',''));
            }

            if (arr[1].includes('^')) {
                power = Number(arr[1].replaceAll('^',''));
            }
            
            return new Member(value, power);
        }
    }

    getPolynom(str: string): Polynom | null {
        if (!str.includes('x')) {
            return null;
        }

        const arr = str.replaceAll('-','+-').split('+')
                        .filter(elem => elem !== '');
        const members: Member[] = [];
        arr.forEach(elem => members.push(this.getMember(elem)));

        return new Polynom(members);
    }
    
    getComplex(str: string): Complex | null{
        str = str.replaceAll('*','');
        let re = 0;
        let im = 0;

        if (!str.includes('i')) {
            return null;
        }

        if (str === 'i' || str === '-i') {
            re = 0;
            (str[0] === '-')? im = -1 : im = 1;
        } else {
            let arr: string[] | string = str.replaceAll('i','');

            if(arr.split('+').length === 1 || arr.split('-').length === 1) {
                re = 0;
                im = Number(arr);
            }

            if(arr.includes('+')) {
                if(arr.split('+')[1] === ''){
                    arr = arr.split('+');
                    re = Number(arr[0]);
                    im = 1;
                } else{
                    arr = arr.split('+');
                    re = Number(arr[0]);
                    im = Number(arr[1]);
                }
            } else{
                arr = arr.split('-');
                if(arr.length === 3){
                    re = -Number(arr[1]);
                    im = -Number(arr[2]);
                    if(arr[2] === ''){
                        im = -1;
                    }
                }

                if(arr.length === 2) {
                    re = Number(arr[0]);
                    im = -Number(arr[1]);
                    if(arr[1] === ''){
                        im = -1;
                    }
                }
            }
        }

        return new Complex(re,im);
    }

    getValue(str: string): TAnyType { 
        str = str.replaceAll(' ','').replaceAll('\n','');

        return this.getPolynom(str)
            || this.getMatrix(str) 
            || this.getVector(str) 
            || this.getComplex(str)
            || Number(str);
    }

    get(a: TAnyType): ICalculator<TAnyType> {
        if(a instanceof Polynom) { 
            return new PolynomCalculator() as ICalculator<TAnyType>;
        }

        if(a instanceof Matrix) { 
            return new MatrixCalculator(this.get(a.values[0][0])) as ICalculator<TAnyType>;
        }

        if(a instanceof Vector) { 
            return new VectorCalculator(this.get(a.values[0])) as ICalculator<TAnyType>;
        }

        if(a instanceof Complex) {
            return new ComplexCalculator() as ICalculator<TAnyType>;
        }

        return new RealCalculator() as ICalculator<TAnyType>;
    }
    
    [EOperand.add](a: TAnyType, b: TAnyType): TAnyType { return this.get(a).add(a, b)}
    [EOperand.sub](a: TAnyType, b: TAnyType): TAnyType { return this.get(a).sub(a, b)}
    [EOperand.mult](a: TAnyType, b: TAnyType): TAnyType { return this.get(a).mult(a, b)}
    [EOperand.div](a: TAnyType, b: TAnyType): TAnyType | null { return this.get(a).div(a, b)}
    [EOperand.one](a: number): TAnyType { return this.get(a).one(a)}
    [EOperand.zero](a: number): TAnyType { return this.get(a).zero(a)}
    [EOperand.pow](a: TAnyType, b: number): TAnyType { return this.get(a).pow(a, b)}
    [EOperand.prod](a: TAnyType, b: number): TAnyType { return this.get(a).prod(a, b)}
}

export default Calculator;