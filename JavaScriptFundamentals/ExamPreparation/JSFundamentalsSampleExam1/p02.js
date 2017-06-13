function solve(array) {
    let matrix = [];

    for (let obj of array) {
        let row = obj.split('');
        matrix.push(row);
    }

    let indeces = [];
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            let currentSymbol = matrix[row][col].toLowerCase();

            if (isInMatrix(matrix, row + 1, col + 1) &&
                isInMatrix(matrix, row - 1, col - 1) &&
                isInMatrix(matrix, row + 1, col - 1) &&
                isInMatrix(matrix, row - 1, col + 1) &&
                currentSymbol === matrix[row + 1][col + 1].toLowerCase() &&
                currentSymbol === matrix[row - 1][col - 1].toLowerCase() &&
                currentSymbol === matrix[row + 1][col - 1].toLowerCase() &&
                currentSymbol === matrix[row - 1][col + 1].toLowerCase()) {
                indeces.push([row, col]);
                indeces.push([row + 1, col + 1]);
                indeces.push([row - 1, col - 1]);
                indeces.push([row + 1, col - 1]);
                indeces.push([row - 1, col + 1]);
            }
        }
    }

    function isInMatrix(matrix, row, col) {
        return row >= 0 && row < matrix.length && col >= 0 && col < matrix[row].length;
    }

    for (let obj of indeces) {
        let row = obj[0];
        let col = obj[1];

        matrix[row][col] = '';
    }

    for (let row = 0; row < matrix.length; row++) {
        console.log(matrix[row].join(''));
    }
}

solve([
    'abnbjs',
    'xoBab',
    'Abmbh',
    'aabab',
    'ababvvvv'
]);