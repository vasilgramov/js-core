function extractText() {
    let result = [];
    let children = $('#items')[0].children;
    for (let i = 0; i < children.length; i++) {
        result.push(children[i].textContent);
    }

    $('#result').text(result.join(", "));
}