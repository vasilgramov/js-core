function solve(work) {
    /*
     { weight: Number,
     experience: Number,
     bloodAlcoholLevel: Number,
     handsShaking: Boolean }
     */

    if (work.handsShaking) {
        let weight = work.weight;
        let experience = work.experience;
        work.bloodAlcoholLevel = work.bloodAlcoholLevel + 0.1 * (weight * experience);
        work.handsShaking = false;
    }


    console.log(work);
    return work;
}


solve({ weight: 120,
    experience: 20,
    bloodAlcoholLevel: 200,
    handsShaking: true });
