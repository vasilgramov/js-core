function solve(array) {
    "use strict";
    let html = '<table border="1">\n';
    html += '<thead>\n'
    html += '<tr><th colspan="3">Blades</th></tr>\n';
    html += '<tr><th>Length [cm]</th><th>Type</th><th>Application</th></tr>\n';
    html += '</thead>\n';
    html += '<tbody>\n';

    let types = ['*rap-poker', 'blade', 'quite a blade', 'pants-scraper', 'frog-butcher'];

    for (let obj of array) {
        let num = Math.floor(Number(obj));
        if (num <= 10) {
            continue;
        }

        let type = num > 40 ? 'sword' : 'dagger';
        let swordDaggerType = num % 10;

        html += `<tr><td>${num}</td><td>${type}</td><td>${types[swordDaggerType % 5]}</td></tr>\n`;
        // console.log(num);
    }

    html += '</tbody>\n';
    html += '</table>';

    console.log(html);
}

solve([
'17.8',
'19.4',
'13',
'55.8',
'126.96541651',
'3']);