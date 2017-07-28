function loadCommits() {

    let username = $('#username').val();
    let repository = $('#repo').val();

    let list = $('#commits');
    list.empty();

    let req = {
        url: `https://api.github.com/repos/${username}/${repository}/commits`,
        method: 'GET',
        success: displayCommitMessages,
        error: displayError,
        complete: () => function () {
            $('#username').val('');
            $('#repo').val('');
        }
    };
    
    $.ajax(req);

    function displayCommitMessages(data) {

        for (let commit of data) {
            $('<li>').text(commit.commit.author.name + ": " + commit.commit.message)
                .appendTo(list);
        }
    }
    
    function displayError(error) {
        list.empty();
        list.append($('<li>Error: 404 (Not Found)</li>'));
    }
}