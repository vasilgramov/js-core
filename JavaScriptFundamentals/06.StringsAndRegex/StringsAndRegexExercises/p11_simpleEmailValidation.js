function valideEmail(emal) {
    let regex = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]+$/;

    let valid = regex.test(emal);

    return valid === true ? "Valid" : "Invalid";
}