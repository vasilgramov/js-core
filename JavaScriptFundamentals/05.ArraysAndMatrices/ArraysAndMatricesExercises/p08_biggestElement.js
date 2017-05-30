let fun = matrix => console.log(Math.max.apply(null, matrix.reduce((row1, row2) => row1.concat(row2))));
