function toUpperCase(input) {
    input = input.toUpperCase();
    
    let split = input.split(/\W+/);

    split = split.filter(e => e != '');

    console.log(split.join(', '));
}

toUpperCase('Hi, how are you?');