function solve(array) {
    let numbers = [];

    for (let obj of array) {
        if (obj === '+' || obj === '-' || obj === '*' || obj === '/') {
            if (numbers.length < 2) {
                console.log('Error: not enough operands!');
                return;
            }

            let second = Number(numbers.pop());
            let first = Number(numbers.pop());

            if (obj === '+') {
                numbers.push(first + second);
            } else if (obj === '-') {
                numbers.push(first - second);
            } else if (obj === '*') {
                numbers.push(first * second);
            } else {
                numbers.push(first / second);
            }
        } else {
            numbers.push(obj);
        }
    }

    if (numbers.length > 1) {
        console.log('Error: too many operands!');
        return;
    }

    console.log(numbers.pop());
}

solve([
    '31',
    '2',
    '+',
    '11',
    '/'
]);