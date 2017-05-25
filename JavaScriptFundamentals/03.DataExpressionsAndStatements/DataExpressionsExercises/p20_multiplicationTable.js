function multiplicationTable(n) {
    let result = '<table border="1">\n';

    let toMultiply = 1;
    for (let i = 0; i <= n; i++) {
        result += '  <tr>';
        if (i == 0) {
            result += `<th>x</th>`;
        } else {
            result += `<th>${i}</th>`;
        }

        if (i == 0) {
            for (let j = 1; j <= n; j++) {
                result += `<th>${j}</th>`
            }
        } else {
            for (let j = 1; j <= n; j++) {
                result += `<td>${j * i}</td>`
            }
        }


        result += '</tr>\n';
        toMultiply++;
    }


    result += '</table>';
    console.log(result);
}

multiplicationTable(5);

