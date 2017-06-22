function subtract() {
    let firstNumber = Number(document.getElementById('firstNumber').value);
    let secondNumber = Number(document.getElementById('secondNumber').value);

    //
    // console.log(firstNumber);
    // console.log(secondNumber);
    document.getElementById('result').textContent = (firstNumber - secondNumber);
}
