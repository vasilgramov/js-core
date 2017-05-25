function daysInMonth(input) {
    let month = input[1] - 1;
    let year = input[2];
    console.log(new Date(year, month, 0).getDate());
}