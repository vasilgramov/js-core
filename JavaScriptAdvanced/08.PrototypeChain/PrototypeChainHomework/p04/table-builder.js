function tableBuilder(selector) {
    let content = $(selector);

    function createTable(data) {
        content.empty();

        let table = $('<table>');
        let tr = $('<tr>');

        for (let d of data) {
            let th = $('<th>');
            th.text(d);
            tr.append(th);
        }

        let th = $('<th>');
        th.text('Action');
        tr.append(th);
        table.append(tr);

        content.append(table);
    }

    function fillData(data) {
        let table = $(`${selector} table`);

        for (let d of data) {
            let tr = $('<tr>');
            for (let text of d) {
                tr.append($('<td>').text(text));
            }

            let delBtn = $('<td><button>Delete</button></td>');
            delBtn.on('click', function () {
                $(this).parent().remove();
            });

            tr.append(delBtn);

            table.append(tr);
        }
    }

    return { createTable, fillData };
}