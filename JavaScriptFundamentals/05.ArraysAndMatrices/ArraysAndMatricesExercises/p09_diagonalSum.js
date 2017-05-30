function getDiagonalSum(matrix) {

    let left = calcLeftDiagonal(matrix);
    let right = calcRightDiagonal(matrix);

    console.log(left + ' ' + right);

    function calcLeftDiagonal(matrix) {
        let sum = 0;

        for (let i = 0; i < matrix.length; i++) {
            sum += matrix[i][i];
        }

        return sum;
    }

    function calcRightDiagonal(matrix) {
        let sum = 0;

        let rowIndex = 0;
        for (let i = matrix.length - 1; i >= 0; i--) {
            sum += matrix[rowIndex++][i];
        }

        return sum;
    }
}

getDiagonalSum([[20, 40],
    [10, 60]]);
