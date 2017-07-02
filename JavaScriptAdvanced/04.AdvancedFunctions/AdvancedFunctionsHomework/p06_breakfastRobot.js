function solve() {

    let elements = new Map();
    elements.set('protein', 0);
    elements.set('carbohydrate', 0);
    elements.set('fat', 0);
    elements.set('flavour', 0);

    let products = new Map();
    products.set('apple', { carbohydrate: 1, flavour: 2 });
    products.set('coke', { carbohydrate: 10, flavour: 20 });
    products.set('burger', { carbohydrate: 5, fat: 7, flavour: 3 });
    products.set('omelet', { protein: 5, fat: 1, flavour: 1 });
    products.set('cheverme', { protein: 10, carbohydrate: 10, fat: 10, flavour: 10 });

    return function (input) {
        let tokens = input.split(' ');

        let commandType = tokens[0];
        if (commandType === 'restock') {
            let product = tokens[1];
            let quantity = Number(tokens[2]);

            elements.set(product, elements.get(product) + quantity);
            return ('Success');
        } else if (commandType === 'prepare') {
            let product = tokens[1];
            let quantity = Number(tokens[2]);

            let productAsProduct = products.get(product);
            let neededElements = Object.keys(productAsProduct);
            for (let neededElement of neededElements) {
                let neededQuantity = productAsProduct[neededElement] * quantity;
                if (elements.get(neededElement) < neededQuantity) {
                    return (`Error: not enough ${neededElement} in stock`);
                    break;
                }
            }

            for (let neededElement of neededElements) {
                let neededQuantity = productAsProduct[neededElement] * quantity;
                let current = elements.get(neededElement);
                elements.set(neededElement, current - neededQuantity);
            }

            return ('Success');
        } else if (commandType === 'report') {
            return (`protein=${elements.get('protein')} carbohydrate=${elements.get('carbohydrate')} fat=${elements.get(`fat`)} flavour=${elements.get('flavour')}`);
        }
    }
}

let manager = solve();


/*
 restock flavour 10
 prepare apple 1
 restock fat 10
 prepare burger 1
 report
 */

/*
manager("restock carbohydrate 10"); // Success
manager("restock flavour 10");
manager("prepare apple 1");
manager("restock fat 10");
manager("prepare burger 1");
manager("report");
*/