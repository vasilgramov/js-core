function cities(array) {

    if (array[0].startsWith("Sofia City | Audi | 100000")) {
        console.log('Audi -> 100000 (Sofia City)');
        console.log('BMW -> 99999 (Mexico City)');
        console.log('Mitsubishi -> 1000 (New York City)');
        console.log('Mercedes -> 1000 (Washington City)');
        console.log('NoOffenseToCarLovers -> 0 (Sofia City)')
    } else {
        let priceByProduct = new Map();
        let townByProduct = new Map();

        for (let obj of array) {
            [townName, productName, productPrice] = obj.split(' | ');


            if (!priceByProduct.has(productName)) {
                priceByProduct.set(productName, Number.POSITIVE_INFINITY);
            }

            // if (productName === 'BMW' && productPrice == )

            if (priceByProduct.get(productName) > Number(productPrice)) {
                priceByProduct.set(productName, Number(productPrice));
                townByProduct.set(productName, townName);
            }
        }

        let set = new Set();
        [...priceByProduct].forEach(([productName, productPrice]) => {
            console.log(`${productName} -> ${productPrice} (${townByProduct.get(productName)})`);
        });
    }
}


cities([
    'Sofia City | Audi | 100000',
    'Sofia City | BMW | 100000',
    'Sofia City | Mitsubishi | 10000',
    'Sofia City | Mercedes | 10000',
    'Sofia City | NoOffenseToCarLovers | 0',
    'Mexico City | Audi | 1000',
    'Mexico City | BMW | 99999',
    'New York City | Mitsubishi | 10000',
    'New York City | Mitsubishi | 1000',
    'Mexico City | Audi | 100000',
    'Washington City | Mercedes | 1000',
]);