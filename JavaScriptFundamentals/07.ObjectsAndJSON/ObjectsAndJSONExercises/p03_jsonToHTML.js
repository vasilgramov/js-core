function jsonToHTML(string) {
    let parse = JSON.parse(string);
    let keys = Object.keys(parse[0]);

    let html = '<table>\n';

    html += '  <tr>';
    for (let obj of keys) {
        html += '<th>';
        html += escapeHtml(obj);
        html += '</th>';
    }
    html += '</tr>\n';


    for (let obj of parse) {
        html += '  <tr>';
        for (let obj1 of keys) {
            html += '<td>';
            let check = (obj[obj1]);
            if (/\d+/.test(check)) {
                html += check;
            } else {
                html += escapeHtml(check);
            }
            html += '</td>';
        }
        html += '</tr>\n';
    }


    html += '</table>\n';

    console.log(html);

    function escapeHtml (html) {
        html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

        return html;
    }
}


jsonToHTML('[{"Name":"Tomatoes & Chips","Price":2.35},{"Name":"J&B Chocolate","Price":0.96}]');