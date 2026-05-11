import Canvas, { TWIN } from "./../../../modules/canvas/Canvas";
import { TFn } from "./../../../modules/math2D/entities/Func";
import Math2D from "./../../../modules/math2D/Math2D";

type TIntegral = {
    f: TFn,
    rangeAB: number[]
}

type TParam = { 
    x: TFn, 
    y: TFn, 
    range: number[], 
    color: string, 
    width: number
}

const usePrint = (WIN: TWIN, math: Math2D): [
    setCanvas: (c: Canvas) => void, 
    setMouseX: (m: number) => void, 
    printFunction: (f: TFn, color: string, width: number) => void, 
    printIntegral: ({f, rangeAB}: TIntegral) => void, 
    printNotIntegral: (f1: TFn, f2: TFn, a: number, b: number, color: string) => void, 
    printOXY: () => void, 
    printParametric: ({ x, y, range, color, width }: TParam) => void, 
    printTangent: (f: TFn, x0: number) => void
] => {
    let canvas: Canvas = null!;
    let mouseX: number = null!;

    const setCanvas = (c: Canvas): void => {canvas = c};

    const setMouseX = (m: number): void => {mouseX = m};

    const printVerticalLine = (x: number, color = 'rgba(78, 63, 63, 0.67)'): void => {
        const { BOTTOM, HEIGHT } = WIN;
        const TOP = HEIGHT + BOTTOM;
        canvas.line(x, BOTTOM, x, TOP, color, 1, true);
    }

    const printFunction = (f: TFn, color = '#f00', width = 2): void => {
        const { LEFT, WIDTH } = WIN;
        let x = LEFT;
        const dx = WIDTH / 100;
        const points = math.pointsVertical(f, LEFT, WIDTH + LEFT );
        while (x < WIDTH + LEFT) {
            if (isNaN(x) || (Math.abs(f(x) - f(x + dx)) > 40 && f(x) * f(x + dx))) {
                x += 4 * dx;
            }
            canvas.line(x, f(x), x + dx, f(x + dx), color, width);
            x += dx;
        }
        for (let i = 0; i < points.length; i++) {
            printVerticalLine(points[i]);
        }
    }

    const printParametric = ({ x, y, range, color, width }: TParam): void => {
        let t = range[0];
        const dt = (range[1] - range[0]) / 100;
        while (t <= range[1]) {
            canvas.line(x(t), y(t), x(t + dt), y(t + dt), color, width);
            t += dt;
        }
    }

    const printIntegral = ({ f, rangeAB }: TIntegral): void => {
        const [a, b] = rangeAB;
        const points = [{ x: a, y: 0 }, { x: a, y: f(a) }];
        for (let i = a; i <= b; i += 0.0001) {
            points.push({ x: i, y: f(i) });
        }
        points.push({ x: b, y: f(b) }, { x: b, y: 0 });
        canvas.polygon(points);
        canvas.text(mouseX, f(mouseX), `${math.getIntegral(f, a, b)}`);
    }

    const printNotIntegral = (f1: TFn, f2: TFn, a: number, b: number, color = 'rgba(33, 0, 221, 0.44)'): void => {
        const points = [];
        let x = a;
        const dx = (b - a) / 100;
        while (x <= b) {
            points.push({ x, y: f1(x) });
            x += dx
        }
        x = b;
        while (x >= a) {
            points.push({ x, y: f2(x) });
            x -= dx
        }
        points.push({ x: a, y: f1(a) });
        canvas.polygon(points, color);
    }

    const printOXY = (): void => {
        const { LEFT, WIDTH, BOTTOM, HEIGHT } = WIN;
        const RIGHT = WIDTH + LEFT;
        const TOP = HEIGHT + BOTTOM;
        const color = '#ddd';
        for (let i = 1; i < RIGHT; i++) {
            canvas.line(i, BOTTOM, i, TOP, color);
            if (i % 10 === 0) {
                canvas.line(i, -0.4, i, 0.4, '#000');
            } else {
                if (i % 5 === 0) {
                    canvas.line(i, -0.2, i, 0.2, '#000');
                } else {
                    canvas.line(i, -0.05, i, 0.05, '#000');
                }
            }
            canvas.text(i, 0, `${i}`);
        }
        for (let i = -1; i > LEFT; i--) {
            canvas.line(i, BOTTOM, i, TOP, color);
            if (i % 10 === 0) {
                canvas.line(i, -0.4, i, 0.4, '#000');
            } else {
                if (i % 5 === 0) {
                    canvas.line(i, -0.2, i, 0.2, '#000');
                } else {
                    canvas.line(i, -0.05, i, 0.05, '#000');
                }
            }
            canvas.text(i, 0, `${i}`);
        }
        for (let i = 1; i < TOP; i++) {
            canvas.line(LEFT, i, RIGHT, i, color);
            if (i % 10 === 0) {
                canvas.line(-0.4, i, 0.4, i, '#000');
            } else {
                if (i % 5 === 0) {
                    canvas.line(-0.2, i, 0.2, i, '#000');
                } else {
                    canvas.line(-0.05, i, 0.05, i, '#000');
                }
            }
            canvas.text(0, i, `${i}`);
        }
        for (let i = -1; i > BOTTOM; i--) {
            canvas.line(LEFT, i, RIGHT, i, color);
            if (i % 10 === 0) {
                canvas.line(-0.4, i, 0.4, i, '#000');
            } else {
                if (i % 5 === 0) {
                    canvas.line(-0.2, i, 0.2, i, '#000');
                } else {
                    canvas.line(-0.05, i, 0.05, i, '#000');
                }
            }
            canvas.text(0, i, `${i}`);
        }
        canvas.line(LEFT, 0, RIGHT, 0, '#000', 2);
        canvas.line(0, BOTTOM, 0, TOP, '#000', 2);
        canvas.line(RIGHT, 0, RIGHT - 0.5, 0.25);
        canvas.line(RIGHT, 0, RIGHT - 0.5, -0.25);
        canvas.line(0, TOP, 0.25, TOP - 0.5);
        canvas.line(0, TOP, -0.25, TOP - 0.5);
    }

    const printTangent = (f: TFn, x0: number): void => {
        const [k, b] = math.getTangent(f, x0);
        const x1 = WIN.LEFT;
        const x2 = WIN.LEFT + WIN.WIDTH;
        const y1 = k * x1 + b;
        const y2 = k * x2 + b;
        canvas.line(x1, y1, x2, y2, '#aaa', 1, true);
        canvas.point(x0, f(x0), 'red', 3);
    }

    return [setCanvas, setMouseX, printFunction, printIntegral, printNotIntegral, printOXY, printParametric, printTangent];
}

export default usePrint;