/*let result = */function solve() {

    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new Error("Abstract class cannot be instantiated directly");
            }

            this.weight = weight;
            this.melonSort = melonSort;
        }

        toString() {
            let result = '';
            let element = this.constructor.name.substring(0, this.constructor.name.length - 5);
            result = `Element: ${element}\n`;
            result += `Sort: ${this.melonSort}`;

            return result;
        }
    }

    class Watermelon extends Melon {

        constructor(weight, melonSort) {
            super(weight, melonSort);
            this._index = this.weight * this.melonSort.length;
        }


        get index() {
            return this._index;
        }

        toString() {
            return super.toString() + `\nElement Index ${this.index}`;
        }
    }

    class Firemelon extends Melon {

        constructor(weight, melonSort) {
            super(weight, melonSort);
            this._index = this.weight * this.melonSort.length;
        }


        get index() {
            return this._index;
        }


        toString() {
            return super.toString() + `\nElement Index ${this.index}`;
        }
    }

    class Earthmelon extends Melon {

        constructor(weight, melonSort) {
            super(weight, melonSort);
            this._index = weight * melonSort.length;
        }


        get index() {
            return this._index;
        }

        toString() {
            return super.toString() + `\nElement Index ${this.index}`;
        }
    }

    class Airmelon extends Melon {

        constructor(weight, melonSort) {
            super(weight, melonSort);
            this._index = weight * melonSort.length;
        }


        get index() {
            return this._index;
        }

        toString() {
            return super.toString() + `\nElement Index ${this.index}`;
        }
    }

    return {
        Melon,
        Watermelon,
        Firemelon,
        Earthmelon,
        Airmelon
    };
}

let Watermelon = result().Watermelon;
let m = new Watermelon(5, 'Rotten');
console.log(m.toString());