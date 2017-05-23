function isOdd(n) {
    if (n % 2 == 0) {
        console.log("even");
    } else if (n == Math.round(n)) {
        console.log("odd");
    } else {
        console.log("invalid");
    }
}