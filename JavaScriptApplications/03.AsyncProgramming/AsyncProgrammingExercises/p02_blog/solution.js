function attachEvents() {
    console.log('started');

    const baseUrl = 'https://baas.kinvey.com/appdata/kid_ByshmGtIb/';
    const username = 'Vladix';
    const password = '1234';

    const select = $('#posts');

    $('#btnLoadPosts').click(loadPosts);
    $('#btnViewPost').click(viewPost);


    function loadPosts() {
        let req = {
            url: baseUrl + 'posts',
            method: 'GET',
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            success: displayPosts,
            error: displayError
        };

        $.ajax(req);
    }
    function displayPosts(data) {
        for (let post of data) {
            $('<option>').val(post._id).text(post.title)
                .appendTo(select);
        }
    }

    function viewPost() {
        let selected = select.find(':selected').val();
        // ?query={"post_id":"id"}

        let req = {
            url: baseUrl + `comments/?query={"post_id":"${selected}"}`,
            method: 'GET',
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            success: () => { displayComments(); displayTitleBody(selected) },
            error: displayError
        };

        $.ajax(req);
    }

    function displayComments(data) {

    }

    function displayTitleBody(id) {

    }

    
    function displayError() {
        // TODO:
        console.log('ERROR');
    }
}