$(() => {

    const app = Sammy('#main', function () {

        this.use('Handlebars', 'hbs');

        //################################

        this.get('index.html', displayHome);

        this.get('#/home', displayHome);

        function displayHome(context) {

            context.loggedIn = sessionStorage.getItem('authtoken') !== null;

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/home/home.hbs');
            });
        }

        this.get('#/login', function (context) {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs')
            });
        });

        this.get('#/register', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs')
            }) ;
        });

        this.get('#/about', function (context) {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/about/about.hbs')
            });
        });

        this.post('#/register', function (context) {
            let username = context.params.username;
            let password = context.params.password;

            auth.register(username, password)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo('Registered successfully');

                    displayHome(context);
                }).catch(auth.handleError);
        });
    });
    
    // function redirect() {
    //
    // }

    app.run();
});



