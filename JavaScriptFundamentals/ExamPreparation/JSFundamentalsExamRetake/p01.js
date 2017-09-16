function solve(portions, commands) {

    let eatenCount = 0;
    for (let i = 0; i < commands.length; i++) {
        let cmd = commands[i];
        if (executeCmd(cmd)) {
            portions.length > 0 ? console.log(`Meals left: ${portions.join(', ')}`) : console.log('The food is gone');
            console.log(`Meals eaten: ${eatenCount}`);

            return;
        }
    }

    function executeCmd(cmd) {
        let tokens = cmd.split(" ");

        switch (tokens[0]) {
            case 'Serve':
                if (portions.length < 1) break;

                console.log(`${portions.pop()} served!`);
                break;
            case 'Eat':
                if (portions.length < 1) break;

                console.log(`${portions.shift()} eaten`);
                eatenCount++;
                break;
            case 'Add':
                if (tokens[1] === undefined) break;

                portions.unshift(tokens[1]);
                break;
            case 'Consume':
                eatenCount += consume(tokens[1], tokens[2], portions);
                break;
            case 'Shift':
                swap(tokens[1], tokens[2], portions);
                break;
            case 'End':
                return true;
                break;
        }
    }

    function swap(first, second, arr) {
        let firstIndex = Number(first);
        let secondIndex = Number(second);

        if (arr[firstIndex] !== undefined && arr[secondIndex] !== undefined) {
            let firstMeal = arr[firstIndex];
            arr[firstIndex] = arr[secondIndex];
            arr[secondIndex] = firstMeal;
        }
    }

    function consume(first, second, arr) {
        let firstIndex = Number(first);
        let secondIndex = Number(second);

        if (arr[firstIndex] === undefined || arr[secondIndex] === undefined) return 0;

        let count = secondIndex - firstIndex + 1;
        arr.splice(firstIndex, count);
        console.log("Burp!");

        return count;
    }
}
