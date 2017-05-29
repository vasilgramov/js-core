function speedLimit(input) {
    let km = input[0];
    let area = input[1].toLowerCase();

    let diff = 0;
    switch (area) {
        case 'residential':
            diff = km - 20;
            break;
        case 'city':
            diff = km - 50;
            break;
        case 'interstate':
            diff = km - 90;
            break;
        case 'motorway':
            diff = km - 130;
            break;
    }

    if (diff > 0 && diff <= 20) {
        console.log('speeding');
    }  else if (diff > 20 && diff <= 40) {
        console.log('excessive speeding');
    } else if (diff > 40) {
        console.log('reckless driving');
    }
}

speedLimit([21, 'residential']);