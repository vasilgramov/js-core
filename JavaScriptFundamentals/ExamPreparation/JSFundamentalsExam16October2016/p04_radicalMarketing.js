function mapping(array) {
    let userSubscriptions = new Map();
    let userSubscribers = new Map();

    for (let line of array) {
        if (line.indexOf('-') === -1) {
            if (!userSubscriptions.has(line) && !userSubscribers.has(line)) {
                userSubscriptions.set(line, new Set());
                userSubscribers.set(line, new Set());
            }
        } else {
            [subscriber, user] = line.split('-');

            if (userSubscriptions.has(subscriber) && userSubscriptions.has(user)) {
                let subcriptions = userSubscriptions.get(subscriber);
                subcriptions.add(user);
                userSubscriptions.set(subscriber, subcriptions);

                let subscribers = userSubscribers.get(user);
                subscribers.add(subscriber);
                userSubscribers.set(user, subscribers);
            }
        }
    }

    // console.log(userSubscribers);
    // console.log(userSubscriptions);

    let theOne;
    let count = -1;
    [...userSubscribers].forEach(([user, subcriptions]) => {
        // "use strict";
        if (theOne === undefined || [...subcriptions].length > count) {
            theOne = user;
            count = [...subcriptions].length;
        } else if (count === [...subcriptions].length) {
            let theOneCount = [...userSubscriptions.get(theOne)].length;
            let currentCount = [...userSubscriptions.get(user)].length;

            if (currentCount > theOneCount) {
                theOne = user;
            }
        }
    });

    count = 1;
    console.log(theOne);
    let v = userSubscribers.get(theOne);
    for (let obj of v) {
        console.log(`${count++}. ${obj}`);
    }
}

mapping([
    'Z',
    'O',
    'R',
    'D',
    'Z-O',
    'R-O',
    'D-O',
    'P',
    'O-P',
    'O-Z',
    'R-Z',
    'D-Z'
])

// mapping([
//     'A',
//     'B',
//     'A-B',
//     'C',
//     'C-B',
//     'D',
//     'D-B',
//     'E',
//     'E-B',
//     'A-C',
//     'D-C',
//     'E-C'
// ]);