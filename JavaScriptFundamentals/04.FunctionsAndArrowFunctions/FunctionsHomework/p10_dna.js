function print(n) {

    let sequence = 'ATCGTTAGGG';
    let index = 0;
    for (let i = 0; i < n; i++) {
        if (i % 4 == 0) {
            console.log(`**${sequence[index]}${sequence[index + 1]}** `)
        } else if (i % 2 == 0) {
            console.log(`${sequence[index]}----${sequence[index + 1]}`)
        } else {
            console.log(`*${sequence[index]}--${sequence[index + 1]}*`);
        }

        index += 2;
        if (index >= sequence.length) {
            index = 0;
        }
    }
}

print(4);