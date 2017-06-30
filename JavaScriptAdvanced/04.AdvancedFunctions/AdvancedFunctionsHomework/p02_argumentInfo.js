function solve() {

    let statistic = new Map();

    for (let i = 0; i < arguments.length; i++) {
        let obj = arguments[i];
        let type = typeof arguments[i];

        console.log(type + ": " + obj);

        if (!statistic.has(type)) {
            statistic.set(type, 0);
        }

        let current = statistic.get(type);
        statistic.set(type, current + 1);
    }

    [...statistic].sort((a, b) => {
        return b[1] - a[1];
    }).forEach(e => {
        console.log(e[0] + " = " + e[1]);
    });
}

solve('cat', 42, function () { console.log('Hello world!'); });