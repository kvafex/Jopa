import { Point } from "../entities";

const useWIN3D = (x, y) => {
    const WIN = {
        LEFT: -x / 100 * document.documentElement.clientWidth,
        BOTTOM: -y / 100 * document.documentElement.clientHeight,
        WIDTH: 2 * x / 100 * document.documentElement.clientWidth,
        HEIGHT: 2 * y / 100 * document.documentElement.clientHeight,
        CAMERA: new Point(0, 0, 50),
        FOCUS: new Point(0, 0, 30)
    };
    return WIN;
}

export default useWIN3D;