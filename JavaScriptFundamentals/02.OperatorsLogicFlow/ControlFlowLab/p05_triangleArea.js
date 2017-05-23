function calculateTriangleArea(a, b, c) {
    let halfP = (a + b + c) / 2;

    let area = Math.sqrt(halfP * (halfP - a) * (halfP - b) * (halfP - c));

    console.log(area);
}

calculateTriangleArea(2, 3.5, 4);