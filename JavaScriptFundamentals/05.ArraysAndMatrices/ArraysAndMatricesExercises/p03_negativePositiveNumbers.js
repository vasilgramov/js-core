function orderArr(arr) {
    let resultArr = [];

    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];

        if (element < 0) {
            resultArr.unshift(element);
        } else {
            resultArr.push(element);
        }
    }

    for (let i = 0; i < resultArr.length; i++) {
        console.log(resultArr[i]);
    }
}