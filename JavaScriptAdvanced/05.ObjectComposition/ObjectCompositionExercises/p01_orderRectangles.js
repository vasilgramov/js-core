function solve(array) {
    let rectangles = [];

    for (let rectangle of array) {
        let width = rectangle[0];
        let height = rectangle[1];
        let currentRectangle = {
            width: width,
            height: height,
            area: () => currentRectangle.width * currentRectangle.height,
            compareTo: function(other) {
                let result = other.area() - this.area();
                if (result === 0) {
                    return other.width - this.width;
                }
                return result;
            }
        };

        rectangles.push(currentRectangle);
    }

    return rectangles.sort((r1, r2) => r1.compareTo(r2));
}

solve([[10,5],[5,12]]);