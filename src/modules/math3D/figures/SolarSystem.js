import { Point } from "../entities";
import Sphere from "./Sphere";

class SolarSystem {
    constructor() {
        const sun = new Sphere({r: 8, color: '#ffff00'});
        const earth = new Sphere({r: 4, x: 20, color: '#00ffff', center: new Point(20, 0, 0)});
        const moon = new Sphere({r: 1.5, x: 14, color: '#9b8f8f', center: new Point(14, 0, 0)});
        sun.addAnimation('rotateOy', 0.2);
        earth.addAnimation('rotateOy', 0.03, sun.center);
        moon.addAnimation('rotateOy', 0.03, sun.center);
        moon.addAnimation('rotateOy', 0.07, earth.center);
        this.planets = [sun, earth, moon];
    }

}

export default SolarSystem;