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

        for (let i = startRow; i < endRow; i++) {
            for (let j = startCol; j < endCol; j++) {
                if (isInMatrix(i, j, matrix)) {
                    matrix[i][j] += templateMatrix[tr][tc];
                }

                tc++;
            }

            tc = 0;
            tr++;
        }

        startCol += templateMatrix[0].length;
        endCol += templateMatrix[0].length;

        if (startCol >= matrix[startRow].length) {
            startRow += length;
            endRow += length;
            startCol = 0;
            endCol =  templateMatrix[0].length;
            if (startRow >= matrix.length) {
                break;
            }
        }
    }


    let result = '';
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let currentSymbol = matrix[i][j] % 27;
            matrix[i][j] = matrix[i][j] % 27;
            if (currentSymbol == 0) {
                result += ' ';
            } else {
                result += String.fromCharCode(64 + currentSymbol);
            }
        }
    }

    // console.log(matrix);

    console.log(result);

    function isInMatrix(row, col, matrix) {
        return row >= 0 && row < matrix.length && col >= 0 && col < matrix[row].length;
    }

}
