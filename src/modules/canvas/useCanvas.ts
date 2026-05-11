import Canvas, { TCanvas } from "./Canvas";

declare global {
    interface Window {
        requestAnimFrame: (callback: FrameRequestCallback) => number;
        webkitRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        mozRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        oRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        msRequestAnimationFrame: (callback: FrameRequestCallback) => number;
    }
}

const useCanvas = (
    renderFrame: (fps: number) => void
): [
    getCanvas: (options: TCanvas) => Canvas,
    startRender: () => void, 
    stopRender: () => void
] => {
    window.requestAnimFrame = (() => {
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame || 
        ((callback) => window.setTimeout(callback, 1000 / 60));
    })();

    let frames = 0;
    let fps = 0;
    let lastTimestamp = Date.now();
    let id = 0;

    const loop = () => {
        frames++;
        const timestamp = Date.now();
        if (timestamp - lastTimestamp >= 1000) {
            fps = frames;
            frames = 0;
            lastTimestamp = timestamp;
        }
        renderFrame(fps);
        id = window.requestAnimFrame(loop);
    }

    const getCanvas = (options: TCanvas) => new Canvas(options);
    const startRender = () => loop();
    const stopRender = () => window.cancelAnimationFrame(id);
    
    return [getCanvas, startRender, stopRender];
}

export default useCanvas;