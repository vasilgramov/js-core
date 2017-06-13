function solve(num) {
    let n = Number(num);

    let count = 0;
    let consumed = 0;
    while (n >= 100) {
        consumed += n - 26;

        count++;
        n -= 10;
    }

    console.log(count);
    if (consumed > 26) {
        consumed -= 26;
    }

    console.log(consumed)
}


solve(111);