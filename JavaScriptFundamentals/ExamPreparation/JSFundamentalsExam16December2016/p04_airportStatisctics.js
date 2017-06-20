function solve(array) {
    let length = Number(array.shift());

    let templateMatrix = [];
    for (let i = 0; i < length; i++) {
        templateMatrix.push(array.shift().split(' ').map(e => Number(e)));
    }

    let matrix = [];
    for (let i = 0; i < array.length; i++) {
        matrix.push(array[i].split(' ').map(e => Number(e)));
    }

    let startRow = 0;
    let startCol = 0;
    let endRow = length;
    let endCol = templateMatrix[0].length;

    while (1 != 0) {
        let tr = 0;
        let tc = 0;
        let hasFound = false;

        for (let i = startRow; i < endRow; i++) {
            for (let j = startCol; j < endCol; j++) {
                if (isInMatrix(i, j, matrix)) {
                    matrix[i][j] += templateMatrix[tr][tc];
                    hasFound = true;
                }

                tc++;
            }

            tc = 0;
            tr++;
        }

        startCol += length;
        endCol += templateMatrix[0].length;

        if (startCol >= matrix[startRow].length) {
            startRow += length;
            endRow += length;
            startCol = 0;
            endCol = length;
            if (startRow >= matrix.length) {
                break;
            }
        }
    }

    let result = '';
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let currentSymbol = matrix[i][j] % 27;
            if (currentSymbol == 0) {
                result += ' ';
            } else {
                result += String.fromCharCode(64 + currentSymbol);
            }
        }
    }

    console.log(result);

    function isInMatrix(row, col, matrix) {
        return row >= 0 && row < matrix.length && col >= 0 && col < matrix[row].length;
    }

}

solve([
    '1',
    '1 3 13',
    '12 22 14 13 25 0 4 24 23',
    '18 24 2 25 22 0 0 11 18',
    '8 25 6 26 8 23 13 4 14',
    '14 3 14 10 6 1 6 16 14',
    '11 12 2 10 24 2 13 24 0',
    '24 24 10 14 15 25 18 24 12',
    '4 24 0 8 4 22 19 22 14',
    '0 11 18 26 1 19 18 13 15',
    '8 15 14 26 24 14 26 24 14'
])


