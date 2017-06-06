function cityMarket(array) {
    let map = new Map();

    for (let obj of array) {
        let tokens = obj.split(' -> ');
        let town = tokens[0];
        let product = tokens[1];
        let price = tokens[2].split(' : ').reduce((a, b) => a * b);

        if (!map.has(town)) {
            map.set(town, new Map());
        }

        if (!map.get(town).has(product)) {
            map.get(town).set(product, 0);
        }

        map.get(town).set(product, price + map.get(town).get(product));
    }

    [...map].forEach(([town, product]) => {
        console.log(`Town - ${town}`);
        [...product].forEach(([productName, price]) => {
            console.log(`$$$${productName} : ${price}`);
        })
    });
}

cityMarket([
'Sofia -> Laptops HP -> 200 : 2000',
'Sofia -> Raspberry -> 200000 : 1500',
'Sofia -> Audi Q7 -> 200 : 100000',
'Montana -> Portokals -> 200000 : 1',
'Montana -> Qgodas -> 20000 : 0.2',
'Montana -> Chereshas -> 1000 : 0.3']
);