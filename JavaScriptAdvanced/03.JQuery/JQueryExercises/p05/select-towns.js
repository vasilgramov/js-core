function attachEvents() {
    let children = $('#items').children();

    children.each((index, element) => {
        console.log($(element));
        $(element).on('click', target);
    });

    $('#showTownsButton').on('click', getSelectedTowns);

    function target() {
        $('#selectedTowns').text('');

        if ($(this).attr('data-selected')) {
            $(this).removeAttr('data-selected');
            $(this).css('background', '');
        } else {
            $(this).attr('data-selected', true);
            $(this).css('background', '#DDD');
        }
    }

    function getSelectedTowns() {
        let selected = [];
        children.each((index, element) => {
            if ($(element).attr('data-selected')) {
                selected.push(element.textContent);
            }
        });

        $('#selectedTowns').text(selected.join(', '));
    }

}