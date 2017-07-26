function loadRepos() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            document.getElementById("res").textContent = req.responseText;
        }
    };

    req.open("GET", "https://api.github.com/users/testnakov/repos", true);
    req.send();
}