function startApp() {
    // Clear user auth information at startup
    sessionStorage.clear();

    showHideMenuLinks();
	showView('viewHome');

    // Bind the navigation menu links
    $("#linkHome").click(showHomeView);
    $("#linkLogin").click(showLoginView);
    $("#linkRegister").click(showRegisterView);
    $("#linkListBooks").click(listBooks);
    $("#linkCreateBook").click(showCreateBookView);
    $("#linkLogout").click(logoutUser);

    // Bind the form submit buttons
    $("#formLogin").submit(loginUser);
    $("#formRegister").submit(registerUser);
    $("#formCreateBook").submit(createBook);
    $("#formEditBook").submit(editBook);
    $("form").submit(function(event) { event.preventDefault() });

    // Bind the info / error boxes
    $("#infoBox, #errorBox").click(function() {
        $(this).fadeOut();
    });

    // Attach AJAX "loading" event listener
	$(document).on({
		ajaxStart: function() { $("#loadingBox").show() },
		ajaxStop: function() { $("#loadingBox").hide() }    
	});

    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppKey = "kid_rkcLxcUr";
    const kinveyAppSecret = "e234a245b3864b2eb7ee41e19b8ca4e5";
    const kinveyAppAuthHeaders = {
        'Authorization': "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret),
    };

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();
    }

    function showHideMenuLinks() {
        $("#linkHome").show();
        if (sessionStorage.getItem('authToken') == null) {
            // No logged in user
            $("#linkLogin").show();
            $("#linkRegister").show();
            $("#linkListBooks").hide();
            $("#linkCreateBook").hide();
            $("#linkLogout").hide();
        } else {
            // We have logged in user
            $("#linkLogin").hide();
            $("#linkRegister").hide();
            $("#linkListBooks").show();
            $("#linkCreateBook").show();
            $("#linkLogout").show();
        }
    }

    function showInfo(message) {
        $('#infoBox').text(message);
        $('#infoBox').show();
        setTimeout(function() {
            $('#infoBox').fadeOut();
        }, 3000);
    }

    function showError(errorMsg) {
        $('#errorBox').text("Error: " + errorMsg);
        $('#errorBox').show();
    }

    function handleAjaxError(response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON && response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        showError(errorMsg);
    }

    function showHomeView() {
        showView('viewHome');
    }

    function showLoginView() {
        showView('viewLogin');
        $('#formLogin').trigger('reset');
    }

    function loginUser() {
        const kinveyLoginUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/login";
        let userData = {
            username: $('#formLogin input[name=username]').val(),
            password: $('#formLogin input[name=passwd]').val()
        };
        $.ajax({
            method: "POST",
            url: kinveyLoginUrl,
            headers: kinveyAppAuthHeaders,
            data: userData,
            success: loginSuccess,
            error: handleAjaxError
        });

        function loginSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            listBooks();
            showInfo('Login successful.');
        }
    }

    function saveAuthInSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authToken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        $('#loggedInUser').text("Welcome, " + username + "!");
    }

    function showRegisterView() {
        $('#formRegister').trigger('reset');
        showView('viewRegister');
    }

    function registerUser() {
        const kinveyRegisterUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/";
        let userData = {
            username: $('#formRegister input[name=username]').val(),
            password: $('#formRegister input[name=passwd]').val()
        };
        $.ajax({
            method: "POST",
            url: kinveyRegisterUrl,
            headers: kinveyAppAuthHeaders,
            data: userData,
            success: registerSuccess,
            error: handleAjaxError
        });

        function registerSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            listBooks();
            showInfo('User registration successful.');
        }
    }

    function listBooks() {
        $('#books').empty();
        showView('viewBooks');

        const kinveyBooksUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/books";
        $.ajax({
            method: "GET",
            url: kinveyBooksUrl,
            headers: getKinveyUserAuthHeaders(),
            success: loadBooksSuccess,
            error: handleAjaxError
        });

        function loadBooksSuccess(books) {
            showInfo('Books loaded.');
            if (books.length == 0) {
                $('#books').text('No books in the library.');
            } else {
                let booksTable = $('<table>')
                    .append($('<tr>').append(
                        '<th>Title</th>',
                        '<th>Author</th>',
                        '<th>Description</th>',
                        '<th>Actions</th>')
                    );
                for (let book of books) {
                    let links = [];
                    if (book._acl.creator == sessionStorage['userId']) {
                        let deleteLink = $('<a href="#">[Delete]</a>')
                            .click(deleteBook.bind(this, book));
                        let editLink = $('<a href="#">[Edit]</a>')
                            .click(loadBookForEdit.bind(this, book));
                        links = [deleteLink, ' ', editLink];
                    }
                    booksTable.append($('<tr>').append(
                        $('<td>').text(book.title),
                        $('<td>').text(book.author),
                        $('<td>').text(book.description),
                        $('<td>').append(links)
                    ));
                }
                $('#books').append(booksTable);
            }
        }
    }

    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
        };
    }

    function showCreateBookView() {
        $('#formCreateBook').trigger('reset');
        showView('viewCreateBook');
    }

    function createBook() {
        const kinveyBooksUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/books";
        let bookData = {
            title: $('#formCreateBook input[name=title]').val(),
            author: $('#formCreateBook input[name=author]').val(),
            description: $('#formCreateBook textarea[name=description]').val()
        };

        $.ajax({
            method: "POST",
            url: kinveyBooksUrl,
            headers: getKinveyUserAuthHeaders(),
            data: bookData,
            success: createBookSuccess,
            error: handleAjaxError
        });

        function createBookSuccess(response) {
            listBooks();
            showInfo('Book created.');
        }
    }

    function deleteBook(book) {
        const kinveyBookUrl = kinveyBaseUrl + "appdata/" +
            kinveyAppKey + "/books/" + book._id;
        $.ajax({
            method: "DELETE",
            url: kinveyBookUrl,
            headers: getKinveyUserAuthHeaders(),
            success: deleteBookSuccess,
            error: handleAjaxError
        });

        function deleteBookSuccess(response) {
            listBooks();
            showInfo('Book deleted.');
        }
    }

    function loadBookForEdit(book) {
        const kinveyBookUrl = kinveyBaseUrl + "appdata/" +
            kinveyAppKey + "/books/" + book._id;
        $.ajax({
            method: "GET",
            url: kinveyBookUrl,
            headers: getKinveyUserAuthHeaders(),
            success: loadBookForEditSuccess,
            error: handleAjaxError
        });

        function loadBookForEditSuccess(book) {
            $('#formEditBook input[name=id]').val(book._id);
            $('#formEditBook input[name=title]').val(book.title);
            $('#formEditBook input[name=author]').val(book.author);
            $('#formEditBook textarea[name=description]').val(book.description);
            showView('viewEditBook');
        }
    }

    function editBook() {
        const kinveyBookUrl =  kinveyBaseUrl + "appdata/" + kinveyAppKey +
            "/books/" + $('#formEditBook input[name=id]').val();
        let bookData = {
            title: $('#formEditBook input[name=title]').val(),
            author: $('#formEditBook input[name=author]').val(),
            description: $('#formEditBook textarea[name=description]').val()
        };
        $.ajax({
            method: "PUT",
            url: kinveyBookUrl,
            headers: getKinveyUserAuthHeaders(),
            data: bookData,
            success: editBookSuccess,
            error: handleAjaxError
        });

        function editBookSuccess(response) {
            listBooks();
            showInfo('Book edited.');
        }
    }

    function logoutUser() {
        sessionStorage.clear();
        $('#loggedInUser').text("");
        showHideMenuLinks();
        showView('viewHome');
        showInfo('Logout successful.');
    }
}
