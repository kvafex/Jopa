import { ChangeEvent, useEffect, useMemo } from "react";

import { Math3D, Light, Figure, Polygon } from "../../modules/math3D";

import "./Canvas3DPage.css";
import UI3D from "./UI/UI3D";
import useCanvas from "../../modules/canvas/useCanvas";
import useWIN3D from "../../modules/math3D/useWIN3D";
import { EDist } from "../../modules/math3D/entities/Polygon";
import Canvas from "../../modules/canvas/Canvas";

const canvas3DID = 'graph3D';
const round = (x: number): number => Math.round(x);

const Canvas3DPage: React.FC = () => {
    const PercentPageX = 0.99;
    const PercentPageY = 0.98;
    const WIN = useWIN3D(PercentPageX, PercentPageY);
    const math3D = new Math3D(WIN);

    let scenes: Array<Figure>;
    scenes = useMemo(() => scenes = [], []);

    const LIGHTXYZ = [-20, 20, 10];
    let LUMEN = 10000;

    const listLight = [ new Light(LIGHTXYZ[0], LIGHTXYZ[1], LIGHTXYZ[2], LUMEN) ];

    let canMove = false;
    let canRotateXY = false;
    let canRotateZ = false;

    const show = {
        points: false,
        edges: false,
        polygons: true,
        animations: false,
        shadows: false
    };

    let canvas: Canvas = null!;
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

    const wheel = (event: WheelEvent): void => {
        if (show.animations) return;
        const delta = event.deltaY > 0 ?
            0.9 : 1.1;
        const T = math3D.zoom(delta);
        scenes.forEach(scene => scene.points.forEach(point => math3D.transform(T, point)));
    }

    const mouseup = (): void => {
        canRotateXY = false;
        canRotateZ = false;
        canMove = false;
    }

    const mouseleave = (): void => {
        canRotateXY = false;
        canRotateZ = false;
        canMove = false;
    }

    const mousedown = (event: MouseEvent): void => {
        canRotateXY = event.button === 0;
        canRotateZ = event.button === 1;
        canMove = event.button === 2;
    }

    const mousemove = (event: MouseEvent): void => {
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
            const T = math3D.move(moveX * 10, -moveY * 10, 0);
            scenes.forEach(scene => scene.points.forEach(point => math3D.transform(T, point)));
        }
    }

    const contextmenu = (event: MouseEvent): void => {
        event.preventDefault();
    }

    useEffect(() => {
        const id = setInterval(() => show.animations && scenes.forEach(scene => scene.doAnimation(math3D)), 50);
        return () => clearInterval(id);
    });

    function renderFrame(fps: number): void {
        canvas.clear();
        if (show.polygons) {
            const polygons: Array<Polygon> = [];
            scenes.forEach((scene, index) => scene.polygons.forEach(
                polygon => {
                    polygon.figureIndex = index;
                    math3D.calcCenter(polygon);
                    math3D.calcDistance(polygon, WIN.CAMERA, EDist.distance);
                    math3D.calcDistance(polygon, listLight[0], EDist.lumen);
                    math3D.calcRadius(polygon);
                    polygons.push(polygon);
                }));
            math3D.sortByArtist(polygons);

            polygons.forEach(polygon => {
                let { r, g, b } = polygon.color;
                let light = 0;
                let power = listLight[0].lumenPower;
                if (show.shadows) {
                    const {isShadow, dark} = math3D.calcShadow(polygon, scenes, listLight[0]);
                    power *= ((isShadow && dark) ? dark : 1);
                }
                light = math3D.calcIllumination(polygon.lumen, power);

                r = round(r * light);
                g = round(g * light);
                b = round(b * light);
                canvas.polygon(polygon.points.map(
                    point => ({
                        x: math3D.xs(point),
                        y: math3D.ys(point)
                    })), polygon.rgbToHex(r, g, b));
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

        canvas.text(WIN.LEFT + WIN.WIDTH - 0.75, WIN.BOTTOM + WIN.HEIGHT - 0.5, fps.toString());
        canvas.render();
    }

    return (
        <div className="flex_c mainPanel">
            <canvas className="fixed" id={canvas3DID}></canvas>
            <div className="flex_r mainPanel">
                <div className="flex_c">
                    <UI3D
                        scenes={scenes}
                        show={show}
                        listLight={listLight}
                    />
                </div>
            </div>

        </div>
    );
}

export default Canvas3DPage;