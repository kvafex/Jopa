import { Figure, Point } from "../entities";
import { ETransform } from "../Math3D";
import Sphere from "./Sphere";

class SolarSystem {
    planets: Array<Figure>;
    constructor() {
        const sun = new Sphere();
        sun.setRadius(8);
        sun.setColor('#ffff00');

        const earth = new Sphere();
        earth.setRadius(4);
        earth.setCenter(20, 0, 0);
        earth.setOCenter(new Point(20, 0, 0))
        earth.setColor('#00ffff');

        const moon = new Sphere();
        moon.setRadius(1.5);
        moon.setCenter(14, 0, 0);
        moon.setOCenter(new Point(14, 0, 0));
        moon.setColor('#9b8f8f');

        sun.addAnimation(ETransform.rotateOy, 0.2, sun.center);
        earth.addAnimation(ETransform.rotateOy, 0.03, sun.center);
        moon.addAnimation(ETransform.rotateOy, 0.03, sun.center);
        moon.addAnimation(ETransform.rotateOy, 0.07, earth.center);
        this.planets = [sun, earth, moon];
    }

}

export default SolarSystem;