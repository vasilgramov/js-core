function sortArray(arr) {

    arr.sort(function (a, b) {
        let byLength1 = a.length;
        let byLength2 = b.length;

        let byAlpha1 = a.toLowerCase();
        let byAlpha2 = b.toLowerCase();

        if (byLength1 > byLength2) return 1;
        if (byLength2 > byLength1) return -1;
        if (byAlpha1 > byAlpha2) return 1;
        if (byAlpha2 > byAlpha1) return -1;
        return 0;
    });

    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}

sortArray(['alpha', 'beta', 'gamma']);