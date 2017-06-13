function solve(array) {
    let arr = array.map(Number);

    let memo = [];

    while (true) {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < 30) {
                arr[i]++;
                count++;
            }
        }

        if (count === 0) {
            break;
        }

        memo.push(count * 195);
    }

    console.log(memo.join(", "));
    console.log(memo.reduce((a, b) => a + b, 0) * 1900 + " pesos")
}

solve([21, 25, 28]);