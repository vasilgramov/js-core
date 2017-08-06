$(() => {

    const context = {
        contacts : []
    };

    const templates = {};

    const listTarget = $('#list').find('.content');
    const detailsTarget = $('#details').find('.content');

    loadData();
    loadTemplates();

    function loadData() {
        $.get('data.json').then(getData);

        function getData(data) {
            context.contacts = (data).map(c => {
                c.active = false;
                return c;
            });
        }
    }

    function loadTemplates() {
        Promise.all([
            $.get('templates/contact.html'),
            $.get('templates/contactsList.html'),
            $.get('templates/details.html')
        ]).then(getTemplates);

        function getTemplates([contact, contactsList, details]) {
            Handlebars.registerPartial('contact', contact);

            templates['contactList'] = Handlebars.compile(contactsList);
            templates['details'] = Handlebars.compile(details);

            renderContacts();
        }
    }

    function renderContacts() {
        listTarget.html(templates.contactList(context));
        attachClickEvent();
    }

    function attachClickEvent() {
        $('.contact').click((e) => {
            let index = $(e.target).closest('.contact').attr('data-id');
            renderDetails(index);
        });
    }

    function renderDetails(index) {
        context.contacts.forEach(c => c.active = false);
        context.contacts[index].active = true;

        renderContacts();
        detailsTarget.html(templates.details(context.contacts[index]));
    }
});