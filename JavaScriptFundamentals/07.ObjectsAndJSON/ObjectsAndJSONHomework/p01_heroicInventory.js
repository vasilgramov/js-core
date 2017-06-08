function main(input) {
    let heroes = [];

    for (let hero of input) {
        let tokens = hero.split(' / ');
        let heroName = tokens[0];
        let heroLevel = +tokens[1];

        let items = [];
        if (tokens.length > 2) {
            items = tokens[2].split(', ');
        }

        // console.log(heroName);
        // console.log(heroLevel);
        // console.log(items.join(", "));

        let heroJSON = { };
        heroJSON['name'] = heroName;
        heroJSON['level'] = heroLevel;
        // for (let obj of items) {
        heroJSON['items'] = items;
        // }

        heroes.push(heroJSON);
    }

    return JSON.stringify(heroes);
}

console.log(main([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'
]));;