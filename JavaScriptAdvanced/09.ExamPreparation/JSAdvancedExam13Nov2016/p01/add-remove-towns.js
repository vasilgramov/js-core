function attachEvents() {
    $('#btnAdd').click(addItem);

    function deleteItem() {
        $('#towns').find(":selected").remove();
    }

    $('#btnDelete').click(deleteItem);

    function addItem() {
        let text = $('#newItem').val();
        if (text !== '') {
            $('#towns')
                .append($('<option>').text(text));

            $('#newItem').val('');
        }
    }
}