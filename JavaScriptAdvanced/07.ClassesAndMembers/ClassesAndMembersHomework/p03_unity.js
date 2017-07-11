class Rat {

    constructor(name) {
        this.name = name;
        this._rats = [];
    }

    unite(otherRat) {
        if (otherRat instanceof Rat) {
            this._rats.push(otherRat);
        }
    }

    getRats() {
        return this._rats;
    }

    toStrint() {
        let result = '';
        result += this.name + '\n';
        for (let rat of this._rats) {
            result += '##' + rat._name + '\n';
        }

        return result;
    }
}
