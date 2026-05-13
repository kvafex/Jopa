import { TWIN } from "./../canvas/Canvas";

const useWIN2D = (x: number, y: number): TWIN => {
    return {
        LEFT: -x / 100 * document.documentElement.clientWidth,
        BOTTOM: -y / 100 * document.documentElement.clientHeight,
        WIDTH: 2 * x / 100 * document.documentElement.clientWidth,
        HEIGHT: 2 * y / 100 * document.documentElement.clientHeight,
    };
}

export default useWIN2D;