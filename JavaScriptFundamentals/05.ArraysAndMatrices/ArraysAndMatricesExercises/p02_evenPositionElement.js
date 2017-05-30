function getEvenPositionedElements(arr) {
    let result = '';

    let arrResult = [];
    // first is value, second is index
    arr.forEach((e, i, j, q) => console.log(`${e} is element ${i} ----> ${j} ${q}`));

    for (let i = 0; i < arr.length; i++) {
        if (i % 2 == 0) result += arr[i] + ' ';
    }

    console.log(result);
}

getEvenPositionedElements(['20', '30', '40']);