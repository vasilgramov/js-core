function multiplicatoin(input) {
    let regex = /(\-?\d+)\s*\*\s*(\-?\d+(?:\.\d+)?)/;

    let match = regex.exec(input);
    while (match !== null) {
        let firstN = +match[1];
        let secondN = +match[2];
        let result = firstN * secondN;
        input = input.replace(regex, result);

        match = regex.exec(input);
    }

    console.log(input);
}
