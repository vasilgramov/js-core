function printer(arr) {
    let k = arr[0];

    let leftPart = '';
    for (let i = 1; i <= k; i++) {
        leftPart += arr[i] + ' ';
    }

    let rightPart = '';
    for (let i = arr.length - k; i < arr.length; i++) {
        rightPart += arr[i] + ' ';
    }

    console.log(leftPart);
    console.log(rightPart);
}

printer([2, 7, 8, 9]);