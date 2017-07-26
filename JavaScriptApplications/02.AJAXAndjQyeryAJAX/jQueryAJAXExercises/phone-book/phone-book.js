$(() => {
    const baseUrl = 'https://phone-book-a6c7d.firebaseio.com/phonebook';
    const contacts = $('#contacts');

    $('#loadBtn').click(loadContacts);
    $('#createBtn').click(createContact);

    function loadContacts() {
        let req = {
            url: baseUrl + '.json',
            method: 'GET',
            success: displayContacts,
            error: displayError
        };

        $.ajax(req);
    }

    function displayContacts(data) {
        contacts.empty();

        for (let key in data) {
            let contact = data[key];

            contacts
                .append($('<li>').text(`${contact.name}: ${contact.phone}`)
                .append($('<a>').attr('href', '#').text('[Delete]').click(() => deleteContact(key))));
        }
    }

    function createContact() {
        let name = $('#name').val();
        let phone = $('#phone').val();

        let contact = {
            name,
            phone
        };

        let req = {
            url: baseUrl + '.json',
            method: 'POST',
            data: JSON.stringify(contact),
            success: loadContacts,
            error: displayError
        };

        $.ajax(req);
    }
    
    function deleteContact(key) {
        let req = {
            url: baseUrl + `/${key}.json`,
            method: 'DELETE',
            success: loadContacts,
            error: displayError
        };

        $.ajax(req);
    }

    function displayError(error) {
        console.log(error);
    }
});