import { Figure } from "../../../modules/math3D";
import { 
    BottleKleineSettings, CubeSettings, RingSettings,
    SphereSettings, TorSettings, ConeSettings, EllipsoidSettings,
    EllipticalCylinderSettings, EllipticalParaboloidSettings,
    HyperbolicSettings, ParabolicCylinderSettings, SadleSettings,
    SingleHyperboleSettings, TwoHyperboleSettings,
} from "./settings";

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
            {(figure && figure.constructor.name === 'BottleKleine') && <div><BottleKleineSettings figure={figure}/></div>}
            {(figure && figure.constructor.name === 'Cone') && <div><ConeSettings figure={figure}/></div>}
            {(figure && figure.constructor.name === 'Ellipsoid') && <div><EllipsoidSettings figure={figure}/></div>}
            {(figure && figure.constructor.name === 'EllipticalCylinder') && <div><EllipticalCylinderSettings figure={figure}/></div>}
            {(figure && figure.constructor.name === 'EllipticalParaboloid') && <div><EllipticalParaboloidSettings figure={figure}/></div>}
            {(figure && figure.constructor.name === 'Hyperbolic') && <div><HyperbolicSettings figure={figure}/></div>}
            {(figure && figure.constructor.name === 'ParabolicCylinder') && <div><ParabolicCylinderSettings figure={figure}/></div>}
            {(figure && figure.constructor.name === 'Sadle') && <div><SadleSettings figure={figure}/></div>}
            {(figure && figure.constructor.name === 'SingleHyperbole') && <div><SingleHyperboleSettings figure={figure}/></div>}
            {(figure && figure.constructor.name === 'TwoHyperbole') && <div><TwoHyperboleSettings figure={figure}/></div>}

            {figure && <div><button onClick={() => delFigure()} className="output mar_r">Удалить фигуру</button></div>}
        </div>
    );
    
}

export default FigureUI;