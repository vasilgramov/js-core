function splitter(input) {
    let regex = /[().,; ]/g;

    input.split(regex).filter(e => e.trim() !== '').forEach(e => console.log(e));
}

splitter('let sum = 4 * 4,b = "wow";');