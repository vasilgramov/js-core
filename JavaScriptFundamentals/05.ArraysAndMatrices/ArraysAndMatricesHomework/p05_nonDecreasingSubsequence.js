function solve(arr) {

    let last = arr[0];
    for (let i = 0; i < arr.length; i++) {
        let n = arr[i];

        if (n >= last) {
            last = n;
            console.log(n);
        }
    }
}