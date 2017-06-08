function JSONTable(array) {
    let html = '<table>\n';

    for (let obj of array) {
        let parse = JSON.parse(obj);
        html += '  <tr>\n';

        html += '		<td>';
        html += parse['name'];
        html += '</td>\n';

        html += '		<td>';
        html += parse['position'];
        html += '</td>\n';

        html += '		<td>';
        html += parse['salary'];
        html += '</td>\n';

        html += '  <tr>\n';
    }

    html += '</table>';

    console.log(html);
}

JSONTable(
[{"name":"Pesho","position":"Promenliva","salary":100000},
    {"name":"Teo","position":"Lecturer","salary":1000},
    {"name":"Georgi","position":"Lecturer","salary":1000}]
);