function templateFormatting(input) {
    let formatted = '<?xml version="1.0" encoding="UTF-8"?>\n';
    formatted += '<quiz>';

    for (let i = 0; i < input.length; i += 2) {
        let question = input[i];
        let answer = input[i + 1];

        formatted += '\n  <question>\n';
        formatted += '    ' + question + '\n';
        formatted += '  </question>\n';

        formatted += '  <answer>\n';
        formatted += '    ' + answer + '\n';
        formatted += '  </answer>';
    }

    formatted += '\n</quiz>';

    console.log(formatted);
}