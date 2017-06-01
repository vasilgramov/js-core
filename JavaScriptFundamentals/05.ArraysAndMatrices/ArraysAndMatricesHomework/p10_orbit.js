function orbit(input) {
    let width = input[0];
    let height = input[1];
    let x = input[2];
    let y = input[3];

    let matrix = [];
    for (let i = 0; i < height; i++) {
        matrix.push('0'.repeat(width).split('').map(Number));
    }

    let startX = x;
    let endX = x;

    let startY = y;
    let endY = y;

    matrix[x][y] = 1;

    let index = 2;
    let help = 1;
    while (true) {
        let hasFound = false;

        for (let i = startX - help; i <= endX + help; i++) {
            for (let j = startY - help; j <= endY + help; j++) {
                if (isInMatrix(matrix, i, j) && matrix[i][j] === 0) {
                    matrix[i][j] = index;
                    hasFound = true;
                }
            }
        }

        if (!hasFound) {
            break;
        }

        help++;
        index++;
    }

    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(' '));
    }


    function isInMatrix(matrix, row, col) {
        return row >= 0 && row < matrix.length && col >= 0 && col < matrix[row].length;
    }
}

orbit([4, 4, 0, 0]);