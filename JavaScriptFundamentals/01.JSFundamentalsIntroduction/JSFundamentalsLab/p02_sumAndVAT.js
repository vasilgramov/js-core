VAT([1.20, 2.60, 3.50]);


function VAT(numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }

    let vat = sum * 0.2;

    console.log("sum = " + sum);
    console.log("VAT = " + vat);
    console.log("total = " + (vat + sum));
}




