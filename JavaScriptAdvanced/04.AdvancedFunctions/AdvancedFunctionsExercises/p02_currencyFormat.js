function result(func) {
     return function solve(value) {
         return func(',', '$', true, value);
     }
}

function currencyFormatter(separator, symbol, symbolFirst, value) {
    let result = Math.trunc(value) + separator;
    result += value.toFixed(2).substr(-2,2);
    if (symbolFirst) return symbol + ' ' + result;
    else return result + ' ' + symbol;
}

let myFunc = result(currencyFormatter);
console.log(myFunc(5345));