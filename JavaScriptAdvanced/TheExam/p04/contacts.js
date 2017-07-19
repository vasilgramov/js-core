class Contact {

    constructor(firstName, lastName, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;

        this.online = false;
        this.title = $('<div>').addClass('title').text(`${this.firstName} ${this.lastName}`)
            .append($('<button>').html('&#8505;').click(show));

        function show() {
            let e = $(this).parent().next();

            if ($(e).css('display') === 'none') {
                $(e).css('display', 'block');
            } else {
                $(e).css('display', 'none');
            }
        }
    }

    get online() {
        return this._online;
    }

    set online(value) {
        if (value === true) {
            this.title = $(this.title).addClass('online');
        } else {
            this.title = $(this.title).removeClass('online');
        }

        this._online = value;
    }

    render(id) {
        let info = $('<div>').addClass('info').css('display', 'none')
            .append($('<span>').html(`&phone; ${this.phone}`))
            .append($('<span>').html(`&#9993; ${this.email}`));

        let contact = $('<article>')
            .append(this.title)
            .append(info);

        $('#' + id)
            .append(contact);
    }
}
