function createBook(selector,title,author,isbn) {
    let idBook = $('div[id*="book"]').toArray().length + 1;
    let div  = $('<div>').attr('id',idBook)
        .append($('<p>').addClass('title').text(title))
        .append($('<p>').addClass('author').text(author))
        .append($('<p>').addClass('isbn').text(isbn))
        .append($('<button>').text("Select").click(addBorder))
        .append($('<button>').text("Deselect").click(removeBorder));
    $(selector).append(div);

    function addBorder() {
        $(div).css('border', '2px solid blue');
    }

    function removeBorder() {
        $(div).css('border', '');
    }
}