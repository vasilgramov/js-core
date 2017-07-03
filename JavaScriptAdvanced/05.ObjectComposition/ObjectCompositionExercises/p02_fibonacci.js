function fibonacci(n) {
    let f1 = 0;
    let f2 = 1;

    let fibonaccis = [];

    for (let i = 0; i < n; i++) {
        let f3 = f1 + f2;
        f1 = f2;
        f2 = f3;

        fibonaccis.push(f1);
    }

    return fibonaccis;
}

console.log(fibonacci(5));