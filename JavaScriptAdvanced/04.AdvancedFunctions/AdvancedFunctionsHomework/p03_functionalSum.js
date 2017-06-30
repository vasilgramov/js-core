/*let solve = */(function solve() {
    let result = 0;

    return function add(parameter) {
        result += parameter;

        add.toString = function () {
            return result;
        };

        return add;
    }

})()

console.log(solve(1)(6)(-3).toString());