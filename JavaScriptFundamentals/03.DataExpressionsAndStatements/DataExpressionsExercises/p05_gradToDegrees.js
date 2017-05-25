function converter(grads) {
    const degree = 0.9;

    let result = (grads * 0.9) % 360;
    if (result < 0) {
        result = 360 + result;
    }

    console.log(result);
}

converter(-50);