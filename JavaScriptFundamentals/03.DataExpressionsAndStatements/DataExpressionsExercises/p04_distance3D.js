function calcDistance(arr) {
    let x1 = arr[0];
    let y1 = arr[1];
    let z1 = arr[2];

    let x2 = arr[3];
    let y2 = arr[4];
    let z2 = arr[5];

    let distance = (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2;
    console.log(Math.sqrt(distance));
}

/*
 (X1, Y1, Z1) = (7, 4, 3)
 (X2, Y2, Z2) = (17, 6, 2)

 d=(17−7)2+(6−4)2+(2−3)2
 */