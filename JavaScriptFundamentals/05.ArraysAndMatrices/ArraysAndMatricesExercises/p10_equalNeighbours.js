function getNumberOfEqualsNeighbours(matrix) {
    let count = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (isInMatrix(matrix, i, j + 1) && matrix[i][j] === matrix[i][j + 1]) {
                count++;
            }

            if (isInMatrix(matrix, i + 1, j) && matrix[i][j] === matrix[i + 1][j]) {
                count++;
            }

        }
    }

    function isInMatrix(matrix, row, col) {
        return row >= 0 && row < matrix.length && col >= 0 && col < matrix[row].length;
    }

    console.log(count);
}

getNumberOfEqualsNeighbours([[2, 2, 5, 7, 4],
                             [4, 0, 5, 3, 4],
                             [2, 5, 5, 4, 2]]);