import { Figure } from "../../../modules/math3D";
import { CubeSettings, RingSettings, SphereSettings, TorSettings } from "./settings";

type TFigureUI = {
    listRef: React.RefObject<HTMLSelectElement>,
    list: Array<string>,
    figure: Figure,
    scenes: Array<Figure>,
    changeFigure: () => void,
}

const FigureUI: React.FC <TFigureUI> = ({listRef, list, figure, scenes, changeFigure}) => {
    
    const delFigure = () => {
        const newScene = scenes;
        newScene.splice(listRef.current.selectedIndex - 1, 1);
        list.splice(listRef.current.selectedIndex - 1, 1);
        scenes = newScene;
        changeFigure();
    }
    
    return (
        <div>
            {(figure && figure.constructor.name === 'Cube') && <div><CubeSettings figure={figure}/></div>}
            {(figure && figure.constructor.name === 'Ring') && <div><RingSettings figure={figure}/></div>}
            {(figure && figure.constructor.name === 'Sphere') && <div><SphereSettings figure={figure}/></div>}
            {(figure && figure.constructor.name === 'Tor') && <div><TorSettings figure={figure}/></div>}
            {figure && <div><button onClick={() => delFigure()} className="output mar_r">Удалить фигуру</button></div>}
        </div>
    );
    
}

export default FigureUI;