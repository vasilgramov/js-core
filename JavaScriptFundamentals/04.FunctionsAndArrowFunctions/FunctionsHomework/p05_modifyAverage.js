function modifyNumber(n) {

    let avg = calcAverage(n);
    while (avg <= 5) {
        n += '9';
        avg = calcAverage(n);
    }

    console.log(n);

    function calcAverage(num) {
        let sum = 0;
        num = num + '';
        for (let i = 0; i < num.length; i++) {
            sum += Number(num[i]);
        }

        return sum / num.length;
    }
}

modifyNumber(101);