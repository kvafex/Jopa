import Point from "./Point";

export type TRgb = {
    r: number,
    g: number,
    b: number
}
export enum EDist {
    distance = 'distance',
    lumen = 'lumen'
}

class Polygon {
    points: Point[];
    color: TRgb;
    center: Point = new Point();
    [EDist.distance]: number = 0;
    [EDist.lumen]: number = 1;
    
    constructor(points: Point[] = [], color = '#ff0000') {
        this.points = points;
        this.color = this.hexToRgb(color);
    }

    hexToRgb(hex: string): TRgb {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/.exec(hex);
        return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } :
            { r: 0, g: 0, b: 0 };
    }

    rgbToHex(r: number, g: number, b: number): string {
        return `rgb(${r},${g},${b})`;
    }
}

export default Polygon;