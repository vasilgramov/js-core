let auth = (() => {

    function login(username, password) {
        let data = {
            username,
            password
        };

        return requester.post('user', 'login', 'basic', data);
    }

    function register(username, password, name) {
        let data = {
            username,
            password,
            name
        };

        return requester.post('user', '', 'basic', data);
    }

    function logout() {
        let logoutData = {
            authtoken: sessionStorage.getItem('authtoken')
        };

        return requester.post('user', '_logout', 'kinvey', logoutData);
    }

    function saveSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);

        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);

        let username = userInfo.username;
        sessionStorage.setItem('username', username);

        let name = userInfo.name;
        sessionStorage.setItem('name', name);
    }

    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    function showInfo(message) {
        let infoBox = $('#infoBox');
        infoBox.text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.text(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 3000);
    }

    return {
        login,
        register,
        logout,
        saveSession,
        handleError,
        showInfo,
        showError
    };
})();