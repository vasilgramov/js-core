function solve(array) {
    let matrix = [];

    for (let i = 0; i < array.length - 1; i++) {
        let currentRow = array[i].split(' ').map(e => Number(e));
        matrix.push(currentRow);
    }

    let sum = 0;
    let coords = array.pop().split(' ');
    for (let obj of coords) {
        let split = obj.split(',');
        let row = Number(split[0]);
        let col = Number(split[1]);

        if (isInMatrix(matrix, row, col) && matrix[row][col] > 0) {
            let currentDamage = matrix[row][col];
            sum += currentDamage;
            matrix[row][col] = 0;

            for (let i = row - 1; i < row + 1; i++) {
                for (let j = col - 1; j < col + 1; j++) {
                    if (isInMatrix(matrix, i, j)) {
                        matrix[i][j] -= currentDamage;
                    }
                }
            }
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[row].length; j++) {
            if (matrix[i][j] > 0) {
                sum += matrix[i][j];
            }
        }
    }

    return sum;

    function isInMatrix(matrix, row, col) {
        return row >= 0 && row < matrix.length && col >= 0 && col < matrix[row].length;
    }
}