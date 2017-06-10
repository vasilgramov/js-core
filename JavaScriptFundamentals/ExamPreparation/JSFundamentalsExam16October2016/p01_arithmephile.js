function solve(array) {
    let max = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < array.length; i++) {
        let currentNumber = Number(array[i]);

        if (currentNumber > 0 && currentNumber < 10) {
            let currentProduct = 1;
            for (let j = i + 1; j <= i + currentNumber && j < array.length; j++) {
                currentProduct *= array[j];
            }

            if (currentProduct > max) {
                max = currentProduct;
            }
        }

    }

    console.log(max);
}

solve(
[10,
20,
2,
30,
44,
3,
56,
20,
24]);