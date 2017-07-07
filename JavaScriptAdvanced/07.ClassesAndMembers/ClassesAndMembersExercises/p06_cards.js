let result = (function () {
    let Suits = {
        SPADES: '♠',
        HEARTS: '♥',
        DIAMONDS: '♦',
        CLUBS: '♣'
    };

    let validFaces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

    class Card {
        constructor(face, suit) {
            this.face = face;
            this.suit = suit;
        }

        get face() {
            return this._face;
        }

        set face(face) {
            if (!validFaces.includes(face)) {
                throw new Error('Invalid face');
            }

            this._face = face;
        }

        get suit() {
            return this._suit;
        }

        set suit(suit) {
            if (!Object.keys(Suits).map(e => Suits[e]).includes(suit)) {
                throw new Error('Invalid suit');
            }

            this._suit = suit;
        }
    }

    return {Suits, Card};
})();

let Suits = result.Suits;
let Card = result.Card;

let card = new Card("2",Suits.SPADES);
console.log(card);