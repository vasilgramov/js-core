function reverse(arr) {
    let reversed = Array.from(arr.join('')).reverse().join('');
    console.log(reversed);
}

reverse(['I', 'am', 'student']);