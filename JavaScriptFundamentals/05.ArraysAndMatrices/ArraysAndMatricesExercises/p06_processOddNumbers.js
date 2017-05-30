function process(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (i % 2 == 1) {
            console.log(arr[i] * 2);
        }
    }
}

process([10, 15, 20, 25]);