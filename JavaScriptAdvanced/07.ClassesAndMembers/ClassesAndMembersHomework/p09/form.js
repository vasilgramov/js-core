(function () {

    class Textbox {
        constructor(selector, regex) {
            this.selector = selector;
            this._elements = $(selector);
            this._invalidSymbols = regex;
            this._value = undefined;

            let that = this;
            $(selector).on('input change', function () {
                let value = $(this).val();
                $(that.selector).val(value);
                that.value = value;
            });
        }

        get elements() { return this._elements }

        get value() { return this._value }
        set value(v) {
            this._value = v;
            $(this.selector).val(v);
        }

        isValid() { return !this._invalidSymbols.test($(this.selector).val()); }
    }

    class Form {

        constructor() {
            this._element = $('<div>').addClass('form');
            this._textboxes = [];

            for (let a of arguments) {
                if (!(a instanceof Textbox))
                    throw new Error(`Element is not a Textbox`);
            }

            for (let a of arguments) {
                this._element.append($(a.selector));
                this._textboxes.push(a);
            }
        }

        submit() {
            let allValid = true;

            for (let tb of this._textboxes) {
                if (tb.isValid()) {
                    $(tb.selector).css('border', '2px solid green');
                } else {
                    allValid = false;
                    $(tb.selector).css('border', '2px solid red');
                }
            }

            return allValid;
        }

        attach(selector) {
            $(selector).append(this._element);
        }
    }

    return {
        Textbox: Textbox,
        Form: Form
    };

})()

