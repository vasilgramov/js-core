function startApp() {

    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

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


    });

    app.run();
}