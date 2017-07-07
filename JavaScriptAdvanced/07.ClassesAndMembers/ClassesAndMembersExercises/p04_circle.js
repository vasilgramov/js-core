class Cicle {
    constructor(radius) {
        this.radius = radius;
    }

    get radius() {
        return this._radius;
    }
    set radius(radius) {
        this._radius = radius;
        this._diameter = radius * 2;
    }

    get diameter() {
        return this._diameter;
    }
    set diameter(diameter) {
        this._radius = diameter / 2;
        this._diameter = diameter;
    }

    get area() {
        return Math.PI * Math.pow(this.radius, 2);
    }
}

let c1 = new Cicle(2);
console.log(c1);
console.log(c1.area);