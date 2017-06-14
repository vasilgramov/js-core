function solve(base, increment) {
    let b = Number(base);
    let i = Number(increment);

    let stone = 0;
    let marble = 0;
    let lapis = 0;
    let gold = 0;

    let height = 0;
    let count = 1;
    while (b > 0) {
        if (b === 1 || b === 2) {             // gold
            gold = (b ** 2) * i;
        } else if (count % 5 === 0) { // lapis
            stone += ((b - 2) ** 2) * i;
            lapis += ((b ** 2) - (b - 2) ** 2) * i;
        } else {
            stone += ((b - 2) ** 2) * i;
            marble += ((b ** 2) - (b - 2) ** 2) * i;
        }

        height += i;
        b -= 2;
        count++;
    }

    console.log(`Stone required: ${Math.ceil(stone)}`);
    console.log(`Marble required: ${Math.ceil(marble)}`);
    console.log(`Lapis Lazuli required: ${Math.ceil(lapis)}`);
    console.log(`Gold required: ${Math.ceil(gold)}`);
    console.log(`Final pyramid height: ${Math.floor(height)}`);
 }

 solve(11, 0.75);
 // solve(11, 1);