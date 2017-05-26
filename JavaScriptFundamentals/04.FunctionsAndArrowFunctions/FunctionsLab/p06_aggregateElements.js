function aggregate(arr) {

    function aggregation(numbers, start, func) {
        for (let obj of numbers) {
            start = func(start, obj);
        }

        return start;
    }


    console.log(aggregation(arr, 0, (a, b) => a + b));
    console.log(aggregation(arr, 0, (a, b) => a + 1 / b));
    console.log(aggregation(arr, '', (a, b) => a + b));

}

aggregate([1, 2, 3]);


