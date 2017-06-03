function solve(input) {
    let cities = [];
    let populations = [];

    for (let obj of input) {
        [city, population] = obj.split('|').filter(e => e.trim() !== '');

        cities.push(city.trim());
        populations.push(+(population.trim()));
    }

    console.log(cities.join(', '));
    console.log(populations.reduce((a, b) => a + b, 0));
}

solve(['| Sofia           | 300',
    '| Veliko Tarnovo  | 500',
    '| Yambol          | 275']);