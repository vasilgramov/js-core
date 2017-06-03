function solve(input) {
    "use strict";
    console.log(input.map(e => e.split('@')).map(([username, domain]) => username + '.' + domain.split('.').map(e => e[0]).join('')).join(', '));
}

solve(['peshoo@gmail.com', 'todor_43@mail.dir.bg', 'foo@bar.com']);