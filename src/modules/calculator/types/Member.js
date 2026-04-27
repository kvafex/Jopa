class Member {
    constructor(value = 0, power = 0) {
        this.value = value;
        this.power = power;
    }

    toString() {
        if (this.value === 0) {
            return '';
        }
        if (this.power === 0) {
            return `${this.value}`;
        }
        if (this.power === 1) {
            if (Math.abs(this.value) === 1) {
                return `${this.value < 0 ? '-' : '+'}x`;
            }
            return `${this.value}*x`;
        }
        if (Math.abs(this.value) === 1) {
            return `${this.value < 0 ? '-' : ''}x^${this.power}`;
        }
        return `${this.value}*x^${this.power}`;
    }
}

export default Member;