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
        this.get('market.html', displayHome);
        this.get('#/home', displayHome);

        function displayHome(context) {

            context.isAnonymous = sessionStorage.getItem('username') === null;
            context.username = sessionStorage.getItem('username');

            context.loadPartials({
                footer: './templates/common/footer.hbs',
                header: './templates/common/header.hbs',
                home: './templates/home/home.hbs'
            }).then(function () {
                this.partial('./templates/home/homePage.hbs');
            });
        }

        // LOGIN
        this.get('#/login', function (context) {

            context.isAnonymous = sessionStorage.getItem('username') === null;
            context.username = sessionStorage.getItem('username');

            context.loadPartials({
                footer: './templates/common/footer.hbs',
                header: './templates/common/header.hbs',
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
                    auth.showInfo('Login successful.');

                    displayHome(context);
                }).catch(auth.handleError);
        });

        // REGISTER
        this.get('#/register', function (context) {

            context.isAnonymous = sessionStorage.getItem('username') === null;
            context.username = sessionStorage.getItem('username');

            context.loadPartials({
                footer: './templates/common/footer.hbs',
                header: './templates/common/header.hbs',
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
                    auth.showInfo('User registration successful.');

                    displayHome(context);
                }).catch(auth.handleError);
        });

        // LOGOUT
        this.get('#/logout', function (context) {

            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo('Logout successful.');

                    displayHome(context);
                }).catch(auth.handleError);
        });

        // SHOP
        this.get('#/shop', function (context) {

            context.isAnonymous = sessionStorage.getItem('username') === null;
            context.username = sessionStorage.getItem('username');

            productService.getAllProducts()
                .then(function (products) {

                    for (let p of products) {
                        p['price'] = Number(p['price']).toFixed(2);
                        p['this'] = p;
                    }

                    context.products = products;

                    context.loadPartials({
                        footer: './templates/common/footer.hbs',
                        header: './templates/common/header.hbs',
                        product: './templates/shop/product.hbs'
                    }).then(function () {
                        this.partial('./templates/shop/shopPage.hbs')
                            .then(function () {
                                $('button').click(function () {
                                    let productId = $(this).attr('data-id');
                                    purchaseProduct(productId);
                                });
                            });
                    });
                }).catch(auth.handleError);

            function purchaseProduct(productId) {
                productService.getProductById(productId)
                    .then(function (product) {
                        productService.getUser()
                            .then(function (userInfo) {
                                userInfo.cart = userInfo.cart || {};

                                if (userInfo.cart.hasOwnProperty(product._id)) {
                                    userInfo.cart[product._id].quantity =
                                        Number(userInfo.cart[product._id].quantity) + 1;
                                } else {
                                    userInfo.cart[product._id] = {
                                        quantity: 1,
                                        product: {
                                            name: product.name,
                                            description: product.description,
                                            price: product.price
                                        }
                                    }
                                }

                                productService.updateUser(userInfo)
                                    .then(function (userInfo) {
                                        auth.showInfo('Product added!');
                                    }).catch(auth.handleError);
                            }).catch(auth.handleError);
                    }).catch(auth.handleError);
            }
        });



        // CART
        this.get('#/cart', displayCart);

        function displayCart (context) {

            context.isAnonymous = sessionStorage.getItem('username') === null;
            context.username = sessionStorage.getItem('username');

            productService.getUser()
                .then(function (userInfo) {

                    let products = [];

                    let cart = userInfo.cart;
                    let keys = Object.keys(cart);
                    for (let k of keys) {
                        products.push({
                            name: cart[k]['product']['name'],
                            description: cart[k]['product']['description'],
                            quantity: Number(cart[k]['quantity']),
                            totalPrice: (Number(cart[k]['quantity']) * Number(cart[k]['product']['price'])).toFixed(2),
                            id: k
                        });
                    }

                    context.products = products;

                    context.loadPartials({
                        footer: './templates/common/footer.hbs',
                        header: './templates/common/header.hbs',
                        product: './templates/cart/product.hbs'
                    }).then(function () {
                        this.partial('./templates/cart/cartPage.hbs')
                            .then(function () {
                                $('button').click(function () {
                                    let productId = $(this).attr('data-id');
                                    discardProduct(productId);
                                });
                            });
                    });
                }).catch(auth.handleError);

            function discardProduct(productId) {

                productService.getUser()
                    .then(function (userInfo) {
                        let cart = userInfo['cart'];

                        cart[productId]['quantity']--;
                        if (Number(cart[productId]['quantity']) === 0) {
                            delete cart[productId];
                        }

                        userInfo['cart'] = cart;
                        productService.updateUser(userInfo)
                            .then(function () {
                                displayCart(context);
                            }).catch(auth.handleError);
                    }).catch(auth.handleError);
            }
        }
    });

    app.run();
}