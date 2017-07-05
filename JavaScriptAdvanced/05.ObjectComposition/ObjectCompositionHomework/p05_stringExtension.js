(function solve() {
    String.prototype['ensureStart'] = function (string) {
        if (!this.startsWith(string)) {
            return string + this;
        } else {
            return this + "";
        }
    };

    String.prototype['ensureEnd'] = function (string) {
        if (!this.endsWith(string)) {
            return this + string;
        } else {
            return this + ""
        }
    };

    String.prototype['isEmpty'] = function () {
        return this.length === 0;
    };

    String.prototype['truncate'] = function (n) {
        if (n < this.length) {
            let result = '';

            let parts = this.split(' ');
            for (let part of parts) {
                if ((result + part).length <= n - 3) {
                    if (result === '') {
                        result = part;
                    } else {
                        result = result + ' ' + part;
                    }
                } else {
                    break;
                }
            }

            // for (let i = 0; i < n - 3; i++) {
            //     result += this[i];
            // }

            result += "...";
            return result.substring(0, n);
        } else {
            return this + '';
        }
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
})();

// solve();

