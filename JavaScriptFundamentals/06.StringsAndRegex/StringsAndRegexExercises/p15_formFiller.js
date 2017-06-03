function formFiller(name, email, phone, text) {
    for (let obj of text) {
        obj = obj.replace(/<![a-zA-Z]+!>/, name);
        obj = obj.replace(/<@[a-zA-Z]+@>/, email);
        obj = obj.replace(/<\+[a-zA-Z]+\+>/, phone);

        console.log(obj);
    }
}

formFiller('Pesho',
    'pesho@softuni.bg',
    '90-60-90',
    ['Hello, <!username!>!  <!username!>',
        'Welcome to your Personal profile.',
        'Here you can modify your profile freely.',
        'Your current username is: <!fdsfs!>. Would you like to change that? (Y/N)',
        'Your current email is: <@DasEmail@>. Would you like to change that? (Y/N)',
        'Your current phone number is: <+number+>. Would you like to change that? (Y/N)']);