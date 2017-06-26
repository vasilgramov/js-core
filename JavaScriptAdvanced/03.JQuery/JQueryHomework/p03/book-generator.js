function createBook(selector, title, author, ISBN) {
    let id = 1  ;

    let wrapper = $(selector);

    let fragment = document.createDocumentFragment();

    let div = $('<div id="book1" style="border: medium none;"></div>');
    let t = $(`<p class="title">${title}</p>`);
    t.appendTo(div);

    let a = $(`<p class="author">${author}</p>`);
    a.appendTo(div);

    let isbn = $(`<p class="isbn">${ISBN}</p>`);
    isbn.appendTo(div);

    let selectBtn = $('<button>Select</button>');
    selectBtn.appendTo(div);
    selectBtn.on('click', select);

    let deselectBtn = $('<button>Deselect</button>');
    deselectBtn.appendTo(div);
    deselectBtn.on('click', deselect);

    div.appendTo(fragment);

    wrapper.append(div);

    function select() {
        div.css("border", "2px solid blue");
    }

    function deselect() {
        div.css("border", "medium none");
    }
}