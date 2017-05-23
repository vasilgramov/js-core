function filterByAge(minAge, name1, age1, name2, age2) {
    if (age1 >= minAge) {
        console.log(`{ name: '${name1}', age: ${age1} }`)
    }

    if (age2 >= minAge) {
        console.log(`{ name: '${name2}', age: ${age2} }`)
    }
}

filterByAge();