function listBuilder(selector) {

    function createNewList() {
        $(selector).empty();
        $(selector).append($('<ul>'));
    }

    function addItem(string) {
        let li = $('<li>').text(string);

        let up = $('<button>Up</button>')
            .click(function () {
                $(this).parent().insertBefore($(this).parent().prev());
            });

        let down = $('<button>Down</button>')
            .click(function () {
                $(this).parent().insertAfter($(this).parent().next());
            });


        li.append(up);
        li.append(down);

        $(selector).find('ul').append(li);
    }

    return {
        createNewList,
        addItem
    };
}