let productService = (() => {
    
    function getAllProducts() {
        return requester.get('appdata', 'products', 'kinvey');
    }

    function getUser() {
        return requester.get('user', sessionStorage.getItem('userId'), 'kinvey');
    }

    function getProductById(id) {
        return requester.get('appdata', 'products/' + id, 'kinvey');
    }

    function updateUser(userInfo) {
        return requester.update('user', sessionStorage.getItem('userId'), 'kinvey', userInfo);
    }



    return {
        getAllProducts,
        getUser,
        getProductById,
        updateUser,
    }
})();