function solve(input) {
    let open = input.indexOf('(');

    let result = [];
    while (open !== -1) {
        let end = input.indexOf(')', open + 1);
        if (end === -1) break;

        let text = input.substring(open + 1, end);
        result.push(text);

        open = input.indexOf('(', end + 1);
    }

    console.log(result.join(', '));
}

solve('Rakiya (Bulgarian brandy) is self-made liquor (alcoholic drink)');