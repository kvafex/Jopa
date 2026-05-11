export type TFn = (x: number) => number;

type TFunc = {
    f: TFn,
    x: TFn,
    y: TFn,
    range: number[],
    rangeAB: number[],
    color: string,
    width: number,
}

export enum EFN {
    f = 'f',
    x = 'x',
    y = 'y'
}

class Func {
    [EFN.f]: TFn;
    [EFN.x]: TFn;
    [EFN.y]: TFn;
    range: number[];
    rangeAB: number[] = [0, 2];
    color: string;
    width: number;
    zeros: number[] = [];
    isParam: boolean = false;
    isShowZeros: boolean = false;
    isShowIntegral: boolean = false;
    isNotIntegral: boolean = false;

    constructor({
        f,
        x,
        y,
        range,
        color,
        width
    }: TFunc) {
        this[EFN.f] = f;
        this[EFN.x] = x;
        this[EFN.y] = y;
        this.range = range;
        this.color = color;
        this.width = width;
    }

    setF(str: string): void {
        try {
            let f: TFn = null!;
            eval(`f = (x) => ${str}`);
            this[EFN.f] = f;
        } catch (e) { }
    }

    setX(str: string): void {
        try {
            let f: TFn = null!;
            eval(`f = (t) => ${str}`);
            this[EFN.x] = f;
        } catch (e) { }
    }

    setY(str: string): void {
        try {
            let f: TFn = null!;
            eval(`f = (t) => ${str}`);
            this[EFN.y] = f;
        } catch (e) { }
    }

    setRange(range: number[]): void {
        this.range = range;
    }

    setAB(range: number[]): void {
        this.rangeAB = range;
    }

    setColor(color: string): void {
        this.color = color;
    }

    setWidth(width: number): void {
        this.width = width;
    }

    showParam(): void {
        this.isParam = !this.isParam;
    }

    showZeros(): void {
        this.isShowZeros = !this.isShowZeros;
    }

    showIntegral(): void {
        this.isShowIntegral = !this.isShowIntegral;
    }

    toString(name: EFN = EFN.f): string {
        return String(this[name]).replaceAll(' ','').split('=>')[1];
    }
}

export default Func;