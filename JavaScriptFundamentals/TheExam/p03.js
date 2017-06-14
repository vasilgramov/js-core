function solve(string) {
    let validator = /^<message(?:\s+(?:([a-z]+)="([A-Za-z0-9\s\.]+)"))+>(.+?(?:\s.+)*)<\/message>$/;
    if (validator.test(string)) {
        // check for from to tags
        let tagsRegex = /(?:\s+(?:([a-z]+)="([A-Za-z0-9\s\.]+)"))/g;

        let all = string.match(tagsRegex);

        let to = '';
        let from = '';
        for (let obj of all) {

            let split = obj.split('=');
            if (split[0].trim() === 'to') {
                to = split[1].substring(1, split[1].length - 1);
            }

            if (split[0].trim() === 'from') {
                from = split[1].substring(1, split[1].length - 1);
            }
        }

        // console.log(to);
        // console.log(from);

        // missing from or to
        if (from === '' || to === '') {
            console.log("Invalid attributes");
            return;
        }

        let msg = string.match(validator);
        let msgs = msg[3].split(/\n/g);

        let result = '<article>\n';
        result += `  <div>From: <span class="sender">${from}</span></div>\n`;
        result += `  <div>To: <span class="recipient">${to}</span></div>\n`;
        result += '  <div>\n';
        for (let obj of msgs) {
            result += `    <p>${obj}</p>\n`;
        }
        result += '  </div>\n';
        result += '</article>';

        console.log(result);
        // let msgRegex = />(.+?)</;
        // let msg = string.match(msgRegex)[0];
        // msg = msg.substring(1, msg.length - 1);
        // console.log(msg);

    } else {
        console.log("Invalid message format");
    }
}

solve("<message to=\"Bob\" from=\"Alice\" timestamp=\"1497254114\">Same old, same old\nLet's go out for a beer</message>");

// solve('<message from="Alice" timestamp="1497254112">This is a test</message>');

// solve('<message to="Matilda" from="Charlie"><media type="image" src="slyfox.jpg"/></message><meta version="2.0"/>');
//
// solve('<message from="MasterBlaster" to="TheAnimal" color="#FF340B">FWD: Funny stuff</message>');
//
// solve('<message from="Hillary" to="Edward" secret:true>VGhpcyBpcyBhIHRlc3Q</message>');