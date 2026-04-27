class Math2D {

    getZero(f, a, b, eps = 0.0001) {
        if (a === b) return null;
        if (a > b) {
            const c = a;
            a = b;
            b = c;
        }
        if (f(a) === 0) return a;
        if (f(b) === 0) return b;
        if (f(a) * f(b) > 0) return null;
        const x = (a + b) / 2;
        if (Math.abs(f(x)) <= eps) return x;
        if (f(a) * f(x) <= 0) return this.getZero(f, a, x, eps);
        if (f(x) * f(b) <= 0) return this.getZero(f, x, b, eps);
        return null;
    }

    getZeros(f, { LEFT, WIDTH }) {
        let x = LEFT;
        const dx = WIDTH / 100;
        const zeros = [];
        while (x < WIDTH + LEFT) {
            if (this.getZero(f, x, x + dx)) {
                zeros.push(this.getZero(f, x, x + dx));
            }
            x += dx;
        }
        return zeros;
    }

    getDerivative(f, x0, dx = 0.00001) {  // k
        return (f(x0 + dx) - f(x0)) / dx;
    }

    getTangent(f, x0) {  // [k,b]
        const k = this.getDerivative(f, x0);
        const b = f(x0) - k * x0;
        return [k, b];
    }

    getIntegral(f, a, b, dx = 0.001) {
        let x = a;
        let s = 0;
        while (x <= b) {
            s += dx * (Math.abs(f(x)) + Math.abs(f(x + dx))) / 2;
            x += dx;
        }
        return Math.abs(s);
    }

    getNotIntegral(f1, f2, a, b, dx = 0.001) {
        let x = a;
        let s = 0;
        while (x <= b) {
            s += dx * (Math.abs(f1(x) - f2(x)) + Math.abs(f1(x + dx) - f2(x + dx))) / 2;
            x += dx;
        }
        return s;
    }

    pointsVertical(f, { LEFT, WIDTH }, dx = 0.001) {
        const points = [];
        for (let x = LEFT; x < LEFT + WIDTH; x += dx) {
            if (Math.abs(f(x) - f(x + dx)) > 1000 && f(x) * f(x + dx)) { // точка разрыва 2 типа => находим точку для верт. асимптоты
                points.push(x);
            }
        }
        return points;
    }
}

export default Math2D;