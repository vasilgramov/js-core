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

        // INDEX HTML
        this.get('index.html', displaySignIn);
        function displaySignIn(context) {

            if (sessionStorage.getItem('username') !== null) {
                context.redirect('#/catalog');
                return
            }

            context.loggedIn = sessionStorage.getItem('username') !== null;
            context.username = sessionStorage.getItem('username');

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/signIn/loginForm.hbs',
                registerForm: './templates/signIn/registerForm.hbs',
            }).then(function () {
                this.partial('./templates/signIn/signInPage.hbs');
            });
        }

        // LOGIN
        this.post('#/login', function (context) {

            let username = context.params.username;
            let password = context.params.password;


            if (validate(username, password)) {
                auth.login(username, password)
                    .then(function (userInfo) {
                        auth.saveSession(userInfo);
                        auth.showInfo('Login successful.');

                        displayAllPosts(context);
                    }).catch(auth.handleError);
            }
        });

        // REGISTER
        this.post('#/register', function (context) {

            let username = context.params.username;
            let password = context.params.password;
            let repeatPassword = context.params.repeatPass;

            if (validate(username, password, repeatPassword)) {
                auth.register(username, password)
                    .then(function (userInfo) {
                        auth.saveSession(userInfo);
                        auth.showInfo('User registration successful.');

                        displayAllPosts(context);
                    }).catch(auth.handleError);
            }
        });

        // LOGOUT
        this.get('#/logout', function (context) {

            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo('Logout successful.');

                    displaySignIn(context);
                })
        });

        function validate(username, password, repeatPassword) {
            let usernameRegex = /^[A-Za-z]{3,}$/;
            let passwordRegex = /^[A-Za-z0-9]{6,}$/;

            if (!usernameRegex.test(username)) {
                auth.showError('The username should be at least 3 characters long and should contain only english alphabet letters.')

                return false;
            }

            if (!passwordRegex.test(password)) {
                auth.showError('The password should be at least 6 characters long and should contain only english alphabet letters and digits.')

                return false;
            }

            if (repeatPassword !== undefined && password !== repeatPassword) {
                auth.showError('Both passwords should match. ');

                return false;
            }

            return true;
        }

        this.get('#/about', function (context) {

            context.loggedIn = sessionStorage.getItem('username') !== null;
            context.username = sessionStorage.getItem('username');

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                navigation: './templates/common/navigation.hbs'
            }).then(function () {
                this.partial('./templates/about/aboutPage.hbs');
            })
        });

        this.get('#/catalog', displayAllPosts);

        function displayAllPosts(context) {

            context.loggedIn = sessionStorage.getItem('username') !== null;
            context.username = sessionStorage.getItem('username');

            postService.loadAllPosts()
                .then(function (posts) {

                    let rank = 1;
                    for (let p of posts) {
                        p['rank'] = rank++;
                        p['time'] = calcTime(p['_kmd']['ect']);
                        p['isCreator'] = p['_acl']['creator'] === sessionStorage.getItem('userId');
                    }

                    context.posts = posts;

                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigation: './templates/common/navigation.hbs',
                        post: './templates/catalog/post.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/catalogPage.hbs');
                    });
                }).catch(auth.handleError);
        }

        function calcTime(dateIsoFormat) {
            let diff = new Date - (new Date(dateIsoFormat));
            diff = Math.floor(diff / 60000);
            if (diff < 1) return 'less than a minute';
            if (diff < 60) return diff + ' minute' + pluralize(diff);
            diff = Math.floor(diff / 60);
            if (diff < 24) return diff + ' hour' + pluralize(diff);
            diff = Math.floor(diff / 24);
            if (diff < 30) return diff + ' day' + pluralize(diff);
            diff = Math.floor(diff / 30);
            if (diff < 12) return diff + ' month' + pluralize(diff);
            diff = Math.floor(diff / 12);
            return diff + ' year' + pluralize(diff);

            function pluralize(value) {
                if (value !== 1) return 's';
                else return '';
            }
        }

        // CREATE
        this.get('#/create', function (context) {

            context.loggedIn = sessionStorage.getItem('username') !== null;
            context.username = sessionStorage.getItem('username');

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                navigation: './templates/common/navigation.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function () {
                this.partial('./templates/create/createPage.hbs');
            });
        });

        this.post('#/create', function (context) {

            // TODO: validate input fields
            let author = sessionStorage.getItem('username');
            let url = context.params.url;
            let title = context.params.title;
            let imageUrl = context.params.image;
            let description = context.params.description;

            postService.createPost(author, title, url, imageUrl, description)
                .then(function () {
                    auth.showInfo('Post created.');

                    displayAllPosts(context);
                }).catch(auth.handleError);
        });

        // DETAILS
        this.get('#/details/:id', function (context) {

            let postId = context.params.id;
            context.loggedIn = sessionStorage.getItem('username') !== null;
            context.username = sessionStorage.getItem('username');

            postService.getPostComments(postId)
                .then(function (comments) {

                    for (let c of comments) {
                        c['postId'] = postId;
                        c['isCreator'] = c['_acl']['creator'] === sessionStorage.getItem('userId');
                    }

                    context.comments = comments;

                    postService.getPost(postId)
                        .then(function (postData) {

                            context.id = postId;
                            context.imageUrl = postData.imageUrl;
                            context.title = postData.title;
                            context.description = postData.description;

                            context.loadPartials({
                                header: './templates/common/header.hbs',
                                footer: './templates/common/footer.hbs',
                                navigation: './templates/common/navigation.hbs',
                                comment: './templates/details/comment.hbs',
                            }).then(function () {
                                this.partial('./templates/details/detailsPage.hbs');
                            })
                        }).catch(auth.handleError);
                }).catch(auth.handleError);
        });

        // POST COMMENT
        this.post('#/comment/:id', function (context) {

            let author = sessionStorage.getItem('username');
            let content = context.params.content;
            let postId = context.params.id;
            
            postService.postComment(author, content, postId)
                .then(function () {
                    auth.showInfo('Comment created.');

                    context.redirect('#/details/' + postId);
                }).catch(auth.handleError);
        });


        // DELETE COMMENT
        this.get('#/delete/:postId/:id', function (context) {
            let commentId = context.params.id;
            let postId = context.params.postId;

            postService.deleteComment(commentId)
                .then(function () {
                    auth.showInfo('Comment delete.');

                    context.redirect('#/details/' + postId);
                }).catch(auth.handleError);
        });


        this.get('#/posts', function (context) {

            context.loggedIn = sessionStorage.getItem('username') !== null;
            context.username = sessionStorage.getItem('username');

            let username = sessionStorage.getItem('username');

            postService.getMyPosts(username)
                .then(function (posts) {

                    let rank = 1;
                    for (let p of posts) {
                        p['rank'] = rank++;
                        p['time'] = calcTime(p['_kmd']['ect']);
                        p['isCreator'] = p['_acl']['creator'] === sessionStorage.getItem('userId');
                    }

                    context.posts = posts;

                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigation: './templates/common/navigation.hbs',
                        post: './templates/catalog/myPost.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/catalogPage.hbs');
                    });
                }).catch(auth.handleError);
        });

        // DELETE ALL POSTS
        this.get('#/delete/:id', function (context) {

            console.log(context);

            let postId = context.params.id;

            postService.deletePost(postId)
                .then(function () {
                    auth.showInfo('Post deleted.');

                    displayAllPosts(context);
                }).catch(auth.handleError);
        });

        // DELETE MY POSTS
        this.get('#/posts/delete/:id', function (context) {

            let postId = context.params.id;

            postService.deletePost(postId)
                .then(function () {
                    auth.showInfo('Post deleted.');

                    context.redirect('#/posts');
                }).catch(auth.handleError);
        });

        // EDITING
        this.get('#/edit/:id', function (context) {

            let postId = context.params.id;

            context.loggedIn = sessionStorage.getItem('username') !== null;
            context.username = sessionStorage.getItem('username');

            postService.getPost(postId)
                .then(function (postData) {

                    context.id = postId;
                    context.url = postData.url;
                    context.title = postData.title;
                    context.imageUrl = postData.imageUrl;
                    context.description = postData.description;

                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigation: './templates/common/navigation.hbs',
                        editForm: './templates/edit/editForm.hbs'
                    }).then(function () {
                        this.partial('./templates/edit/editPage.hbs');
                    });
                }).catch(auth.handleError);
        });

        this.get('#/posts/edit/:id', function (context) {

            let postId = context.params.id;

            context.loggedIn = sessionStorage.getItem('username') !== null;
            context.username = sessionStorage.getItem('username');

            postService.getPost(postId)
                .then(function (postData) {

                    context.id = postId;
                    context.url = postData.url;
                    context.title = postData.title;
                    context.imageUrl = postData.imageUrl;
                    context.description = postData.description;

                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigation: './templates/common/navigation.hbs',
                        editForm: './templates/edit/editFormMyPost.hbs'
                    }).then(function () {
                        this.partial('./templates/edit/editPage.hbs');
                    });
                }).catch(auth.handleError);
        });

        this.post('#/edit/:id', function (context) {

            let id = context.params.id;
            let author = sessionStorage.getItem('username');
            let url = context.params.url;
            let title = context.params.title;
            let imageUrl = context.params.image;
            let description = context.params.description;

            postService.editPost(id, author, title, url, imageUrl, description)
                .then(function (postData) {
                    auth.showInfo(`Post ${postData.title} updated.`);

                    context.redirect('#/catalog');
                }).catch(auth.handleError);
        });

        this.post('#/posts/edit/:id', function (context) {

            let id = context.params.id;
            let author = sessionStorage.getItem('username');
            let url = context.params.url;
            let title = context.params.title;
            let imageUrl = context.params.image;
            let description = context.params.description;

            postService.editPost(id, author, title, url, imageUrl, description)
                .then(function (postData) {
                    auth.showInfo(`Post ${postData.title} updated.`);

                    context.redirect('#/posts');
                }).catch(auth.handleError);

        });

    });


    app.run();
}