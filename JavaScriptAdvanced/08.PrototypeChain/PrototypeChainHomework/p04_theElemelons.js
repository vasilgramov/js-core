let result = function solve() {

    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new TypeError("Abstract class cannot be instantiated directly");
            }

            this.weight = Number(weight);
            this.melonSort = melonSort;
            this.element = "";
            this._elementIndex =
                this.weight * this.melonSort.length;
        }

        get elementIndex() {
            return this._elementIndex;
        }

        toString() {
            let result = '';
            result = `Element: ${this.element}\n`;
            result += `Sort: ${this.melonSort}\n`;
            result += `Element Index: ${this.elementIndex}`;

            return result;
        }
    }

    class Watermelon extends Melon {

        constructor(weight, melonSort) {
            super(weight, melonSort);
            super.element = 'Water';
        }
    }

    class Firemelon extends Melon {

        constructor(weight, melonSort) {
            super(weight, melonSort);
            super.element = 'Fire';
        }
    }

    class Earthmelon extends Melon {

        constructor(weight, melonSort) {
            super(weight, melonSort);
            super.element = 'Earth';
        }
    }

    class Airmelon extends Melon {

        constructor(weight, melonSort) {
            super(weight, melonSort);
            super.element = 'Air';
        }
    }

    class Melolemonmelon extends Watermelon {

        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = 'Water';
            this.elements = ['Fire', 'Earth', 'Air', 'Water'];
            this.elIndex = 0;
        }

        morph() {
            this.element = this.elements[this.elIndex++ % 4];
        }
    }

    return {
        Melon,
        Watermelon,
        Firemelon,
        Earthmelon,
        Airmelon,
        Melolemonmelon
    };
};

let Watermelon = result().Watermelon;
let m = new Watermelon(5, 'Rotten');
console.log(m.toString());