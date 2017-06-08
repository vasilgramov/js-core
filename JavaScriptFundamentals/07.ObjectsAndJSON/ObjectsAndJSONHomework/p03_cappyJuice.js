function juices(array) {
    let map = new Map();

    let result = new Map();

    for (let juice of array) {
        let tokens = juice.split(' => ');
        let type = tokens[0];
        let quantity = +tokens[1];

        if (!map.has(type)) {
            map.set(type, 0);
        }

        map.set(type, map.get(type) + quantity);

        if (map.get(type) >= 1000) {
            if (!result.has(type)) {
                result.set(type, 0);
            }

            let bottles = Math.floor(map.get(type) / 1000);
            map.set(type, map.get(type) - (bottles * 1000));

            result.set(type, result.get(type) + bottles);
        }
    }

    [...result].forEach(([type, quantity]) => {
        console.log(`${type} => ${quantity}`);
    });
}

juices([
'Orange => 2000',
'Peach => 1432',
'Banana => 450',
'Peach => 600',
'Strawberry => 549']
);