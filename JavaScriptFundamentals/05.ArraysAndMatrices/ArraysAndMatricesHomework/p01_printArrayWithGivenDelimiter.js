function stringJoin(arr) {
    let separator = arr[arr.length - 1];
    arr = arr.slice(0, arr.length - 1);

    console.log(arr.join(separator));
}

