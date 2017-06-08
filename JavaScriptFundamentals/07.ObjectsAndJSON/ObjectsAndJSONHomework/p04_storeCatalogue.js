function catalogue(array) {
    let catalogue = new Map();

    for (let obj of array) {
        let tokens = obj.split(' : ');
        let name = tokens[0];
        let price = +tokens[1];

        let character = name[0];

        if (!catalogue.has(character)) {
            catalogue.set(character, []);
        }

        let json = { };
        json['name'] = name;
        json['price'] = price;

        let current = catalogue.get(character);
        current.push(json);

        catalogue.set(character, current);
    }

    [...catalogue].sort((a, b) => sortAlphabetically(a, b)).forEach(([type, quantity]) => {
        // console.log(quantity['name']);
        // console.log(quantity['price']);
        // let parse = JSON.parse(quantity);
        console.log(type);
        // console.log(quantity);

        quantity.sort(function (a, b) {
            let key1 = a['name'].toLowerCase();
            let key2 = b['name'].toLowerCase();

            if (key1 > key2) return 1;
            if (key2 > key1) return -1;
            return 0;
        }).forEach(e => {
            "use strict";
            console.log(`  ${e['name']}: ${e['price']}`)
        });

        // quantity.sort((a, b) => new function (a, b) {
        // //     console.log(JSON.parse(a));
        // //
        // //     console.log(a['name']);
        // //     console.log(b['name']);
        //     // let s1 = a['name'].toLowerCase();
        //     // let s2 = b['name'].toLowerCase();
        //     //
        //     // if (s1 > s2) return 1;
        //     // if (s2 > s1) return -1;
        //     // return 0;
        // }).forEach(e => {
        //     console.log(`  ${e['name']}: ${e['price']}`)
        // });
        
        // console.log(quantity);
        // console.log(parse)
        // console.log(parse['name']);
        // console.log(parse['price']);
        // console.log(`${type} => ${JSON.stringify(quantity)}`);
    });


    function sortAlphabetically(a, b) {
        let key1 = a[0].toLowerCase();
        let key2 = b[0].toLowerCase();

        if (key1 > key2) return 1;
        if (key2 > key1) return -1;
        return 0;
    }
}

catalogue([
'Appricot : 20.4',
'Fridge : 1500',
'TV : 1499',
'Deodorant : 10',
'Boiler : 300',
'Apple : 1.25',
'Anti-Bug Spray : 15',
'T-Shirt : 10']
);