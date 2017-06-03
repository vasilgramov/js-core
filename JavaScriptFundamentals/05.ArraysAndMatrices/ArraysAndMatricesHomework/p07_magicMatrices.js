function checkIfMagic(matrix) {
    let arr = new Set();

    for (let row = 0; row < matrix.length; row++) {
        let sum = 0;
        for (let col = 0; col < matrix[row].length; col++) {
            sum += matrix[row][col];
        }

        arr.add(sum);
    }

    let index = 0;
    for (let col = 0; index < matrix.length && col < matrix[index++].length; col++) {
        let sum = 0;
        for (let row = 0; row < matrix.length; row++) {
            sum += matrix[row][col];
        }

        arr.add(sum);
    }

    for (let i = 0; i < arr.length; i++) {
        let current = arr[i];
        for (let j = 0; j < arr.length; j++) {
            let current1 = arr[j];

            if (i != j && current != current1) {
                console.log('false');
                return;
            }
        }
    }
}

checkIfMagic([[4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]]);
