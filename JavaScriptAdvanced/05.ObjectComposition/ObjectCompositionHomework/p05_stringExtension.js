function solve() {
    String.prototype['ensureStart'] = function (string) {
        if (!this.startsWith(string)) {
            return string + " " + this;
        }
    };

    String.prototype['ensureEnd'] = function (string) {
        if (!this.endsWith(string)) {
            return this + " " + string;
        }
    };

    String.prototype['isEmpty'] = function () {
        return this === '';
    };

    String.prototype['truncate'] = function (n) {
        let newStr = this;
        if (this.length >= n) {
            let sliced = this.slice(0, n - 3);
            return sliced + "...";
        }

        return this + '';
    };


    String['format'] = function (string, params) {
        let rgx = /\{(\d+)\}/g;
        let match;
        while (match = rgx.exec(string)) {
            let idx = +match[1];
            if (idx < arguments.length - 1) {
                string = string.replace(match[0], arguments[idx + 1]);
            }
        }

        return string;
    };

    let str = 'hello my string';
    str = str.truncate(14);
    console.log(str);
}

solve();

