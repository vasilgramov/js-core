function counter(arr) {
    let text = arr.shift().split(/\W+/).filter(e => e != '');
    let map = new Map();
    for (let obj of text) {
        obj = obj.toString().toLowerCase();
        if (!map.has(obj)) {
            map.set(obj, 0);
        }

        map.set(obj, map.get(obj) + 1);
        // map[obj] = map[obj] + 1;
    }

    let allWords = Array.from(map.keys()).sort();
    allWords.forEach(w =>
        console.log(`'${w}' -> ${map.get(w)} times`));
}

counter(["Far too slow, you're far too slow."]);