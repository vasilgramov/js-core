function components(array) {
    let map = new Map();

    for (let obj of array) {
        let tokens = obj.split(' | ');
        let systemName = tokens[0];
        let componentName = tokens[1];
        let subComponent = tokens[2];

        if (!map.has(systemName)) {
            map.set(systemName, new Map());
        }

        if (!map.get(systemName).has(componentName)) {
            map.get(systemName).set(componentName, []);
        }

        let current = map.get(systemName).get(componentName);
        current.push(subComponent);
        map.get(systemName).set(componentName, current);
    }

    [...map].sort((a, b) => mySort(a, b)).forEach(([key, value]) => {
        console.log(key);
        [...value].sort(function (a, b) {
            let length1 = a[1].length;
            let length2 = b[1].length;

            return length2 - length1;
        }).forEach(([coponenet, subcomponents]) => {
            console.log('|||' + coponenet);
            for (let components of subcomponents) {
                console.log('||||||' + components);
            }
        });
    });
    

    function mySort(a, b) {
        let key1 = a[0];
        let key2 = b[0];

        let value1 = a[1];
        let value2 = b[1];

        value1 = [...value1].length;
        value2 = [...value2].length;

        if (value1 > value2) return -1;
        if (value2 > value1) return 1;
        if (key1 > key2) return 1;
        if (key2 > key1) return -1;

        return 0;
    }
}


components([
'SULS | Main Site | Home Page',
'SULS | Main Site | Login Page',
'SULS | Main Site | Register Page',
'SULS | Judge Site | Login Page',
'SULS | Judge Site | Submittion Page',
'Lambda | CoreA | A23',
'SULS | Digital Site | Login Page',
'Lambda | CoreB | B24',
'Lambda | CoreA | A24',
'Lambda | CoreA | A25',
'Lambda | CoreC | C4',
'Indice | Session | Default Storage',
'Indice | Session | Default Security']
);