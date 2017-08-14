function startApp() {

    const app = Sammy('#app', function () {
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
        this.get('messages.html', displayHome);
        this.get('#/home', displayHome);

        function displayHome(context) {

            context.isAnonymous = sessionStorage.getItem('name') === null;
            context.name = sessionStorage.getItem('name');

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                homePage: './templates/home/home.hbs'
            }).then(function () {
                this.partial('./templates/home/homePage.hbs');
            });
        }

        // LOGIN
        this.get('#/login', function (context) {

            context.isAnonymous = sessionStorage.getItem('name') === null;
            context.name = sessionStorage.getItem('name');

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
            let password = context.params.password;

            auth.login(username, password)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo('Logged in!');

                    displayHome(context);
                }).catch(auth.handleError);
        });

        // REGISTER
        this.get('#/register', function (context) {

            context.isAnonymous = sessionStorage.getItem('username') === null;
            context.name = sessionStorage.getItem('name');

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
            let password = context.params.password;
            let name = context.params.name;

            auth.register(username, password, name)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo('Registered!');

                    displayHome(context);
                }).catch(auth.handleError);
        });

        // LOGOUT
        this.get('#/logout', function (context) {

            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo('Logged out!');

                    displayHome(context);
                }).catch(auth.handleError);
        });

        // SEND MESSAGE
        this.get('#/sendmessage', function (context) {

            context.isAnonymous = sessionStorage.getItem('username') === null;
            context.name = sessionStorage.getItem('name');

            messageService.getAllUsers()
                .then(function (users) {

                    context.users = users;

                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        user: './templates/sendMessage/user.hbs'
                    }).then(function () {
                        this.partial('./templates/sendMessage/sendPage.hbs');
                    });
                }).catch(auth.handleError);
        });

        this.post('#/sendmessage', function (context) {

            let senderUsername = sessionStorage.getItem('username');
            let senderName = sessionStorage.getItem('name');
            let recipient = context.params.recipient;
            let text = context.params.text;


            console.log(recipient);

            messageService.sendMessage(senderUsername, senderName, recipient, text)
                .then(function (messageData) {
                    auth.showInfo('Message sent!');

                    displayHome(context);
                }).catch(auth.handleError);
        });

        // MY MESSAGES
        this.get('#/mymessages', function (context) {

            context.isAnonymous = sessionStorage.getItem('username') === null;
            context.name = sessionStorage.getItem('name');

            messageService.loadReceivedMessages()
                .then(function (messages) {

                    for (let m of messages) {
                        m.date = formatDate(m._kmd.ect);
                    }

                    context.messages = messages;

                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        message: './templates/receivedMessages/receivedMessage.hbs'
                    }).then(function () {
                        this.partial('./templates/receivedMessages/receivedMessagesPage.hbs')
                    });
                }).catch(auth.handleError);
        });

        function formatDate(dateISO8601) {
            let date = new Date(dateISO8601);
            if (Number.isNaN(date.getDate()))
                return '';
            return date.getDate() + '.' + padZeros(date.getMonth() + 1) +
                "." + date.getFullYear() + ' ' + date.getHours() + ':' +
                padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds());

            function padZeros(num) {
                return ('0' + num).slice(-2);
            }
        }

        // SENT MESSAGES
        this.get('#/archive', function (context) {

            context.isAnonymous = sessionStorage.getItem('username') === null;
            context.name = sessionStorage.getItem('name');

            messageService.loadSentMessages()
                .then(function (messages) {

                    for (let m of messages) {
                        m.date = formatDate(m._kmd.ect);
                    }

                    context.messages = messages;

                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        message: './templates/archiveSent/sentMessage.hbs'
                    }).then(function () {
                        this.partial('./templates/archiveSent/sentMessagesPage.hbs');
                    });
                });
        });

        this.get('#/delete/:id', function (context) {

            let id = context.params.id;
            messageService.deleteMessage(id)
                .then(function () {
                    auth.showInfo('Message deleted!');

                    displayHome(context);
                }).catch(auth.handleError);
        });

    });


    app.run();
}