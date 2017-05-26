function drawTriangleOfStars(n) {

    for (let i = 1; i <= n; i++) {
        console.log(drawStars(i))
    }

    for (let i = n - 1; i >= 0; i--) {
        console.log(drawStars(i));
    }

    function drawStars(n) {
        return "*".repeat(n);
    }

}

drawTriangleOfStars(3);