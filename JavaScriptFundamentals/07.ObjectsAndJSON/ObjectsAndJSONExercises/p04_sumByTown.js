function countByTown(arr) {
    let map = { };

    for (var i = 0; i < arr.length; i += 2) {
        let town = arr[i];
        let population = arr[i + 1];

        if (map[town] == undefined) {
            map[town] = 0;
        }

        map[town] = map[town] + Number(population);

    }

    console.log(JSON.stringify(map));
}


countByTown(['Sofia',
'20',
'Varna',
'3',
'Sofia',
'5',
'Varna',
'4']);