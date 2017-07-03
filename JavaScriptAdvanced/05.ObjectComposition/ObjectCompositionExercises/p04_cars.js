function solve(array) {
    let carManager = (() => {
        let cars = new Map();

        return {
            create: function (name) {
                cars.set(name, { });
            },
            inherit: function (name, parentName) {
                let parent = cars.get(parentName);
                let child = Object.create(parent);
                cars.set(name, child);
            },
            set: function (name, property, value) {
                let obj = cars.get(name);
                obj[property] = value;
            },
            print: function (name) {
                let obj = cars.get(name);
                let properties = [];
                for (let prop in obj) {
                    let kvp = `${prop}:${obj[prop]}`;
                    properties.push(kvp);
                }

                console.log(properties.join(', '));
            }
        }
    })();

    for (let command of array) {
        let tokens = command.split(' ');
        let commandType = tokens[0];
        let target = tokens[1];
        if (tokens.length === 2) {
            switch (commandType) {
                case 'create':
                    carManager['create'](target);
                    break;
                case 'print':
                    carManager['print'](target);
                    break;
            }
        } else {
            if (commandType === 'create') {
                let parentName = tokens[3];
                carManager['inherit'](target, parentName);
            } else if (commandType === 'set') {
                let propertyType = tokens[2];
                let propertyValue = tokens[3];

                carManager['set'](target, propertyType, propertyValue);
            }
        }
    }
}

solve(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']);