function validator(input) {
    let x1 = input[0];
    let y1 = input[1];
    let x2 = input[2];
    let y2 = input[3];

    /*
     d=√(x2−x1) ^ 2+(y2−y1) ^ 2
     */

    let d = Math.sqrt((x1 - 0) ** 2 + (y1 - 0) ** 2);
    if (d === Math.ceil(d)) {
        console.log(`{${x1}, ${y1}} to {0, 0} is valid`)
    } else {
        console.log(`{${x1}, ${y1}} to {0, 0} is invalid`)
    }

    d = Math.sqrt((x2 - 0) ** 2 + (y2 - 0) ** 2);
    if (d === Math.ceil(d)) {
        console.log(`{${x2}, ${y2}} to {0, 0} is valid`)
    } else {
        console.log(`{${x2}, ${y2}} to {0, 0} is invalid`)
    }

    d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    if (d === Math.ceil(d)) {
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`)
    } else {
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`)
    }
}

validator([3, 0, 0, 4]);