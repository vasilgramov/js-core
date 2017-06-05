function extractAllDigigs(array) {
    let regex = /\d+/g;

    let result = [];
    for (let obj of array) {
        let match = obj.match(regex);

        if (match != null) {
            for (let obj1 of match) {
                result.push(obj1);
            }
        }
    }

    console.log(result.join(' '));
}

