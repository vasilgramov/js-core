function unique(arr) {
    let unique = new Set();

    for (let obj of arr) {
        let split = obj.toLowerCase().split(/\W+/).filter(e => e != '');
        for (let obj1 of split) {
            unique.add(obj1);
        }
    }

    console.log(Array.from(unique).join(', '));
}