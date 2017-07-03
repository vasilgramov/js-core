function solve(car) {
    let modifiedCar = { };
    modifiedCar['model'] = car['model'];

    if (car['power'] <= 90) {
        modifiedCar['engine'] = { power: 90, volume: 1800 };
    } else if (car['power'] > 90 && car['power'] <= 120) {
        modifiedCar['engine'] = { power: 120, volume: 2400 };
    } else {
        modifiedCar['engine'] = { power: 200, volume: 3500 }
    }

    let color = car['color'];
    let carriage = car['carriage'];

    modifiedCar['carriage'] = { type: carriage, color: color };

    let wheelSize = car['wheelsize'];
    wheelSize = wheelSize % 2 === 0 ? wheelSize - 1 : wheelSize;
    modifiedCar['wheels'] = [];
    for (let i = 0; i < 4; i++) {
        modifiedCar['wheels'].push(wheelSize);
    }

    return modifiedCar;
}