import { useEffect } from "react";
import Math2D from "../../modules/math2D/Math2D";
import UI2D from "./UI/UI2D";
import usePrint from "./UI/hooks/usePrint";
import useCanvas from "../../modules/canvas/useCanvas/useCanvas";

import './Canvas2DPage.css';

const canvas2DID = 'graph2D';

const Canvas2DPage = () => {
    const WIN = {
            LEFT: -5,
            BOTTOM: -5,
            WIDTH: 10,
            HEIGHT: 10,
    };
    const [getCanvas, startRender, stopRender] = useCanvas(renderFrame);
    const math = new Math2D();
    const [ setCanvas, setMouseX, printFunction,
            printIntegral, printNotIntegral, printOXY, 
            printParametric, printTangent] = usePrint(WIN, math);
    const funcs = [];
    const funcsI = [];
    let canMove = false;
    let mouseX = 0;

    let canvas = null;
    
    
    useEffect(() => {
        canvas = getCanvas({
            id: canvas2DID,
            WIN,
            callbacks: {
                wheel: (event) => wheelHandler(event),
                mouseup: () => mouseupHandler(),
                mousedown: (event) => mousedownHandler(event),
                mousemove: (event) => mousemoveHandler(event),
                mouseleave: () => mouseleaveHandler(),
            }
        });
        
        setCanvas(canvas);
        setMouseX(mouseX);
        startRender();
        return () => stopRender();
    });

    const wheelHandler = (event) => {
        const delta = event.wheelDelta < 0 ? 0.2 : -0.2;
        if (delta === 0.2 && (WIN.WIDTH > 25 || WIN.HEIGHT > 25)) {
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

    const mousedownHandler = (event) => {
        mouseX = event.clientX;
        canMove = true;
    }

    const mouseupHandler = () => {
        canMove = false;
    }

    const mouseleaveHandler = () => {
        canMove = false;
    }

    const mousemoveHandler = (event) => {
        mouseX = canvas.sx(event.clientX) + WIN.LEFT;
        if (canMove) {
            WIN.LEFT -= canvas.sx(event.movementX);
            WIN.BOTTOM -= canvas.sy(event.movementY);
        }
    }

    function renderFrame(fps) {
        canvas.clear();
        printOXY();
        funcs.forEach(func => {
            if (func) {
                const { f, x, y, color, width, zeros, isShowIntegral, isShowZeros, isParam } = func;
                if (f && !isParam) {
                    printFunction(f, color, width);
                    printTangent(f, mouseX);
                    if (isShowZeros) {
                        zeros.forEach(x => canvas.point(x, 0, '#0a0', 3));
                    }
                    if (isShowIntegral) {
                        printIntegral(func);
                    }
                    if (funcsI.length && funcsI[0] && funcsI[1]) {
                        printNotIntegral(funcsI[0], funcsI[1], 0, 2);
                        canvas.text(mouseX, 0, `${math.getNotIntegral(funcsI[0], funcsI[1], 0, 2)}`);
                    }
                }
                if (x && y && isParam) {
                    printParametric(func);
                }
            }
        });
        canvas.text(WIN.LEFT + 0.1, WIN.BOTTOM + WIN.HEIGHT - 0.35, fps);
        canvas.render();
    }

    return (
        <div className="output flex_r iconTop">
            <canvas className="canvasE canvasHeight" id={canvas2DID}></canvas>
            <div>
                <UI2D funcs={funcs} />
            </div>
        </div>
    );
}

export default Canvas2DPage;