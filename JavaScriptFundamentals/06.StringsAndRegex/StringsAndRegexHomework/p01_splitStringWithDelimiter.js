function splitter(text, delimiter) {
    let split = text.split(delimiter);
    for (let obj of split) {
        console.log(obj);
    }
}

splitter('One-Two-Three-Four-Five', '-');