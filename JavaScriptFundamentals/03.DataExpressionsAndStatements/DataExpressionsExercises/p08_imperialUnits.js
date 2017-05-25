function inchesToFeetAndInches(input) {
    let num = input;
    let foots = Math.floor(num / 12);
    let inches = num % 12;
    let result = '' + foots + '\'-' + inches + '"';
    console.log(result);
}

inchesToFeetAndInches(55);