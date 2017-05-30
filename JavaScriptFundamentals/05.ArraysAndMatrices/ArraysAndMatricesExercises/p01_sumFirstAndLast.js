function sumFirstAndLast(arr) {
    let first = +arr[0];
    let last = +arr[arr.length - 1];

    console.log(first + last);
}

sumFirstAndLast(['20', '30', '40']);