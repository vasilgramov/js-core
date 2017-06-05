function extractlinkes(array) {
    let regex = /www\.[a-zA-Z0-9-]+\.[a-z]+(?:\.[a-z]+)*/g;

    for (let obj of array) {
        let match = obj.match(regex);
        if (match != null) {
            for (let obj1 of match) {
                console.log(obj1);
            }
        }
    }
}