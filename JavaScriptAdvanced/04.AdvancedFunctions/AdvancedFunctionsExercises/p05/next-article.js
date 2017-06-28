function getArticleGenerator(articles) {
    let index = 0;

    return function getNext() {
        if (index < articles.length) {
            let article = $('<article>');

            article.append($(`<p>${articles[index++]}</p>`));

            $('#content').append(article);
        }
    }
}
