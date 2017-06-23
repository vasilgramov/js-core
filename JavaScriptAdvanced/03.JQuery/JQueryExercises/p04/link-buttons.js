function attachEvents() {
    let buttons = $('.button');

    buttons.each((index, element) => {
        $(element).on('click', click);
    });

    function click() {
        buttons.each((index, element) => {
            $(element).removeClass('selected');
        });

        $(this).addClass('selected');
    }
}