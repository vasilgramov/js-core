function printer(arr) {
    let update = Number(arr[arr.length - 1]);
    arr.pop();

    for (let i = 0; i < arr.length; i += update) {
        console.log(arr[i]);
    }
}

printer([5, 20, 31, 4, 20, 2]);