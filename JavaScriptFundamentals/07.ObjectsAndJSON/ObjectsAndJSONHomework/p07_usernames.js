function usernames(array) {
    let set = new Set();

    for (let username of array) {
        set.add(username);
    }

    [...set].sort(function (a, b) {
        let length1 = a.length;
        let length2 = b.length;

        if (length1 > length2) return 1;
        if (length2 > length1) return -1;
        if (a > b) return 1;
        if (b > a) return -1;

        return 0;
    }).forEach(e => {
        console.log(e);
    })
}

usernames(
['Ashton',
'Kutcher',
'Ariel',
'Lilly',
'Keyden',
'Aizen',
'Billy',
'Braston']);