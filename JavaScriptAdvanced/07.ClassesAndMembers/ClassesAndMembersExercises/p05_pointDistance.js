class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get x() {
        return this._x;
    }
    set x(x) {
        this._x = x;
    }

    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
    }

    static distance(p1, p2) {
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        return Math.sqrt(dx*dx + dy*dy);
    }
}