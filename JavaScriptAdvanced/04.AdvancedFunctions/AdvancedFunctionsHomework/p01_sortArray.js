function sortArray(inputArray, sortMethod) {
    let ascendingComparator = (a, b) => a - b;
    let descendingComparator = (a, b) => b - a;

    if (sortMethod === 'asc') {
        return inputArray.sort(ascendingComparator);
    }

    return inputArray.sort(descendingComparator);
}