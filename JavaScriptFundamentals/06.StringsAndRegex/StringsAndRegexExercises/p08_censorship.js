function censor(text, bannedWords) {
    for (let obj of bannedWords) {
        while (text.indexOf(obj) !== -1) {
            text = text.replace(obj, '-'.repeat(obj.length));
        }
    }

    console.log(text);
}