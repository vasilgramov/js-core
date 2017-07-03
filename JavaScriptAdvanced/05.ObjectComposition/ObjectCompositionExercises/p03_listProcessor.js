function solve(array) {
    let commandProcessor = (() => {
        let list = [];
        return {
            add: (newItem) => list.push(newItem),
            remove: (item) =>
                list = list.filter(x => x !== item),
            print: () => console.log(list)
        }
    })();

    for (let obj of array) {
        let split = obj.split(' ');
        let commandType = split[0];
        let argument = split[1];
        commandProcessor[commandType](argument);
    }
}

solve(['add hello', 'add again', 'remove hello', 'add again', 'print']);