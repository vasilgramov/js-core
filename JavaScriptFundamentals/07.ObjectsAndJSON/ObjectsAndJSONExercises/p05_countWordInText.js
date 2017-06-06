function counter(arr) {
    let text = arr.shift().split(/\W+/).filter(e => e != '');
    let map = { };
    for (let obj of text) {
        if (map[obj] == undefined) {
            map[obj] = 0;
        }

        map[obj] = map[obj] + 1;
    }


    console.log(JSON.stringify(map));
}

counter(["Far too slow, you're far too slow."]);