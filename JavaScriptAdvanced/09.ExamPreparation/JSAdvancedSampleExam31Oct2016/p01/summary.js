function generateSummary(selector) {

    $(selector).click(function () {
        let summarizedText = $('#content').find('strong').text();
        $('<div>').attr('id', 'summary')
            .append($('<h2>Summay</h2>').attr('id', 'summary'))
            .append($(`<p>${summarizedText}</p>`))
            .appendTo($('#content'));
    })
}