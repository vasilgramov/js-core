function properties(input) {
    let nameK = input[0];
    let nameV = input[1];
    let ageK = input[2];
    let ageV = input[3];
    let genderK = input[4];
    let genderV = input[5];

    let result = {[nameK]: nameV, [ageK]: ageV, [genderK]: genderV};
    console.log(result);
}

properties(['name', 'Pesho', 'age', '23', 'gender', 'male']);