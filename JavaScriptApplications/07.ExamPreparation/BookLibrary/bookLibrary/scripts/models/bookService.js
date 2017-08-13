let bookService = (() => {

    function loadBooks() {
        return requester.get('appdata', 'books', 'kinvey');
    }

    function createBook(title, author, description) {
        let bookData = {
            title: title,
            author: author,
            description: description
        };

        return requester.post('appdata', 'books', 'kinvey', bookData);
    }

    function deleteBook(bookId) {
        return requester.remove('appdata', 'books/' + bookId, 'kinvey');
    }

    function getBook(bookId) {
        return requester.get('appdata', 'books/' + bookId, 'kinvey');
    }

    function editBook(bookId, title, author, description) {
        let bookData = {
            title: title,
            author: author,
            description: description
        };

        return requester.update('appdata', 'books/' + bookId, 'kinvey', bookData);
    }

    return {
        loadBooks,
        createBook,
        deleteBook,
        getBook,
        editBook
    };
})();