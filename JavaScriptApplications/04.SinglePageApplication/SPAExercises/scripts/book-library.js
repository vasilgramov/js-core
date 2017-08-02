function startApp() {

    // constantcs
    const USERNAME = 'Vasil';
    const PASSWORD = '1234';
    const usersURL = 'https://baas.kinvey.com/appdata/kid_rJzgQ1AUb';

    // views
    $('#linkHome').click(() => show('linkHome'));
    $('#linkLogin').click(() => show('linkLogin'));
    $('#linkRegister').click(() => show('linkRegister'));
    $('#linkListBooks').click(() => show('linkListBooks'));
    $('#linkCreateBook').click(() => show('linkCreateBook'));
    $('#linkLogout').click(logout);

    show('linkHome');

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
    //////////////////////////////////////////////////////////////////

    //-----------------------
    $('form').submit((event) => event.preventDefault());

    $(document).on({
        ajaxStart: function() { $("#loadingBox").fadeIn() },
        ajaxStop: function() { $("#loadingBox").fadeOut() }
    });
    //////////////////////////////////////////////////////////////////

    // business logic
    $('#formRegister').submit(register);
    $('#formLogin').submit(login);

    function register() {
        console.log('REGISTER');

        let username = $('#formRegister').find('[name=username]').val();
        let password = $('#formRegister').find('[name=passwd]').val();

        let user = {
            username: username,
            password: password
        };

        let req = {
            url: usersURL + '/users',
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
    function successfullyRegister(data) {
        notify('#infoBox', 'Successfully Register!')
    }

    function login() {
        
    }
    
    function logout() {
        // TODO:
    }

    function notify(id, message) {
        $(id).text(message).fadeIn();
        setTimeout(() => $(id).fadeOut(), 1500);
    }
    
    function displayError(error) {

    }
}