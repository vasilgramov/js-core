function solve(array) {

    let map = new Map();

    for (let line of array) {
        let tokens = line.split('|');

        let color = tokens[0];
        let arg1 = tokens[1];
        let arg2 =tokens[2];


        if (!map.has(color)) {
            map.set(color, { });
        }

        let current = map.get(color);
        current["color"] = color;

        if (current["wins"] === undefined) {
            current["wins"] = 1;
        }

        if (current["losses"] === undefined) {
            current["losses"] = 1;
        }

        if (current["opponents"] === undefined) {
            current["opponents"] = [];
        }

        if (current["opponents"] === undefined) {
            current["opponents"] = [];
        }

        if (arg1 === 'age') {
            current["age"] = arg2;
        } else if (arg1 === 'win') {
            current["opponents"].push(arg2);
            current["wins"]++;
        } else if (arg1 === 'loss') {
            current["opponents"].push(arg2);
            current["losses"]++;
        } else {                    // names
            current["name"] = arg2;
        }

        map.set(color, current);
    }

    let result = "{";
    [...map].sort().forEach(([color, entry]) => {

        if (entry["name"] !== undefined && entry["age"] !== undefined) {
            let rank = (entry["wins"] / entry["losses"]).toFixed(2);

            let opponents = entry["opponents"].sort();
            let opponentsToPrint = '[';
            for (let i = 0; i < opponents.length; i++) {
                opponentsToPrint += `"${opponents[i]}"`;

                if (i !== opponents.length - 1) {
                    opponentsToPrint += ',';
                }
            }
            opponentsToPrint += ']';

            result += `"${color}":{"age":"${entry["age"]}","name":"${entry["name"]}","opponents":${opponentsToPrint},"rank":"${rank}"}`;

            result += ',';
        }
    });

    result += "}";
    if (result.lastIndexOf(',') === result.length - 2) {
        result = result.substring(0, result.length - 2) + result.substring(result.length - 1);
    }

    console.log(result);
}

solve([
    'red|name|kiko',
    'red|win|dsad',
    'blue|age|12',
    'green|age|13',
    'green|win|gosho'
]);
