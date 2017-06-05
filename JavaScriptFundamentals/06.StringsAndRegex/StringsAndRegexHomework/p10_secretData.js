function secretDataRegex(input) {
    let regexName = /\*[A-Z][A-Za-z]*(?=\s|$)/g;
    let regexPhone = /\+[0-9-]{10}(?=\s|$)/g;
    let regexId = /![a-zA-Z0-9]+(?=\s|\t|$)/g;
    let regexBase = /_[0-9A-Za-z]+(?=\s|$)/g;

    for (let line of input) {
        console.log(line
            .replace(regexName, replacer)
            .replace(regexPhone, replacer)
            .replace(regexId, replacer)
            .replace(regexBase, replacer)
        )
    }

    function replacer(match) {
        return '|'.repeat(match.length);
    }
}