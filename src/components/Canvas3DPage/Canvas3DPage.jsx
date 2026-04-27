import { useRef, useEffect, useState, useMemo } from "react";

import { Math3D, Point, Light } from "../../modules/math3D";

import "./Canvas3DPage.css";
import UI3D from "./UI/UI3D";
import useCanvas from "../../modules/canvas/useCanvas/useCanvas";
import useWIN3D from "../../modules/math3D/useWIN3D/useWIN3D";

const canvas3DID = 'graph3D';
const round = (x) => Math.round(x);

const Canvas3DPage = () => {
    const PercentPageX = 0.99;
    const PercentPageY = 0.98;
    const WIN = useWIN3D(PercentPageX, PercentPageY);
    const math3D = new Math3D(WIN);

    let scenes;
    scenes = useMemo(() => scenes = [], []);

    const LIGHTXYZ = [-20, 20, 10];
    let LUMEN = 10000;
    /*let LIGHT = new Light(LIGHTXYZ[0], LIGHTXYZ[1], LIGHTXYZ[2], LUMEN);

    let LIGHT2 = ;*/

    const listLight = [new Light(LIGHTXYZ[0], LIGHTXYZ[1], LIGHTXYZ[2], LUMEN),
                        new Light(-LIGHTXYZ[0], -LIGHTXYZ[1], -LIGHTXYZ[2], LUMEN)];

    let canMove = false;
    let canRotateXY = false;
    let canRotateZ = false;

    const show = {
        points: false,
        edges: false,
        polygons: true,
        animations: false,
    };

    let canvas = null;
    const [getCanvas, startRender, stopRender] = useCanvas(renderFrame);
    useEffect(() => {
        canvas = getCanvas({
            id: canvas3DID,
            WIN: WIN,
            callbacks: {
                wheel: wheel,
                mouseup: mouseup,
                mousedown: mousedown,
                mousemove: mousemove,
                mouseleave: mouseleave,
                contextmenu: contextmenu,
            },
            width: PercentPageX * document.documentElement.clientWidth,
            height: PercentPageY * document.documentElement.clientHeight,
        });

        startRender();
        return () => stopRender();
    });

    const wheel = (event) => {
        if (show.animations) return;
        const delta = event.wheelDelta > 0 ?
            1.1 : 0.9;
        const T = math3D.zoom(delta);
        scenes.forEach(scene => scene.points.forEach(point => math3D.transform(T, point)));
    }

    const mouseup = () => {
        canRotateXY = false;
        canRotateZ = false;
        canMove = false;
    }

    const mouseleave = () => {
        canRotateXY = false;
        canRotateZ = false;
        canMove = false;
    }

    const mousedown = (event) => {
        canRotateXY = event.button === 0;
        canRotateZ = event.button === 1;
        canMove = event.button === 2;
    }

    const mousemove = (event) => {
        if (show.animations) return;
        const moveX = event.movementX / 1080;
        const moveY = event.movementY / 1080;
        if (canRotateXY) {
            const T1 = math3D.rotateOx(moveY);
            const T2 = math3D.rotateOy(moveX);
            const T = math3D.getTransform(T1, T2);
            scenes.forEach(scene => scene.points.forEach(point => math3D.transform(T, point)));
        }
        if (canRotateZ) {
            const T = math3D.rotateOz(moveX);
            scenes.forEach(scene => scene.points.forEach(point => math3D.transform(T, point)));
        }
        if (canMove) {
            const T = math3D.move([moveX * 10, -moveY * 10, 0]);
            scenes.forEach(scene => scene.points.forEach(point => math3D.transform(T, point)));
        }
    }

    const contextmenu = (event) => {
        event.preventDefault();
    }

    const changeLumen = (event) => {
        listLight[0] = new Light(LIGHTXYZ[0], LIGHTXYZ[1], LIGHTXYZ[2], Number(event.target.value));
    }
    
    const changeXLight = (event) => {
        LIGHTXYZ[0] = Number(event.target.value);
        listLight[0] = new Light(LIGHTXYZ[0], LIGHTXYZ[1], LIGHTXYZ[2], LUMEN);
    }
    
    const changeYLight = (event) => {
        LIGHTXYZ[1] = Number(event.target.value);
        listLight[0] = new Light(LIGHTXYZ[0], LIGHTXYZ[1], LIGHTXYZ[2], LUMEN);
    }
    
    const changeZLight = (event) => {
        LIGHTXYZ[2] = Number(event.target.value);
        listLight[0] = new Light(LIGHTXYZ[0], LIGHTXYZ[1], LIGHTXYZ[2], LUMEN);
    }

    useEffect(() => {
        const id = setInterval(() => show.animations && scenes.forEach(scene => scene.doAnimation(math3D)), 50);
        return () => clearInterval(id);
    });

    function renderFrame(fps) {
        canvas.clear();
        if (show.polygons) {
            const polygons = [];
            scenes.forEach(scene => scene.polygons.forEach(
                polygon => {
                    math3D.calcCenter(polygon);
                    math3D.calcDistance(polygon, WIN.CAMERA, 'distance');
                    for (let i = 0; i < listLight.length; i++) {
                        let name = 'lumen';
                        math3D.calcDistance(polygon, listLight[i], `${name}`);
                    }
                    polygons.push(polygon);
                }));
            math3D.sortByArtist(polygons);
            polygons.forEach(({ points, color, lumen, rgbToHex }) => {
                let { r, g, b } = color;
                let light = 0;
                for (let i = 0; i < listLight.length; i++) {
                    light += math3D.calcIllumination(lumen, listLight[i].lumenPower);
                }
                r = round(r * light);
                g = round(g * light);
                b = round(b * light);
                canvas.polygon(points.map(
                    point => ({
                        x: math3D.xs(point),
                        y: math3D.ys(point)
                    })), rgbToHex(r, g, b));
            });
        }

        if (show.edges) {
            scenes.forEach(scene => scene.edges.forEach(
                edge => {
                    const { p1, p2 } = edge;
                    canvas.line(math3D.xs(p1),
                        math3D.ys(p1),
                        math3D.xs(p2),
                        math3D.ys(p2), 'black', 1)
                }));
        }

        if (show.points) {
            scenes.forEach(scene => scene.points.forEach(
                point => canvas.point(math3D.xs(point), math3D.ys(point))));
        }

        canvas.text(WIN.LEFT + WIN.WIDTH - 0.75, WIN.BOTTOM + WIN.HEIGHT - 0.5, fps);
        canvas.render();

    }

    return (
        <div className="flex_c mainPanel">
            <canvas className="fixed" id={canvas3DID}></canvas>
            <div className="flex_r mainPanel">
                <div className="flex_c">
                    <UI3D
                        scenes={scenes}
                        changeLumen={changeLumen}
                        changeXLight={changeXLight}
                        changeYLight={changeYLight}
                        changeZLight={changeZLight}
                        math3D={math3D}
                        show={show}
                    />
                </div>
            </div>

        </div>
    );
}

export default Canvas3DPage;