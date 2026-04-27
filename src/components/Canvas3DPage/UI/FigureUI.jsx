import { useState } from "react";
import { CubeSettings, RingSettings, SphereSettings, TorSettings } from "./settings";

const FigureUI = (props) => {
    
    let listRef = props.listRef;
    const list = props.list;
    const figure = props.figure;
    const changeFigure = props.changeFigure;
    let scenes = props.scenes;
    const showAnimations = props.showAnimations;
    const math3D = props.math3D;
    
    const delFigure = () => {
        const newScene = scenes;
        newScene.splice(listRef.current.selectedIndex - 1, 1);
        list.splice(listRef.current.selectedIndex - 1, 1);
        scenes = newScene;
        changeFigure();
    }
    
    if (figure) {
        return (
        <div>
            {figure.constructor.name === 'Cube' && <div><CubeSettings figure={figure}/><button onClick={() => delFigure()} className="output mar_r">Удалить фигуру</button></div>}
            {figure.constructor.name === 'Ring' && <div><RingSettings figure={figure}/><button onClick={() => delFigure()} className="output mar_r">Удалить фигуру</button></div>}
            {figure.constructor.name === 'Sphere' && <div><SphereSettings figure={figure}/><button onClick={() => delFigure()} className="output mar_r">Удалить фигуру</button></div>}
            {figure.constructor.name === 'Tor' && <div><TorSettings figure={figure}/><button onClick={() => delFigure()} className="output mar_r">Удалить фигуру</button></div>}
        </div>);
    }
    
}

export default FigureUI;