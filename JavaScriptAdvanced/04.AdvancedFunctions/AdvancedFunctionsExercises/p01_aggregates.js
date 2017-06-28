function aggregate(array) {

    console.log(`Sum = ${reduce(array, (a, b) => a + b)}`);
    console.log(`Min = ${reduce(array, (a, b) => a <= b ? a : b)}`);
    console.log(`Max = ${reduce(array, (a, b) => a <= b ? b : a)}`);
    console.log(`Product = ${reduce(array, (a, b) => a * b)}`);
    console.log(`Join = ${reduce(array, (a, b) => '' + a + b)}`);

    function reduce(array, func) {
        let result = array[0];
        for (let i = 1; i < array.length; i++) {
            result = func(result, array[i]);
        }

        return result;
    }
}

aggregate([2,3,10,5]);