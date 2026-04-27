class Func {
    constructor({
        f = (x) => 0,
        x = (t) => 0,
        y = (t) => 0,
        range = [0, 2 * Math.PI],
        rangeAB = [0, 2],
        color = '#f0f',
        width = 2,
        zeros = [],
        isParam = false,
        isShowZeros = false,
        isShowIntegral = false,
        isNotIntegral = false,
    }) {
        this.f = f;
        this.x = x;
        this.y = y;
        this.range = range;
        this.rangeAB = rangeAB;
        this.color = color;
        this.width = width;
        this.zeros = zeros;
        this.isParam = isParam;
        this.isShowZeros = isShowZeros;
        this.isShowIntegral = isShowIntegral;
        this.isNotIntegral = isNotIntegral;
    }

    setF(str) {
        try {
            let f = null;
            eval(`f = (x) => ${str}`);
            this.f = f;
        } catch (e) {
            if (e instanceof SyntaxError){
                console.log('syntax');
            }
            if (e instanceof ReferenceError){
                console.log('reference');
            }
        }
    }

    setX(f) {
        try {
            eval(`this.x = (t) => ${f}`);
        } catch (e) {
                     
        }
    }

    setY(f) {
        try {
            eval(`this.y = (t) => ${f}`);
        } catch (e) {
                     
        }
    }

    setRange(range) {
        this.range = range;
    }

    setAB(range) {
        this.rangeAB = range;
    }

    setColor(color) {
        this.color = color;
    }

    setWidth(width) {
        this.width = width;
    }

    showParam() {
        this.isParam = !this.isParam;
    }

    showZeros() {
        this.isShowZeros = !this.isShowZeros;
    }

    showIntegral() {
        this.isShowIntegral = !this.isShowIntegral;
    }

    toString(name = 'f') {
        return this[name].toString().replaceAll(' ','').split('=>')[1];
    }
}

export default Func;