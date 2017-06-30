function solve(name, age, weight, height) {
    let object = { };
    object['name'] = name;

    let personalInfo = { };
    personalInfo['age'] = age;
    personalInfo['weight'] = weight;
    personalInfo['height'] = height;

    let BMI = Math.round(weight /(height * height / 10000));
    let status = BMI < 18.5 ? "underweight" : BMI < 25 ? "normal" : BMI < 30 ? "overweight" : "obese";

    object['personalInfo'] = personalInfo;
    object['BMI'] = BMI;
    object['status'] = status;

    if (object['status'] === 'obese') {
        object['recommendation'] = 'admission required';
    }

    return object;
}