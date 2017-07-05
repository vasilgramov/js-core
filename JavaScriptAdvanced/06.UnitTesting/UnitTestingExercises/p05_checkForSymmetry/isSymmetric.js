function isSymmetric(arr) {
    if (!Array.isArray(arr))
        return false;
    let reversed = arr.slice(0).reverse(); // Clone and reverse
    return (JSON.stringify(arr) === JSON.stringify(reversed));
}

module.exports = {isSymmetric};