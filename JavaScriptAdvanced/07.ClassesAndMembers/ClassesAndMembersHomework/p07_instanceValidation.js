class CheckingAccount {
    constructor(clientId, email, firstName, lastName) {
        this.clientId = clientId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;

        this._products = [];
    }


    get clientId() {
        return this._clientId;
    }
    set clientId(value) {
        if (!/^\d{6}$/.test(value)) {
            throw new TypeError("Client ID must be a 6-digit number");
        }

        this._clientId = value;
    }

    get email() {
        return this._email;
    }
    set email(value) {
        if (!/^[A-Za-z0-9]+@(?:[A-Za-z]|\.)+$/.test(value)) {
            throw new TypeError("Invalid e-mail");
        }
        this._email = value;
    }

    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        this.validateName(value, "First");

        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this.validateName(value, "Last");

        this._lastName = value;
    }

    validateName(name, flag) {
        if (name.length < 3 || name.length > 20) {
            throw new TypeError(flag + " name must be between 3 and 20 characters long");
        }

        if (!/^[A-Za-z]+$/.test(name)) {
            throw new TypeError(flag + " name must contain only Latin characters");

        }
    }
}

let acc = new CheckingAccount('1314', 'ivan@some.com', 'Ivan', 'Petrov');