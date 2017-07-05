function printDeckOfCards(cards) {
    function makeCard(face, suit) {
        let expectedFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let expectedSuits = ['S', 'H', 'D', 'C'];

        if (!expectedFaces.includes(face)) {
            throw new Error('Invalid face!');
        }

        if (!expectedSuits.includes(suit)) {
            throw new Error('Invalid suit!');
        }

        return {
            face: face,
            suit: suit,
            toString: function() {
                let suitMapper = {
                    S: '\u2660',
                    H: '\u2665',
                    D: '\u2666',
                    C: '\u2663'
                };

                return `${this.face}${suitMapper[suit]}`;
            }
        }
    }

    let deck = [];
    for (let card of cards) {
        let face = card.substring(0, card.length - 1);
        let suit = card.substring(card.length - 1);

        try {
            let currentCard = makeCard(face, suit);
            deck.push(currentCard);
        } catch (err) {
            console.log(`Invalid card: ${card}`);
            return;
        }
    }

    console.log(deck.join(' '));
}

console.log(printDeckOfCards(['AS', '10D', 'KH', '2C']));
console.log(printDeckOfCards(['5S', '3D', 'QD', '1C']));