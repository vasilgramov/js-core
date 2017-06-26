function increment(wrapper) {
    let container = $(wrapper);
    let fragment = document.createDocumentFragment();
    let textArea =  $('<textarea>');
    let incrementBtn = $('<button>Increment</button>');
    let addBtn = $('<button>Add</button>');
    let list = $('<ul>');

    textArea.val(0);
    textArea.addClass('counter');
    textArea.attr('disabled', true);

    incrementBtn.addClass('btn');
    incrementBtn.attr('id', 'incrementBtn');
    addBtn.addClass('btn');
    addBtn.attr('id', 'addBtn');

    list.addClass('results');

    $(incrementBtn).on('click', increase);
    $(addBtn).on('click', append);

    textArea.appendTo(fragment);
    incrementBtn.appendTo(fragment);
    addBtn.appendTo(fragment);
    list.appendTo(fragment);

    container.append(fragment);

    function increase() {
        textArea.val(Number(textArea.val()) + 1);
    }

    function append() {
        let li = $(`<li>${textArea.val()}</li>`);
        li.appendTo(list)
    }
}