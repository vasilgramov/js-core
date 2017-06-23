function initializeTable() {
    let table = $('#countriesTable');

    appendRow('Bulgaria', 'Sofia');
    appendRow('Germany', 'Berlin');
    appendRow('Russia', 'Moscow');

    $('#createLink').click(getData);

    function appendRow(country, capital) {
        let row = $('<tr>');
        row.append($(`<td>${country}</td>`));
        row.append($(`<td>${capital}</td>`));

        let actions = $('<td>');
        actions.append($("<a href='#'>[Up]</a>").click(moveRowUp));
        actions.append(" ");
        actions.append($("<a href='#'>[Down]</a>").click(moveRowDown));
        actions.append(" ");
        actions.append($("<a href='#'>[Delete]</a>").click(deleteRow));

        row.append(actions);
        table.append(row);

        row.fadeIn();

        fixRows();
    }

    function getData() {
        let country = $('#newCountryText');
        let capital = $('#newCapitalText');

        if (country.val() !== '' && capital.val() !== '') {
            appendRow(country.val(), capital.val());
        }

        country.val('');
        capital.val('');
    }

    function moveRowUp() {
        let row = $(this).parent().parent();
        row.fadeOut(function () {
            let prev = row.prev();
            row.insertBefore(prev);
            row.fadeIn();

            fixRows();
        });
    }

    function moveRowDown() {
        let row = $(this).parent().parent();
        row.fadeOut(function () {
            let next = row.next();
            row.insertAfter(next);
            row.fadeIn();

            fixRows();
        });
    }

    function deleteRow() {
        let row = $(this).parent().parent();
        row.fadeOut(function () {
            row.remove();

            fixRows();
        });
    }
    
    function fixRows() {
        table.find('a').css('display', 'inline');

        let rows = table.find('tr');
        $(rows[2]).find('a:contains("Up")').css('display', 'none');
        $(rows[rows.length - 1]).find('a:contains("Down")').css('display', 'none');
    }
}