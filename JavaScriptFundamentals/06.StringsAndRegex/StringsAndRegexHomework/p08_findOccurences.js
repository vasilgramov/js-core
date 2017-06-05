function count(string, word) {
    var regexExpression = "\\b(" + word + ")\\b";

    console.log(regexExpression);
    var regex = new RegExp(regexExpression, "ig");

    let count = 0;
    let match;
    while (match = regex.exec(string)) {
        count++;
    }

    console.log(count);
}
count();