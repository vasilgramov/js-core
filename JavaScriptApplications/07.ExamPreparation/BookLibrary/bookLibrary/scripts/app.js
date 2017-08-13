function startApp() {

    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        $(document).on({
            ajaxStart: function () {
                $("#loadingBox").show()
            },
            ajaxStop: function () {
                $("#loadingBox").hide()
            }
        });

        // HOME
        this.get('index.html', displayHome);
        this.get('#/home', displayHome);

        function displayHome(context) {

            context.isLogged = sessionStorage.getItem('username') !== null;
            context.username = sessionStorage.getItem('username');

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/home/home.hbs');
            });
        }

        // LOGIN
        this.get('#/login', function (context) {

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs');
            });
        });

        this.post('#/login', function (context) {

            let username = context.params.username;
            let password = context.params.passwd;

            auth.login(username, password)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo('Logged in successfully!');

                    displayHome(context);
                }).catch(requester.handleError)
        });

        // REGISTER
        this.get('#/register', function (context) {

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs');
            });
        });

        this.post('#/register', function (context) {

            let username = context.params.username;
            let password = context.params.passwd;

            auth.register(username, password)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo('Registered successfully!');

                    displayHome(context);
                }).catch(auth.handleError);
        });

        // LOGOUT
        this.get('#/logout', function (context) {

            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo('Logged out successfully!');

                    displayHome(context);
                }).catch(auth.handleError);
        });

        // LIST BOOKS
        this.get('#/listBooks', listBooks);

        function listBooks(context) {

            context.isLogged = sessionStorage.getItem('username') !== null;
            context.username = sessionStorage.getItem('username');

            bookService.loadBooks()
                .then(function (books) {

                    books = books.map(function (book) {
                        book.isCreator = book._acl.creator === sessionStorage.getItem('userId');
                        return book;
                    });

                    context.books = books;

                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        book: './templates/books/book.hbs',
                    }).then(function () {
                        this.partial('./templates/books/booksTable.hbs');
                    });
                }).catch(auth.handleError);
        }

        // CREATE BOOK
        this.get('#/createBook', function (context) {

            context.isLogged = sessionStorage.getItem('username') !== null;
            context.username = sessionStorage.getItem('username');

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function () {
                this.partial('./templates/create/createPage.hbs');
            });
        });

        this.post('#/createBook', function (context) {

            let title = context.params.title;
            let author = context.params.author;
            let description = context.params.description;

            console.log(title);
            console.log(author);
            console.log(description);

            bookService.createBook(title, author, description)
                .then(function (bookData) {
                    auth.showInfo(`Book ${bookData.title} create!`);

                    listBooks(context);
                }).catch(auth.handleError);
        });

        // DELETE BOOK
        this.get('#/delete/:id', function (context) {

            let id = context.params.id;

            bookService.deleteBook(id)
                .then(function () {
                    auth.showInfo(`Book deleted!`);

                    listBooks(context);
                }).catch(auth.handleError);
        });

        // EDIT BOOK
        this.get('#/edit/:id', function (context) {

            let id = context.params.id;

            context.isLogged = sessionStorage.getItem('username') !== null;
            context.username = sessionStorage.getItem('username');

            bookService.getBook(id)
                .then(function (bookData) {

                    context.id = bookData._id;
                    context.title = bookData.title;
                    context.author = bookData.author;
                    context.description = bookData.description;

                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        editForm: './templates/edit/editForm.hbs'
                    }).then(function () {
                        this.partial('./templates/edit/editPage.hbs');
                    });
                }).catch(auth.handleError);
        });

        this.post('#/edit/:id', function (context) {

            let id = context.params.id;
            let title = context.params.title;
            let author = context.params.author;
            let description = context.params.description;

            context.isLogged = sessionStorage.getItem('username') !== null;
            context.username = sessionStorage.getItem('username');

            bookService.editBook(id, title, author, description)
                .then(function (bookData) {
                    auth.showInfo(`Book ${bookData.title} edited!`);

                    listBooks(context);
                }).catch(auth.handleError);
        });
    });



    app.run();
}