function rounding([num, precision]) {
    if (precision > 15) {
        precision = 15;
    }

    console.log(Number(num.toFixed(precision)));
}

