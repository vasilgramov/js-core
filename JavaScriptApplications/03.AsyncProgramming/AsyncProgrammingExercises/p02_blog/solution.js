function attachEvents() {

    const baseUrl = 'https://baas.kinvey.com/appdata/kid_ByshmGtIb/';
    const username = 'Vladix';
    const password = '1234';

    const titlesSelect = $('#posts');
    const postTitle = $('#post-title');
    const postBody = $('#post-body');
    const commentsList = $('#post-comments');


    $('#btnLoadPosts').click(loadPosts);
    $('#btnViewPost').click(viewPost);

    function loadPosts() {
        titlesSelect.empty()


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
                .appendTo(titlesSelect);
        }
    }

    function viewPost() {
        postBody.empty();
        commentsList.empty();

        let selected = titlesSelect.find(':selected').val();

        displayTitleBody(selected);

        let req = {
            url: baseUrl + `comments/?query={"post_id":"${selected}"}`,
            method: 'GET',
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            success: displayComments,
            error: displayError
        };

        $.ajax(req);
    }

    function displayComments(data) {
        for (let comment of data) {
            commentsList.append($('<li>').text(comment.text));
        }
    }

    function displayTitleBody(id) {
        let req = {
            url: baseUrl + 'posts/' + id,
            method: 'GET',
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            success: (data) => {
                postTitle.text(data.title);
                postBody.text(data.body);
            },
            error: displayError
        };

        $.ajax(req);
    }

    function displayError(err) {
        let errorDiv = $("<div>").text("Error: " + err.status + ' (' + err.statusText + ')');
        $(document.body).prepend(errorDiv);
    }
}