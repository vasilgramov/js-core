function solve(array) {
    let result = '';

    for (let command of array) {
        process(command);
    }
    
    function process(command) {
        let commandTokens = command.split(' ');
        let commandType = commandTokens[0];
        let commandArg = commandTokens[1];

        if (commandType === 'append') {
            result += commandArg;
        } else if (commandType === 'removeStart') {
            result = result.substring(Number(commandArg));
        } else if (commandType === 'removeEnd') {
            result = result.substring(0, result.length - Number(commandArg));
        } else if (commandType === 'print') {
            console.log(result);
        }
    }
}

solve(
    ['append hello',
    'append again',
    'removeStart 3',
    'removeEnd 4',
    'print']
);