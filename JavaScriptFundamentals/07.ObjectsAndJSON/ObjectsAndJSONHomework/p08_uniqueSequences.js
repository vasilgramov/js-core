function uniqueSequences(data) {
    let arrays = new Map;
    for (let line of data) {
        let array = JSON.parse(line).map(Number).sort((a, b) => b - a);
        let toStore = `[${array.join(', ')}]`;
        if (!arrays.has(toStore))
            arrays.set(toStore, array.length);
    }

    console.log([...arrays.keys()].sort((a, b) => arrays.get(a) -arrays.get(b)).join('\n'));
}