function solve(face, suit) {
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

console.log(solve('A', 'C').toString());