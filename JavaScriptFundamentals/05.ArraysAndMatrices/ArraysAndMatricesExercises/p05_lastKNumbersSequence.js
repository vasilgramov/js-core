function sequence(n, k) {
    let result = [ 1 ];

    for (let i = 1; i < n; i++) {
        let sliced = result.slice(i - k < 0 ? 0 : i - k , i);

        let sum = sliced.reduce((a, b) => a + b, 0);
        result.push(sum);
    }

    console.log(result.join(' '));
}


sequence(6, 3);