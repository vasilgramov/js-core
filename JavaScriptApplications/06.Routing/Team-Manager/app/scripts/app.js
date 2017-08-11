$(() => {

    const app = Sammy('#main', function () {

        this.use('Handlebars', 'hbs');

        //################################

        this.get('index.html', displayHome);

        this.get('#/home', displayHome);

        function displayHome(context) {

            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/home/home.hbs');
            });
        }

        // GET MAPPING
        this.get('#/login', function (context) {

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs')
            });
        });

        this.get('#/register', function (context) {

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs')
            });
        });

        this.get('#/about', function (context) {

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/about/about.hbs')
            });
        });

        this.get('#/logout', function (context) {

            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    displayHome(context);
                }).catch(auth.handleError);
        });

        this.get('#/catalog', displayCatalog);

        function displayCatalog(context) {

            console.log("DISPLAY CATALOG");

            context.loggedIn = sessionStorage.getItem('username') !== null;
            context.username = sessionStorage.getItem('username');

            context.hasNoTeam = sessionStorage.getItem('teamId') === '' || sessionStorage.getItem('teamId') === 'undefined';

            teamsService.loadTeams()
                .then(function (teams) {
                    context.teams = teams;

                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        team: './templates/catalog/team.hbs',
                    }).then(function () {
                        this.partial('./templates/catalog/teamCatalog.hbs');
                    });
                });
        }

        this.get('#/create', function (context) {

            context.loggedIn = sessionStorage.getItem('username') !== null;
            context.username = sessionStorage.getItem('username');

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function () {
                this.partial('./templates/create/createPage.hbs');
            });
        });

        this.get('#/catalog/:id', function (context) {

            let teamId = context.params.id.substring(1);
            teamsService.loadTeamDetails(teamId)
                .then(function (teamData) {

                    context.loggedIn = sessionStorage.getItem('username') !== null;
                    context.username = sessionStorage.getItem('username');

                    context.teamId = teamData._id;
                    context.name = teamData.name;
                    context.comment = teamData.comment;
                    context.isOnTeam = sessionStorage.getItem('teamId') === teamData._id;
                    context.isAuthor = sessionStorage.getItem('userId') === teamData._acl.creator;

                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        teamControls: './templates/catalog/teamControls.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/details.hbs');
                    });
                });
        });

        this.get('#/join/:id', function (context) {

            let teamId = context.params.id.substring(1);
            teamsService.joinTeam(teamId)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo('You joined the team');

                    displayCatalog(context);
                });
        });

        this.get('#/leave', function (context) {

            teamsService.leaveTeam()
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo('You left the team');

                    displayCatalog(context);
                });
        });

        this.get('#/edit/:id', function (context) {

            let teamId = context.params.id.substring(1);
            teamsService.loadTeamDetails(teamId)
                .then(function (teamData) {

                    context.loggedIn = sessionStorage.getItem('username') !== null;
                    context.username = sessionStorage.getItem('username');

                    context.teamId = teamData._id;
                    context.name = teamData.name;
                    context.comment = teamData.comment;

                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        editForm: './templates/edit/editForm.hbs'
                    }).then(function () {
                        this.partial('./templates/edit/editPage.hbs');
                    });
                });
        });

        // ##################################################
        // POST MAPPING
        this.post('#/register', function (context) {

            let username = context.params.username;
            let password = context.params.password;
            let repeatPassword = context.params.repeatPassword;

            if (password !== repeatPassword) {
                auth.showError('Passwords does not match');
                return;
            }

            auth.register(username, password)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo('Registered successfully');

                    displayHome(context);
                }).catch(auth.handleError);
        });

        this.post('#/login', function (context) {

            let username = context.params.username;
            let password = context.params.password;

            auth.login(username, password)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo('Logged in successfully');

                    displayHome(context);
                }).catch(auth.handleError);
        });

        this.post('#/create', function (context) {

            let teamName = context.params.name;
            let description = context.params.comment;

            teamsService.createTeam(teamName, description)
                .then(function (teamInfo) {
                    auth.showInfo(`Team ${teamName} created`);

                    teamsService.joinTeam(teamInfo._id)
                        .then(function (userInfo) {
                            auth.saveSession(userInfo);
                            displayCatalog(context);

                        }).catch(auth.handleError);
                }).catch(auth.handleError);
        });

        this.post('#/edit/:id', function (context) {

            let teamId = context.params.id.substring(1);
            let teamName = context.params.name;
            let description = context.params.comment;


            teamsService.edit(teamId, teamName, description)
                .then(function () {
                    auth.showInfo(`Team ${teamName} edited`);
                    displayCatalog(context);
                });
        });
    });

    app.run();
});

