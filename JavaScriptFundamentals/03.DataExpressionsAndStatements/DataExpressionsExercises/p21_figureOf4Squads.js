function draw(n) {
    let height = n;
    if (n % 2 == 0) {
        height--;
    }
    let width = n * 2 - 1;

    let result = '';
    for (let i = 0; i < height; i++) {

        if (i == 0 || i == height - 1 || i == Math.floor(height / 2)) {
            result += '+';

            for (let j = 1; j < width - 1; j++) {
                if (j == n - 1) {
                    result += '+';
                } else {
                    result += '-';
                }
            }

            result += '+\n';
        } else {
            result += '|';

            for (let j = 1; j < width - 1; j++) {
                if (j == n - 1) {
                    result += '|';
                } else {
                    result += ' ';
                }
            }

            result += '|\n';
        }
    }

    console.log(result);
}

