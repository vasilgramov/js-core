function tag(input) {
    let fileLocation = input[0];
    let alternateText = input[1];
    console.log(`<img src="${fileLocation}" alt="${alternateText}">`);
}