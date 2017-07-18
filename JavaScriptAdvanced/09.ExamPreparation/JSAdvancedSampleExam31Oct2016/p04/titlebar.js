class TitleBar {
    constructor(title) {
        this.title = title;
        this.links = [];
    }

    addLink(href, name) {
        let link = $('<a>')
            .text(name)
            .addClass('menu-link')
            .attr('href', href);

        this.links.push(link);
    }

    appendTo(selector) {
        let nav = $('<nav>').addClass('menu');
        for (let link of this.links) {
            nav.append(link);
        }

        let titlebar = $('<header>').addClass('header')
            .append($('<div>').addClass('header-row')
                .append($('<a>').addClass('button').text('&#9776;').click(() => $('div.drawer').toggle())) // on-lick event
                .append($('<span>').addClass('title').text(this.title)))
            .append($('<div>').addClass('drawer')
                .append(nav));

        $(selector).append(titlebar);
    }
}
