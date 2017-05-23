function binaryLogarithm(input) {
    for (let i = 0; i < input.length; i++) {
        let currentNum = input[i];

        // 2 ^ 10 = currentNumber;
        console.log(Math.log2(currentNum));
    }
}

/*
 1024
 1048576
 256
 1
 2
 50
 100
 */
binaryLogarithm([1024]);