function solve(input) {
    let row = input.length;
    let matrix = [];

    for (let i = 0; i < row; i++) {
        let symbols = input[i];
        matrix.push(symbols.split(/\s+/).map(Number));

    }

    let left = 0;
    for (let i = 0; i < matrix.length; i++) {
        left += matrix[i][i];
    }

    let right = 0;
    let index = 0;
    let indexes = [];
    for (let i = matrix.length - 1; i >= 0; i--) {
        right += matrix[i][index];
        indexes.push(matrix[i][index]);
        index++;
    }


    if (right == left) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (i != j) {
                    matrix[i][j] = right;
                }
            }
        }

        index = 0;
        for (let i = matrix.length - 1; i >= 0; i--) {
            matrix[i][index] = indexes[index];

            index++;
        }
    }



    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(' '));
    }
}

solve(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1']);