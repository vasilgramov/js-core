function domSearch(selector, isSensitive) {
    let content = $(selector).addClass('items-control');

    let textDiv = $('<div class="add-controls"></div>')
        .append($('<label>Enter text: </label>').append($('<input>')))
        .append($('<a class="button" style="display: inline-block">Add</a>').on('click', addItem));

    content.append(textDiv);

    let searchDiv = $('<div class="search-controls"></div>')
        .append($('<label>Search: </label>').append($('<input>')))
        .on('input', searchItem);

    content.append(searchDiv);

    let resultDiv = $('<div class="result-controls"></div>')
        .append($('<ul class="items-list"></ul>'));

    content.append(resultDiv);

    function addItem() {
        let inputText = $('.add-controls').find('label').find('input').val();
        $('.result-controls').find('.items-list')
            .append($('<li class="list-item"></li>')
                .append($('<a class="button">X</a>').on('click', deleteItem))
                .append($(`<strong>${inputText}</strong>`)));

        $('.add-controls').find('label').find('input').val('');
    }

    function searchItem() {
        let searchedElement = $(this).find('input').val();

        let children = ($('.result-controls').find('.items-list').children());

        $(children).each((index, element) => {
            $(element).css('display', 'none');

            let text = ($(element).find('strong').text());
            if (isSensitive && text.indexOf(searchedElement) !== -1 && searchedElement !== '') {
                // hide
                $(element).css('display', 'block');
            } else if (!isSensitive && text.toLowerCase().indexOf(searchedElement.toLowerCase()) !== -1 && searchedElement !== '') {
                // hide
                $(element).css('display', 'block');
            }
        });
    }

    function deleteItem() {
        ($(this).parent().remove());
    }
}