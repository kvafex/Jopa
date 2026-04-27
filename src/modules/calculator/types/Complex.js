class Complex {
    constructor(re = 0,im = 0){
        this.re = re;
        this.im = im;
    }
    toString(){
        if (this.re === 0 && this.im === 0){
            return '0';
        }
        if (this.im === 0){
            return `${this.re}`;
        }
        if (this.re === 0){
            if (this.im === 1) return 'i';
            if (this.im === -1) return '-i';
            if (this.im < 0) return `-${Math.abs(this.im)}i`;
            return `${this.im}i`;
        }
        const im = Math.abs(this.im);
        const sign = (this.im > 0) ? '+' : '-';
        return `${this.re}${sign}${im}i`;
    }
}

export default Complex;



















//return `${(this.re === 0) ? '' : this.re}${(this.im < 0 || this.re === 0) ? '' : '+'}${(this.im === 1) ? '' : this.im}i`;