function townsToJson(arr) {
    let keys = arr.shift().split(/\s*\|\s*/).filter(e => e !== "");

    let jsons = [];

    for (let obj of arr) {
        let values = obj.split(/\s*\|\s*/).filter(e => e !== "");

        let json = { };
        for (var i = 0; i < values.length; i++) {
            let keyToken = keys[i].trim();
            let value = values[i].trim();

            if (/\d+/.test(value)) {
                value = +value;
            }

            json[keyToken] = value;
        }

        jsons.push(json);
    }

    return JSON.stringify(jsons);
}

console.log(townsToJson(['| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |']));