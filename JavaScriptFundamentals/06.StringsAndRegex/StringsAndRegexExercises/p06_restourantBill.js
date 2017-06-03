function getBill(input) {
    let purchases = [];
    let price = 0;
    for (let index in input) {
        if (index % 2 === 0) {
            purchases.push(input[index]);
        } else {
            price += +input[index];
        }
    }

    console.log(`You purchased ${purchases.join(', ')} for a total sum of ${price}`)
}


getBill(['Beer Zagorka', '2.65', 'Tripe soup', '7.80','Lasagna', '5.69']);