function catStudio(array) {
    let map = new Map();

    for (let car of array) {
        let tokens = car.split(' | ');
        let brand = tokens[0];
        let model = tokens[1];
        let produced = +tokens[2];

        if (!map.has(brand)) {
            map.set(brand, new Map());
        }

        if (!map.get(brand).has(model)) {
            map.get(brand).set(model, 0);
        }

        let current = map.get(brand).get(model);
        map.get(brand).set(model, current + produced);
    }

    [...map].forEach(([brand, modelProduced]) => {
        console.log(brand);
        [...modelProduced].forEach(([model, produced]) => {
            console.log(`###${model} -> ${produced}`)
        });
    });
}