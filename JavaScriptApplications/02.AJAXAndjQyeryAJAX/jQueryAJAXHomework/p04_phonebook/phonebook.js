function attachEvents() {
    $('#btnLoad').click(loadContacts);
    $('#btnCreate').click(createContact);

    const baseUrl = "https://phonebook-nakov.firebaseio.com/phonebook";

    const phonebook = $('#phonebook');
    const person = $('#person');
    const phone = $('#phone');

    function loadContacts() {
        phonebook.empty();
        $.get(baseUrl + ".json")
            .then(displayContacts)
            .catch(displayError);
    }

    function displayContacts(contacts) {
        for (let key in contacts) {
            let person = contacts[key]['person'];
            let phone = contacts[key]['phone'];

            phonebook
                .append($('<li>').text(person + ': ' + phone + ' ')
                    .append($('<button>').text('Delete').click(function () {
                        deleteContact(key)
                    })));
        }
    }

    function displayError(err) {
        phonebook.append($('<li>').text("Error"));
    }

    function createContact() {
        let newContactJSON = JSON.stringify({
            person: person.val(),
            phone: phone.val()
        });

        $.post(baseUrl + '.json', newContactJSON)
            .then(loadContacts)
            .catch(displayError);

        person.val('');
        phone.val('');
    }

    function deleteContact(key) {
        let request = {
            method: 'DELETE',
            url: baseUrl + '/' + key + '.json'
        };

        $.ajax(request)
            .then(loadContacts)
            .catch(displayError);
    }
}