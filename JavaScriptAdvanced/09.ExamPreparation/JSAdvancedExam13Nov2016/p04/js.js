function cardDeckBuilder(selector) {

    let map = new Map();
    map.set('C', '\u2663');
    map.set('D', '\u2666');
    map.set('H', '\u2665');
    map.set('S', '\u2660');


    function addCard(face, suit) {
        $('<div>')
            .addClass('card')
            .text(`${face} ${map.get(suit)}`)
            .click(reverse)
            .appendTo($(selector));
    }

    function reverse() {
        console.log("HERE");

        let find = $(selector).find('div');

        $(selector).empty();

        for (let i = find.length - 1; i >= 0; i--) {
            $(selector).append($(find[i]).click(reverse));
        }
    }

    return { addCard };
}