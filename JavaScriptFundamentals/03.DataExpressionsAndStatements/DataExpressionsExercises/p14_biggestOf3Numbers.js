function biggest(input) {
    let n1 = input[0];
    let n2 = input[1];
    let n3 = input[2];

    if (n1 >= n2 && n1 >= n3) {
        console.log(n1);
    } else if (n2 >= n1 && n2 >= n3) {
        console.log(n2);
    } else {
        console.log(n3);
    }
}