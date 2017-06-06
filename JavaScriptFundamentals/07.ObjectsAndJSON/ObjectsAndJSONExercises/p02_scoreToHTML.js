function parseJSON(arr) {
    let parse = JSON.parse(arr);

    let html = '<table>\n';
    html += '  <tr><th>name</th><th>score</th></tr>\n';

    for (let obj of parse) {
        html += '  <tr>';
        html += '<td>';
        html += escapeHtml(obj.name);
        html += '</td>';
        html += '<td>';
        html += obj.score;
        html += '</td>';
        html += '</tr>\n';
    }

    html += '</table>';

    console.log(html);


    function escapeHtml (html) {
        html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

        return html;
    }
}

parseJSON('[{"name":"Pesho & Kiro","score":479},{"name":"Gosho, Maria & Viki","score":205}]');