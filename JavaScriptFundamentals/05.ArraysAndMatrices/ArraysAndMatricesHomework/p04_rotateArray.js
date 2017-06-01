function rotateArray(arr) {
    let n = arr.pop();

    for (let i = 0; i < n % arr.length; i++) {
        let t = arr.pop();
        arr.unshift(t);
    }

    console.log(arr.join(' '));
}