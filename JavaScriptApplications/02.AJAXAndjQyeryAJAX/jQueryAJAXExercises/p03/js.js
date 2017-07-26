function loadRepos() {
    let username = $('#username').val();
    let toAppend = $('#repos');

    let req = {
        url: `https://api.github.com/users/${username}/repos`,
        success: displayRepos,
        error: error
    };

    $.ajax(req);

    function displayRepos(repos) {
        toAppend.empty();

        for (let repo of repos) {
            let href = repo.html_url;
            let fullName = repo.full_name;

            let a = $('<a>').attr('href', href).text(fullName);
            toAppend
                .append($('<li>')
                    .append(a));
        }
    }

    function error(error) {
        toAppend.empty();
        toAppend.append($("<li>Error</li>"));
    }
}