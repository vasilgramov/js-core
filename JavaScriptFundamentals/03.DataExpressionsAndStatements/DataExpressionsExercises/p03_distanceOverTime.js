function distanceOverTime(arr) {
    let speed1 = arr[0];
    let speed2 = arr[1];

    let time = arr[2];

    let distance1 = speed1 * (time / 360);
    let distance2 = speed2 * (time / 360);

    console.log(Math.abs(distance1 - distance2) * 100);
}

distanceOverTime([0, 60, 3600]);