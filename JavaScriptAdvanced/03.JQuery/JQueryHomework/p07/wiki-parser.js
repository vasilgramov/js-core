function wikiParser(selector) {
    let text = $(selector).text();

    text = text
        .replace(/===([^=]+)===/g, (match, group) => `<h3>${group}</h3>`)
        .replace(/==([^=]+)==/g, (match, group) => `<h2>${group}</h2>`)
        .replace(/=([^=]+)=/g, (match, group) => `<h1>${group}</h1>`)
        .replace(/'''([^']+)'''/g, (match, group) => `<b>${group}</b>`)
        .replace(/''([^']+)''/g, (match, group) => `<i>${group}</i>`)
        .replace(/\[\[([^'=\[\]]+?)\|([^'=\[\]]+?)]]/g, (match, group1, group2) => `<a href="/wiki/${group1}">${group2}</a>`)
        .replace(/\[\[([^'=\[\]]+?)]]/g, (match, group) => `<a href="/wiki/${group}">${group}</a>`);

    $(selector).html(text);
}