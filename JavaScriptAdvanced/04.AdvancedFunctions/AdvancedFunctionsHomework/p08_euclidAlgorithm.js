function euclid(num1, num2) {
    if (num1 === 0) {
        console.log(num2);
        return;
    }

    while (num2 != 0) {
        if (num1 > num2) {
            num1 = num1 - num2;
        } else {
            num2 = num2 - num1;
        }
    }

    return num1;

    /*
     public int egcd(int a, int b) {
     if (a == 0)
     return b;

     while (b != 0) {
     if (a > b)
     a = a - b;
     else
     b = b - a;
     }

     return a;
     }
     */
}