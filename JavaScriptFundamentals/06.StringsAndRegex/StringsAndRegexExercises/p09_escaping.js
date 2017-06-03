function escape(input) {
    let result = '';

    result += '<ul>\n';

    for (let obj of input) {
        obj = replace(obj, '&', '&amp;', 0);
        obj = replace(obj, '<', '&lt;', 0);
        obj = replace(obj, '>', '&gt;', 0);
        obj = replace(obj, '"', '&quot;', 0);

        result += `  <li>${obj}</li>\n`;
    }

    function replace(obj, toReplace, replacement, start) {
        while (obj.indexOf(toReplace, start) >= 0) {
            start = obj.indexOf(toReplace) + 1;
            obj = obj.replace(toReplace, replacement);
        }

        return obj;
    }

    result += '</ul>';
    console.log(result);
}

escape(['<b>unescaped text</b>', 'normal text']);