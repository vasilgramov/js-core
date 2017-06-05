function extract(input) {
    let regex = /_([A-Za-z0-9]+)/g;

    let output = [];
    let result = input.match(regex);
    for (let obj of result) {
        output.push(obj.substring(1));
    }

    console.log(output.join(','))
}

extract('The _id and _age variables are both integers.');