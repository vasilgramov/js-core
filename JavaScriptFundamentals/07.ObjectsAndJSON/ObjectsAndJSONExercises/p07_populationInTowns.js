function countPopulation(arr) {
    let map = new Map();

    for (let obj of arr) {
        let tokens = obj.split(' <-> ');
        let town = tokens[0];
        let population = tokens[1];

        if (!map.has(town)) {
            map.set(town, 0);
        }

        map.set(town, map.get(town) + Number(population));
    }

    for (let obj of map) {
        console.log(`${obj[0]} : ${obj[1]}`);
    }
}