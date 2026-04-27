import { Point } from "../entities";
import Sphere from "./Sphere";
import Tor from "./Tor";

class TorTheory {
    constructor() {
        const sun = new Tor({ r: 2, R: 7.5, center: new Point(8, 0, 0) });
        const earth = new Sphere({ r: 1.5, x: 13, color: '#00ffff', center: new Point(13, 0, 0) });
        const moon = new Sphere({ r: 0.5, x: 10.5, color: '#9b8f8f', center: new Point(10.5, 0, 0) })
        sun.addAnimation('rotateOy', 0.05, new Point(0, 0, 0));

        earth.addAnimation('rotateOy', 0.05, new Point(0, 0, 0));
        earth.addAnimation('rotateOy', 0.06, sun.center);
        earth.addAnimation('rotateOz', 0.06, new Point(0, 0, 0));

        moon.addAnimation('rotateOy', 0.05, new Point(0, 0, 0));
        moon.addAnimation('rotateOy', 0.06, sun.center);
        moon.addAnimation('rotateOz', 0.06, new Point(0, 0, 0));
        moon.addAnimation('rotateOy', 0.07, earth.center);
        this.planets = [sun, earth, moon];
    }

}

export default TorTheory;