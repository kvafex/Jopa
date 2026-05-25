import FigureUI from "./FigureUI";

import { useState, useRef, useMemo, ChangeEvent } from "react";

import {
    Figure, Cube, Ring, Sphere, BottleKleine,
    Sadle, EllipticalCylinder, Hyperbolic, ParabolicCylinder,
    Tor, Cone, Ellipsoid, SingleHyperbole, TwoHyperbole,
    SolarSystem, TorTheory, EllipticalParaboloid,
    Light,
} from "../../../modules/math3D";

type TShow = {
    points: boolean,
    edges: boolean,
    polygons: boolean,
    animations: boolean,
    shadows: boolean,
}

type TCanvasPage = {
    scenes: Array<Figure>,
    show: TShow,
    listLight: Array<Light>,
}

const UI3D: React.FC <TCanvasPage> = ({scenes, show, listLight}) => {

    const [showCanvasParam, setShowCanvasParam] = useState<boolean>(false);
    const [showLightParam, setShowLightParam] = useState<boolean>(false);
    const [showAddChangeList, setShowAddChangeList] = useState<boolean>(false);
    const [showButtons, setShowButtons] = useState<boolean>(false);
    const [figure, setFigure] = useState<Figure>(null!);
    const [update, setUpdate] = useState<number>(0);

    let listRef = useRef<HTMLSelectElement>(null!);
    let list: string[] = [];
    list = useMemo(() => list = [], []);
    const lightRef = useRef<HTMLSelectElement>(null!);

    const changeFigure = (): void => {
        setFigure(scenes[listRef.current.selectedIndex - 1]);
    }

    const showPoints = (event: React.ChangeEvent<HTMLInputElement>): void => {
        show.points = event.target.checked;
    }

    const showEdges = (event: React.ChangeEvent<HTMLInputElement>): void => {
        show.edges = event.target.checked;
    }

    const showPolygons = (event: React.ChangeEvent<HTMLInputElement>): void => {
        show.polygons = event.target.checked;
    }

    const showAnimations = (event: React.ChangeEvent<HTMLInputElement>): void => {
        show.animations = event.target.checked;
    }

    const showShadows = (event: React.ChangeEvent<HTMLInputElement>): void => {
        show.shadows = event.target.checked;
    }

    const changeLumen = (event: ChangeEvent, light: Light): void => {
        light.lumenPower = Number((event.target as HTMLInputElement).value);
        light = new Light(light.x, light.y, light.z, Number((event.target as HTMLInputElement).value));
    }
    
    const changeXLight = (event: React.KeyboardEvent, light: Light): void => {
        light.x = Number((event.target as HTMLInputElement).value);
        light = new Light(light.x, light.y, light.z, light.lumenPower);
    }
    
    const changeYLight = (event: React.KeyboardEvent, light: Light): void => {
        light.y = Number((event.target as HTMLInputElement).value);
        light = new Light(light.x, light.y, light.z, light.lumenPower);
    }
    
    const changeZLight = (event: React.KeyboardEvent, light: Light): void => {
        light.z = Number((event.target as HTMLInputElement).value);
        light = new Light(light.x, light.y, light.z, light.lumenPower);
    }


    const addFigure = (event: React.MouseEvent): void => {
        event.preventDefault();
        if (list.find(value => value === 'Sun') || list.find(value => value === 'Earth') || list.find(value => value === 'Moon')) return;
        const id = `${Math.round(Math.random() * 1000000)}`;
        switch ((event.target as HTMLSelectElement).value) {
            case 'Cube':
                list.push(`Cube №${id}`);
                scenes.push(new Cube());
                break;
            case 'Ring':
                list.push(`Ring №${id}`);
                scenes.push(new Ring());
                break;
            case 'BottleKleine':
                list.push(`BottleKleine №${id}`);
                scenes.push(new BottleKleine());
                break;
            case 'Sphere':
                list.push(`Sphere №${id}`);
                scenes.push(new Sphere());
                break;
            case 'Sadle':
                list.push(`Sadle №${id}`);
                scenes.push(new Sadle());
                break;
            case 'Tor':
                list.push(`Tor №${id}`);
                scenes.push(new Tor());
                break;
            case 'Hyperbolic':
                list.push(`Hyperbolic №${id}`);
                scenes.push(new Hyperbolic());
                break;
            case 'ParabolicCylinder':
                list.push(`ParabolicCylinder №${id}`);
                scenes.push(new ParabolicCylinder());
                break;
            case 'EllipticalCylinder':
                list.push(`EllipticalCylinder №${id}`);
                scenes.push(new EllipticalCylinder());
                break;
            case 'SingleHyperbole':
                list.push(`SingleHyperbole №${id}`);
                scenes.push(new SingleHyperbole());
                break;
            case 'TwoHyperbole':
                list.push(`TwoHyperbole №${id}`);
                scenes.push(new TwoHyperbole());
                break;
            case 'Ellipsoid':
                list.push(`Ellipsoid №${id}`);
                scenes.push(new Ellipsoid());
                break;
            case 'Cone':
                list.push(`Cone №${id}`);
                scenes.push(new Cone());
                break;
            case 'SolarSystem':
                list.push('Sun');
                list.push('Earth');
                list.push('Moon');
                (new SolarSystem()).planets.forEach(planet => scenes.push(planet));
                break;
            case 'TorTheory':
                list.push('Sun');
                list.push('Earth');
                list.push('Moon');
                (new TorTheory()).planets.forEach(planet => {scenes.push(planet)});
                break;
            case 'EllipticalParaboloid':
                list.push(`Elliptical Paraboloid №${id}`);
                scenes.push(new EllipticalParaboloid());
                break;
        }
        changeFigure();
        setUpdate(update + 1);
    }

    const addLight = (): void => {
        listLight.push(new Light(0, 0, 0, 1000));
        setUpdate(update + 1);
    }

    const delLight = (index: number): void => {
        listLight.splice(index, 1);
        setUpdate(update + 1);
    }

    const closeAllParam = (): void => {
        if (showAddChangeList) {
            setShowAddChangeList(false);
        }
        if (showLightParam) {
            setShowLightParam(false);
        }
        if (showCanvasParam) {
            setShowCanvasParam(false);
        }
        setShowButtons(false);
    }

    return (
    <div className="flex_c">
        <button className="panel iconTop mar_b" onClick={() => 
            {
                setShowButtons(!showButtons);
                if (showButtons) closeAllParam();
            }
            }>
                {showButtons ? '<' : '>'}
            </button>
            {showButtons &&
                <div className="flex_c panel mar_b">
                    <button className="mar_b" onClick={() => setShowCanvasParam(!showCanvasParam)}>Отрисовка составных частей фигур</button>
                    <button className="mar_b" onClick={() => setShowLightParam(!showLightParam)}>Параметры источника света</button>
                    <button className="mar_b" onClick={() => setShowAddChangeList(!showAddChangeList)}>Фигуры</button>
                </div>
            }

            <div className="flex_r mainPanel">
                <div className="flex_c">
                    <div className="panel flex_c mar_b mar_l">
                        {showCanvasParam &&
                            <div className="flex_c">
                                <label className="mar_b">Точки<input onChange={(event) => showPoints(event)} type="checkbox" className="checkbox" /></label>
                                <label className="mar_b">Рёбра<input onChange={(event) => showEdges(event)} type="checkbox" className="checkbox" /></label>
                                <label className="mar_b">Полигоны<input onChange={(event) => showPolygons(event)} defaultChecked type="checkbox" className="checkbox" /></label>
                                <label className="mar_b">Тени<input onChange={(event) => showShadows(event)} type="checkbox" className="checkbox" /></label>
                            </div>
                        }
                    </div>

                    <div className="panel flex_c mar_b mar_l">
                        {showLightParam &&
                            <div className="flex_c">
                                <div className="flex_r">
                                    <select ref={lightRef} className="output max_size mar_b">
                                        {listLight.map((option, index) => <option key={index}>Light №{index + 1}</option>)}
                                    </select>
                                    <button onClick={addLight} className="mar_l">+</button>
                                    {listLight.length > 1 && <button onClick={() => delLight((lightRef.current as HTMLSelectElement).selectedIndex)} className="mar_l">Удалить</button>}
                                </div>
                                <label className="mar_b">Сила света<input onChange={(event) => changeLumen(event, listLight[(lightRef.current as HTMLSelectElement).selectedIndex])} type="range" min={0} max={50000} /></label>
                                <div className="mar_b">Позиция света</div>
                                <input className="mar_b" placeholder="x" onKeyUp={(event) => changeXLight(event, listLight[(lightRef.current as HTMLSelectElement).selectedIndex])} />
                                <input className="mar_b" placeholder="y" onKeyUp={(event) => changeYLight(event, listLight[(lightRef.current as HTMLSelectElement).selectedIndex])} />
                                <input className="mar_b" placeholder="z" onKeyUp={(event) => changeZLight(event, listLight[(lightRef.current as HTMLSelectElement).selectedIndex])} />
                            </div>
                        }
                    </div>
                </div>

                <div className="flex_c panel mar_l">
                    {showAddChangeList &&
                        <div className="flex_c">
                            <label className="">Play<input onChange={(event) => showAnimations(event)} type="checkbox" className="checkbox" /></label>
                            <div className="flex_c">Открыть и выбрать(лкм), Добавить(пкм по боксу):
                                <select defaultValue={'Фигуры'} onContextMenu={(event) => addFigure(event)} className="output mar_b">
                                    <option disabled>Фигуры</option>
                                    <option value="Cube">CUBE</option>
                                    <option value="Chips">CHIPS</option>
                                    <option value="Ring">RING</option>
                                    <option value="Sphere">SPHERE</option>
                                    <option value="Tor">TOR</option>
                                    <option value="BottleKleine">BOTTLE KLEINE</option>
                                    <option value="Hyperbolic">HYPERBOLIC</option>
                                    <option value="ParabolicCylinder">PARABOLIC CYLINDER</option>
                                    <option value="EllipticalCylinder">ELLIPTICAL CYLINDER</option>
                                    <option value="SingleHyperbole">SINGLE HYPERBOLE</option>
                                    <option value="SolarSystem">SOLAR SYSTEM</option>
                                    <option value="TorTheory">TOR THEORY</option>
                                    <option value="TwoHyperbole">TWO HYPERBOLE</option>
                                    <option value="Ellipsoid">ELLIPSOID</option>
                                    <option value="Cone">CONE</option>
                                    <option value="EllipticalParaboloid">ELLIPTICALPARABOLOID</option>
                                </select>
                            </div>

                            <div className="flex_r">Выбрать фигуру:
                                <select onClick={changeFigure} defaultValue={'Создай фигуру и она появится здесь'} ref={listRef} className="output max_size mar_b">
                                    <option disabled>Создай фигуру и она появится здесь</option>
                                    {list.length === 0 ? null : list.map((option, index) => <option key={index}>{option}</option>)}
                                </select>
                                
                            </div>
                            <FigureUI
                                listRef={listRef}
                                list={list}
                                figure={figure}
                                scenes={scenes}
                                changeFigure={changeFigure}
                            />   
                        </div>
                    }
                </div>

            </div>
                   
    </div>);

    }


export default UI3D;