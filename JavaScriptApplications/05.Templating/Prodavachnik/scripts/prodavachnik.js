function startApp() {

    if (sessionStorage.getItem('username') !== null) {
        loginView();
    } else {
        logoutView();
    }

    $('#linkHome').click(() => showSection('#viewHome'));
    $('#linkLogin').click(() => showSection('#viewLogin'));
    $('#linkRegister').click(() => showSection('#viewRegister'));
    $('#linkCreateAd').click(() => showSection('#viewCreateAd'));
    $('#buttonEditAd').click(() => showSection('#viewEditAd'));
    $('#linkLogout').click(logout);


    const baseURL = 'https://baas.kinvey.com/';
    const appKey = 'kid_ryPblXIwb';
    const appSecret = '0a2d29f36ee84554aaaafcbbf3e52d1a';
    const headers = {
        'Authorization': "Basic " + btoa(appKey + ":" + appSecret),
    };

    $("form").submit(function(event) { event.preventDefault() });

    $("#formRegister").submit(registerUser);
    $('#formLogin').submit(loginUser);
    $('#linkListAds').click(listAds);
    $('#formCreateAd').submit(createAd);
    $('#formEditAd').submit(editAd);

    //####################################################

    $("#infoBox, #errorBox").click(function() {
        $(this).fadeOut();
    });

    $(document).on({
        ajaxStart: function() { $("#loadingBox").show() },
        ajaxStop: function() { $("#loadingBox").hide() }
    });

    //####################################################

    function showSection(selector) {
        $('main > section').hide();

        $(selector).show();
    }

    function loginView() {
        $('header').find('a').hide();

        let username = sessionStorage.getItem('username');
        $('#loggedInUser').text("Welcome, " + username + "!").css('display', 'inline');

        $('#linkHome').show();
        $('#linkListAds').show();
        $('#linkCreateAd').show();
        $('#linkLogout').show();

        showSection('#viewHome');
    }

    function logoutView() {
        $('header').find('a').hide();

        $('#loggedInUser').text("").css('display', 'none');

        $('#linkHome').show();
        $('#linkLogin').show();
        $('#linkRegister').show();

        showSection('#viewHome');
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
        setTimeout(function() {
            $('#errorBox').fadeOut();
        }, 3000);

    }

    function handleAjaxError(response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON && response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        showError(errorMsg);
    }

    function getUserAuthHeader() {
        return {
            'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
        };
    }

    function registerUser() {
        const kinveyRegisterUrl = baseURL + "user/" + appKey + "/";
        let userData = {
            username: $('#formRegister input[name=username]').val(),
            password: $('#formRegister input[name=passwd]').val()
        };

        $('#formRegister input[name=username]').val('');
        $('#formRegister input[name=passwd]').val('');

        $.ajax({
            method: "POST",
            url: kinveyRegisterUrl,
            headers: headers,
            data: userData,
            success: registerSuccess,
            error: handleAjaxError,
        });


        function registerSuccess(userInfo) {
            saveAuthInSession(userInfo);
            loginView();

            showInfo('User registration successful.');
        }
    }

    function saveAuthInSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authToken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        sessionStorage.setItem('username', username);
    }

    function loginUser() {
        const kinveyLoginUrl = baseURL + "user/" + appKey + "/login";
        let userData = {
            username: $('#formLogin input[name=username]').val(),
            password: $('#formLogin input[name=passwd]').val()
        };

        username: $('#formLogin input[name=username]').val('');
        password: $('#formLogin input[name=passwd]').val('');

        $.ajax({
            method: "POST",
            url: kinveyLoginUrl,
            headers: headers,
            data: userData,
            success: loginSuccess,
            error: handleAjaxError
        });

        function loginSuccess(userInfo) {
            saveAuthInSession(userInfo);
            loginView();

            showInfo('Login successful.');
        }
    }

    function logout() {
        sessionStorage.clear();

        logoutView();
        showInfo('Logout successful.');
    }

    function listAds() {
        $('#ads').empty();
        showSection('#viewAds');

        const adsUrl = baseURL + "appdata/" + appKey + "/ads";
        $.ajax({
            method: "GET",
            url: adsUrl,
            headers: getUserAuthHeader(),
            success: loadAdsSuccess,
            error: handleAjaxError
        });

        function loadAdsSuccess(ads) {
            showInfo('Ads loaded.');
            if (ads.length === 0) {
                $('#ads').text('No ads in the Prodavachnik.');
            } else {

                let adsTable = $('<table>')
                    .append($('<tr>').append(
                        '<th>Title</th>',
                        '<th>Publisher</th>',
                        '<th>Description</th>',
                        '<th>Price</th>',
                        '<th>Date Published</th>')
                    );

                for (let ad of ads) {
                    let links = [];

                    links.push($('<a href="#">[Read More]</a>').click(() => viewAdDetails(ad)));

                    if (ad._acl.creator === sessionStorage['userId']) {
                        let deleteLink = $('<a href="#">[Delete]</a>')
                            .click(() => deleteAd(ad));
                        let editLink = $('<a href="#">[Edit]</a>')
                            .click(() => loadAdForEdit(ad));
                        links.push(deleteLink);
                        links.push(editLink);
                    }
                    
                    adsTable.append($('<tr>').append(
                        $('<td>').text(ad.title),
                        $('<td>').text(ad.publisher),
                        $('<td>').text(ad.description),
                        $('<td>').text(ad.price),
                        $('<td>').text(ad.date_published),
                        $('<td>').append(links)
                    ));
                }
                
                $('#ads').append(adsTable);
            }
        }
    }
    
    function createAd() {
        const adsUrl = baseURL + "appdata/" + appKey + "/ads";

        let adData = {
            title: $('#formCreateAd input[name=title]').val(),
            publisher: sessionStorage.getItem('username'),
            description: $('#formCreateAd textarea[name=description]').val(),
            date_published: $('#formCreateAd input[name=datePublished]').val(),
            price: $('#formCreateAd input[name=price]').val(),
            img_url: $('#formCreateAd input[name=imageUrl]').val()
        };

        $('#formCreateAd input[name=title]').val('');
        $('#formCreateAd textarea[name=description]').val('');
        $('#formCreateAd input[name=datePublished]').val('');
        $('#formCreateAd input[name=price]').val('');
        $('#formCreateAd input[name=imageUrl]').val('');

        $.ajax({
            method: "POST",
            url: adsUrl,
            headers: getUserAuthHeader(),
            data: adData,
            success: createAdSuccess,
            error: handleAjaxError
        });

        function createAdSuccess(response) {
            listAds();

            showInfo('Ad created.');
        }
    }

    function viewAdDetails(ad) {
        $('#viewDetailsAd').empty();

        $('#viewDetailsAd')
            .append($('<div class="ad-box">')
                .append($(`<div class="ad-title">${ad.title}</div>`))
                .append($(`<div><img src="${ad.img_url}" alt="Ad Image"></div>`))
                .append($(`<div>Price ${ad.price} | By ${ad.publisher}</div>`))
            );

        showSection('#viewDetailsAd');
    }

    function deleteAd(ad) {
        const kinveyAdUrl =  baseURL + "appdata/" + appKey + "/ads/" + ad._id;

        $.ajax({
            method: "DELETE",
            url: kinveyAdUrl,
            headers: getUserAuthHeader(),
            success: deleteAdSuccess,
            error: handleAjaxError
        });

        function deleteAdSuccess(response) {
            showInfo('Ad deleted.');

            listAds();
        }
    }

    function loadAdForEdit(ad) {
        $('#formEditAd input[name=id]').val(ad._id);
        $('#formEditAd input[name=title]').val(ad.title);
        $('#formEditAd textarea[name=description]').val(ad.description);
        $('#formEditAd input[name=datePublished]').val(ad.date_published);
        $('#formEditAd input[name=price]').val(ad.price);
        $('#formEditAd input[name=imageUrl]').val(ad.img_url);
        
        showSection('#viewEditAd');
    }
    
    function editAd() {
        const adUrl =  baseURL + "appdata/" + appKey + "/ads/" + $('#formEditAd input[name=id]').val();

        console.log(sessionStorage.getItem('username'));

        let adData = {
            title: $('#formEditAd input[name=title]').val(),
            publisher: sessionStorage.getItem('username'),
            description: $('#formEditAd textarea[name=description]').val(),
            date_published: $('#formEditAd input[name=datePublished]').val(),
            price: $('#formEditAd input[name=price]').val(),
            img_url: $('#formEditAd input[name=imageUrl]').val()
        };

        console.log(adData);

        $.ajax({
            method: "PUT",
            url: adUrl,
            headers: getUserAuthHeader(),
            data: adData,
            success: editAdSuccess,
            error: handleAjaxError
        });

        function editAdSuccess(response) {
            showInfo('Ad edited.');

            listAds();
        }
    }
}