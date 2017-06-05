function capitalize(words) {
    words = words.replace(/\w+/g, replaceWithUppercase);

    console.log(words);

    function replaceWithUppercase(word) {
        word = word.toLowerCase();
        let first = word[0].toUpperCase();
        word = first + word.substring(1);

        return word;
    }
}