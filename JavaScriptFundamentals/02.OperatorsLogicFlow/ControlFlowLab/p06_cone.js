function calcualteConeVolume(radius, height) {
    let s = Math.sqrt(radius * radius + height * height);

    let volume = Math.PI * radius ** 2 * height / 3;
    console.log(volume);

    // πr√(r2 + h2)
    let surfaceArea = Math.PI * radius * (radius + s);
    console.log(surfaceArea);
}