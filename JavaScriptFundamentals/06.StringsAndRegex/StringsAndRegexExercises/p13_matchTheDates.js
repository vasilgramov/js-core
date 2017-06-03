function solve(input) {
    let pattern = /\b(\d{1,2})-([A-Z][a-z]{2})-(\d{4})\b/g;

    for (let text of input) {
        let match;
        while (match = pattern.exec(text)) {
            console.log(`${match[0]} (Day: ${match[1]}, Month: ${match[2]}, Year: ${match[3]})`);
        }
    }
}