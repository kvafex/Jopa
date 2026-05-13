import { useEffect } from "react";
import Math2D from "../../modules/math2D/Math2D";
import UI2D from "./UI/UI2D";
import usePrint from "./UI/usePrint";
import useCanvas from "../../modules/canvas/useCanvas";
import Canvas, { TWIN } from "../../modules/canvas/Canvas";
import Func, { EFN, TFn } from "../../modules/math2D/entities/Func";
import useWIN2D from "../../modules/math2D/useWIN2D";

import './Canvas2DPage.css';

const canvas2DID = 'graph2D';

const Canvas2DPage: React.FC = () => {
    const PercentPageX = 0.99;
    const PercentPageY = 0.98;
    const WIN = useWIN2D(PercentPageX, PercentPageY);
    const [getCanvas, startRender, stopRender] = useCanvas(renderFrame);
    const math: Math2D = new Math2D();
    const [ setCanvas, setMouseX, printFunction,
            printIntegral, printNotIntegral, printOXY, 
            printParametric, printTangent] = usePrint(WIN, math);
    const funcs: Array<Func> = [];
    const funcsI: Array<TFn> = [];
    let canMove = false;
    let mouseX = 0;

    let canvas: Canvas = null!;
    
    
    useEffect(() => {
        canvas = getCanvas({
            id: canvas2DID,
            WIN,
            width: PercentPageX * document.documentElement.clientWidth,
            height: PercentPageY * document.documentElement.clientHeight,
            callbacks: {
                wheel: (event: WheelEvent) => wheelHandler(event),
                mouseup: () => mouseupHandler(),
                mousedown: (event: MouseEvent) => mousedownHandler(event),
                mousemove: (event: MouseEvent) => mousemoveHandler(event),
                mouseleave: () => mouseleaveHandler(),
                contextmenu: () => null,
            }
        });
        
        setCanvas(canvas);
        setMouseX(mouseX);
        startRender();
        return () => stopRender();
    });

    const wheelHandler = (event: WheelEvent): void => {
        const delta = event.deltaY > 0 ? 0.2 : -0.2;
        if (delta === 0.2 && (WIN.WIDTH > 40 || WIN.HEIGHT > 40)) {
            WIN.WIDTH = WIN.WIDTH - delta;
            WIN.HEIGHT = WIN.HEIGHT - delta;
            WIN.LEFT = WIN.LEFT + delta / 2;
            WIN.BOTTOM = WIN.BOTTOM + delta / 2;
        }
        if (delta === -0.2 && (WIN.WIDTH < 3.5 || WIN.HEIGHT < 3.5)) {
            WIN.WIDTH = WIN.WIDTH - delta;
            WIN.HEIGHT = WIN.HEIGHT - delta;
            WIN.LEFT = WIN.LEFT + delta / 2;
            WIN.BOTTOM = WIN.BOTTOM + delta / 2;
        }
        WIN.WIDTH = WIN.WIDTH + delta;
        WIN.HEIGHT = WIN.HEIGHT + delta;
        WIN.LEFT = WIN.LEFT - delta / 2;
        WIN.BOTTOM = WIN.BOTTOM - delta / 2;
    }

    const mousedownHandler = (event: MouseEvent): void => {
        mouseX = event.clientX;
        canMove = true;
    }

    const mouseupHandler = (): void => {
        canMove = false;
    }

    const mouseleaveHandler = (): void => {
        canMove = false;
    }

    const mousemoveHandler = (event: MouseEvent): void => {
        mouseX = canvas.sx(event.clientX) + WIN.LEFT;
        if (canMove) {
            WIN.LEFT -= canvas.sx(event.movementX);
            WIN.BOTTOM -= canvas.sy(event.movementY);
        }
    }

    function renderFrame(fps: number): void {
        canvas.clear();
        printOXY();
        funcs.forEach(func => {
            const { f, color, width, zeros, isShowIntegral, isShowZeros, isParam } = func;
            if (f && !isParam) {
                printFunction(f, color, width);
                printTangent(f, mouseX);
                if (isShowZeros) {
                    math.getZeros(f, WIN.LEFT, WIN.LEFT + WIN.WIDTH).forEach(x => canvas.point(x!, 0, '#0a0', 3));
                }
                if (isShowIntegral) {
                    printIntegral(func);
                }
                if (funcsI.length && funcsI.length <= 2 && funcsI[0] && funcsI[1]) {
                    printNotIntegral(funcsI[0], funcsI[1], 0, 2, '#606060ad');
                    canvas.text(mouseX, 0, `${math.getNotIntegral(funcsI[0], funcsI[1], 0, 2)}`);
                }
            }
            if (func[EFN.x] && func[EFN.y] && isParam) {
                printParametric(func);
            }
        });
        canvas.text(WIN.LEFT + WIN.WIDTH - 0.5, WIN.BOTTOM + WIN.HEIGHT - 0.35, String(fps));
        canvas.render();
    }

    return (
        <div className="flex_r">
            <canvas  className="fixed" id={canvas2DID}></canvas>
            <div>
                <UI2D funcs={funcs} funcsI={funcsI} />
            </div>
        </div>
    );
}

export default Canvas2DPage;