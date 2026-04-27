import Canvas from "../Canvas";

const useCanvas = (renderFrame) => {
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
    let id = null;

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

    const getCanvas = (options) => new Canvas(options);
    const startRender = () => loop();
    const stopRender = () => window.cancelAnimationFrame(id);
    
    return [getCanvas, startRender, stopRender];
}

export default useCanvas;