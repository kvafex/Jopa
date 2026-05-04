import { Figure, Point } from "../entities";
import { ETransform } from "../Math3D";
import Sphere from "./Sphere";
import Tor from "./Tor";

class TorTheory {
    planets: Array<Figure>;
    constructor() {
        const sun = new Tor();
        sun.setBigRadius(7.5);
        sun.setRadius(2);
        sun.setOCenter(new Point(8, 0, 0));

        const earth = new Sphere();
        earth.setRadius(1.5);
        earth.setCenter(13, 0, 0);
        earth.setColor('#00ffff');
        earth.setOCenter(new Point(13, 0, 0));

        const moon = new Sphere();
        moon.setRadius(0.5);
        moon.setCenter(10.5, 0, 0);
        moon.setColor('#9b8f8f');
        moon.setOCenter(new Point(10.5, 0, 0))

        sun.addAnimation(ETransform.rotateOy, 0.05, new Point(0, 0, 0));

        earth.addAnimation(ETransform.rotateOy, 0.05, new Point(0, 0, 0));
        earth.addAnimation(ETransform.rotateOy, 0.06, sun.center);
        earth.addAnimation(ETransform.rotateOz, 0.06, new Point(0, 0, 0));

        moon.addAnimation(ETransform.rotateOy, 0.05, new Point(0, 0, 0));
        moon.addAnimation(ETransform.rotateOy, 0.06, sun.center);
        moon.addAnimation(ETransform.rotateOz, 0.06, new Point(0, 0, 0));
        moon.addAnimation(ETransform.rotateOy, 0.07, earth.center);
        
        this.planets = [sun, earth, moon];
    }

}

export default TorTheory;