function addRemove(arr) {
    let result = [];

    let n = 1;
    for (let i = 0; i < arr.length; i++) {
        let command = arr[i];

        if (command == 'add') {
            result.push(n);
        } else {
            result.pop();
        }

        n++;
    }

    if (result.length == 0) {
        console.log('Empty');
    } else {
        for (let i = 0; i < result.length; i++) {
            console.log(result[i]);
        }
    }
}