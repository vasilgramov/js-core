function startApp() {

    const USERNAME = 'Vasil';
    const PASSWORD = '1234';
    const baseURL = 'https://baas.kinvey.com/appdata/kid_rJzgQ1AUb';
    // views
    $('#linkHome').click(() => show('linkHome'));
    $('#linkLogin').click(() => show('linkLogin'));
    $('#linkRegister').click(() => show('linkRegister'));
    $('#linkCreateBook').click(() => show('linkCreateBook'));
    $('#linkLogout').click(logout);

    show('linkHome');

    $('form').submit((event) => event.preventDefault());

    (() => {
        let counter = 0;
        $(document).on({
            ajaxStart: function () {
                counter++;
                $("#loadingBox").fadeIn();
            },
            ajaxStop: function () {
                counter--;
                setTimeout(hide, 100);

                function hide() {
                    if (counter === 0)
                        $("#loadingBox").fadeOut();
                }
            }
        })
    })();

    if (localStorage.getItem('username') !== null) {
        loggedView();
    } else {
        loggedOutView();
    }

    $('#formRegister').submit(register);
    $('#formLogin').submit(login);
    $('#linkListBooks').click(listBooks);
    $('#formCreateBook').submit(createBook);

    // ################################

    function register() {
        let username = $('#formRegister').find('[name=username]').val();
        let password = $('#formRegister').find('[name=passwd]').val();

        checkIfUsernameExists(username);

        function checkIfUsernameExists(username) {
            let req = {
                url: baseURL + `/users/?query={"username":"${username}"}`,
                method: 'GET',
                headers: {
                    "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
                },
            };

            $.ajax(req)
                .then(ifExists)
                .catch(displayError);
        }

        function ifExists(data) {
            $('#formRegister').find('[name=username]').val('');
            $('#formRegister').find('[name=passwd]').val('');

            if (data.length !== 0) {
                notify("#errorBox", "User with same username exists!");
            } else {
                let user = {
                    username: username,
                    password: password
                };

                let req = {
                    url: baseURL + '/users',
                    method: 'POST',
                    headers: {
                        "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
                    },
                    contentType: "application/json",
                    data: JSON.stringify(user)
                };

                $.ajax(req)
                    .then(successfullyRegister)
                    .catch(displayError);
            }
        }

        function successfullyRegister(data) {
            show('linkLogin');
            notify('#infoBox', 'Successfully register!')
        }
    }

    function listBooks() {
        if (localStorage.getItem('username') === null) {
            logout();
        }

        let req = {
            url: baseURL + '/books',
            method: 'GET',
            headers: {
                "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
            }
        };

        $.ajax(req)
            .then(displayBooks)
            .catch(displayError);

        function displayBooks(data) {
            $('#books').empty();
            $('#books')
                .append($('<table>')
                    .append($('<tr>')
                        .append($('<th>Title</th>'))
                        .append($('<th>Author</th>'))
                        .append($('<th>Description</th>'))
                        .append($('<th>Actions</th>'))
                    ));

            for (let d of data) {
                $('#books').find('table')
                    .append($('<tr>')
                        .append($('<td>').text(d['title']))
                        .append($('<td>').text(d['author']))
                        .append($('<td>').text(d['description']))
                        .append(checkForBookCreator(d)));
            }

            function checkForBookCreator(book) {
                if (localStorage.getItem('username') === book['author_name']) {
                    return $('<td>')
                        .append($('<a href="#">[Delete]</a>').click(() => deleteBook(book['_id'])))
                        .append($('<a href="#">[Edit]</a>').click(() => editBook(book['_id'])));
                }
            }

            $('section').css('display', 'none');
            $('#viewBooks').show();
        }
    }

    function createBook() {
        if (localStorage.getItem('username') === null) {
            logout();
        }

        let title = $('#formCreateBook').find('[name=title]').val();
        let author = $('#formCreateBook').find('[name=author]').val();
        let description = $('#formCreateBook').find('[name=description]').val();

        $('#formCreateBook').find('[name=title]').val('');
        $('#formCreateBook').find('[name=author]').val('');
        $('#formCreateBook').find('[name=description]').val('');

        let author_name = localStorage.getItem('username');

        let book = {
            title: title,
            author: author,
            description: description,
            author_name: author_name
        };

        let req = {
            url: baseURL + '/books',
            method: 'POST',
            headers: {
                "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
            },
            contentType: "application/json",
            data: JSON.stringify(book)
        };

        $.ajax(req)
            .then(afterCreate)
            .catch(displayError);

        function afterCreate() {
            notify('#infoBox', `Book ${title} created!`);
            listBooks();
        }
    }

    function login() {
        let username = $('#formLogin').find('[name=username]').val();
        let password = $('#formLogin').find('[name=passwd]').val();

        let req = {
            url: baseURL + `/users/?query={"username":"${username}", "password":"${password}"}`,
            method: 'GET',
            headers: {
                "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
            },
        };

        $.ajax(req)
            .then(authorize)
            .catch(displayError);

        function authorize(data) {
            $('#formLogin').find('[name=username]').val('');
            $('#formLogin').find('[name=passwd]').val('');

            if (data.length === 0) {
                notify("#errorBox", "User does not exist!");
            } else {
                localStorage.clear();
                localStorage.setItem('username', data[0]['username']);

                loggedView();
                show('linkHome');
                notify("#infoBox", "Successfully logged in!");
            }
        }
    }

    function logout() {
        localStorage.clear();

        loggedOutView();
        show('linkHome');
    }

    function loggedView() {
        $('#linkLogin').hide();
        $('#linkRegister').hide();
        $('#linkListBooks').show();
        $('#linkCreateBook').show();
        $('#linkLogout').show();

        $('#loggedInUser').text('Hello, ' + (localStorage.getItem('username'))).css('display', 'block');
    }

    function loggedOutView() {
        $('#linkLogin').show();
        $('#linkRegister').show();
        $('#linkListBooks').hide();
        $('#linkCreateBook').hide();
        $('#linkLogout').hide();

        $('#loggedInUser').css('display', 'none');
    }

    function deleteBook(id) {
        let req = {
            url: baseURL + `/books/${id}`,
            method: 'DELETE',
            headers: {
                "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
            }
        };

        $.ajax(req)
            .then(listBooks)
            .catch(displayError);
    }

    function editBook(id) {
        getBookById();

        function getBookById() {
            let getBookByid = {
                url: baseURL + `/books/${id}`,
                method: 'GET',
                headers: {
                    "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
                }
            };

            $.ajax(getBookByid)
                .then(fillInputFields)
                .catch(displayError);
        }

        function fillInputFields(data) {
            $('#formEditBook').find('[name=title]').val(data['title']);
            $('#formEditBook').find('[name=author]').val(data['author']);
            $('#formEditBook').find('[name=description]').val(data['description']);

            $('#viewBooks').hide();
            $('#viewEditBook').show();
        }

        $('#formEditBook').submit(updateBook);

        function updateBook() {
            let title = $('#formEditBook').find('[name=title]').val();
            let author = $('#formEditBook').find('[name=author]').val();
            let description = $('#formEditBook').find('[name=description]').val();

            let book = {
                title: title,
                author: author,
                description: description,
                author_name: localStorage.getItem('username')
            };

            let req = {
                url: baseURL + `/books/${id}`,
                method: 'PUT',
                headers: {
                    "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
                },
                contentType: "application/json",
                data: JSON.stringify(book)
            };

            $.ajax(req)
                .then(afterUpdate)
                .catch(displayError);

            function afterUpdate() {
                notify('#infoBox', 'Book updated!');
                
                listBooks();
            }
        }
    }

    function show(section) {
        $('section').css('display', 'none');

        switch (section) {
            case 'linkHome':
                $('#viewHome').css('display', 'block');
                break;
            case 'linkLogin':
                $('#viewLogin').css('display', 'block');
                break;
            case "linkRegister":
                $('#viewRegister').css('display', 'block');
                break;
            case "linkListBooks":
                $('#viewBooks').css('display', 'block');
                break;
            case "linkCreateBook":
                $('#viewCreateBook').css('display', 'block');
                break;
        }
    }

    function notify(id, message) {
        $(id).text(message).fadeIn();
        setTimeout(() => $(id).fadeOut(), 1500);
    }

    function displayError(error) {
        console.log(error);
    }
}