$(() => {

    const context = {
        contacts : []
    };

    const template = {
        list: []
    };

    loadTemplates();
    loadContacts();

    function loadTemplates() {
    }

    function loadContacts() {
        console.log(template.list);
        let list = Handlebars.compile(template.list);
        $('#list').find('.content').html(list(context.contacts));
    }

});