class Player {
    constructor(nickName) {
        this.nickName = nickName;
        this.scores = [];
    }

    get scoreCount() {
        return this.scores.length;
    }

    get highestScore() {
        if (this.scores.length === 0) {
            return undefined;
        }

        return Math.max.apply(null, this.scores);
    }

    get topFiveScore() {
        let result = [];
        this.scores.sort((n1, n2) => n2 - n1).forEach(e => {
            if (result.length < 5) {
                result.push(e);
            }
        });

        return result;
    }

    addScore(score) {
        if (Number(score) == score) {
            this.scores.push(Number(score));
        }

        return this;
    }

    toString() {
        this.scores = this.scores.sort((n1, n2) => n2 - n1);
        return `${this.nickName}: [${this.scores.join(",")}]`;
    }
}

let p = new Player('Trotro');
p.addScore('pesho');
console.log(p.scoreCount);
console.log(p.toString());
console.log(p.highestScore);
console.log(p.topFiveScore.length);

console.log();
console.log();
console.log();

p.addScore('123');
console.log(p.scoreCount);
console.log(p.toString());
console.log(p.highestScore);
console.log(p.topFiveScore.length);

