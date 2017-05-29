function treasureLocator(input) {
    for (let i = 0; i < input.length; i += 2) {
        let x = Number(input[i]);
        let y = Number(input[i + 1]);
        treasureFinder(x, y);
    }

    function treasureFinder(pointX, pointY) {
        if (pointX >= 8 && pointX <= 9 && pointY >= 0 && pointY <= 1) {
            console.log('Tokelau');
        }
        else if (pointX >= 1 && pointX <= 3 && pointY >= 1 && pointY <= 3) {
            console.log('Tuvalu');
        }
        else if (pointX >= 5 && pointX <= 7 && pointY >= 3 && pointY <= 6) {
            console.log('Samoa');
        }
        else if (pointX >= 0 && pointX <= 2 && pointY >= 6 && pointY <= 8) {
            console.log('Tonga');
        }
        else if (pointX >= 4 && pointX <= 9 && pointY >= 7 && pointY <= 8) {
            console.log('Cook');
        }
        else {
            console.log('On the bottom of the ocean');
        }
    }
}