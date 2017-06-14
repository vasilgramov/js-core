function solve(array) {
    let map = new Map();

    for (let obj of array) {
        let system = obj['system'];
        let candidate = obj['candidate'];
        let votes = Number(obj['votes']);

        if (!map.has(system)) {
            map.set(system, new Map());
        }

        let candidateVotes = map.get(system);
        if (!candidateVotes.has(candidate)) {
            candidateVotes.set(candidate, 0);
        }

        let currentVotes = candidateVotes.get(candidate);
        candidateVotes.set(candidate, currentVotes + votes);
    }

    let winnersFromSystems = new Map();
    [...map].forEach(([system, candidate]) => {
        let winnerName = '';
        let winnerVotes = 0;

        [...candidate].forEach(([name, votes]) => {
            if (votes > winnerVotes) {
                winnerName = name;
                winnerVotes = votes;
            }
        });

        [...candidate].forEach(([name, votes]) => {
            if (name !== winnerName) {
                winnerVotes += votes;
            }
        });

        let winnerArgs = [winnerName, winnerVotes];
        winnersFromSystems.set(system, winnerArgs);
    });

    let firstName = '';
    let firstVotes = -1;
    let secondName = '';
    let secondVotes = -1;

    let totalVotes = 0;

    [...winnersFromSystems].sort(function (s1, s2) {
        return s2[1][1] - s1[1][1];
    }).forEach(([system, candidate]) => {
        if (firstName === '') {
            firstName = candidate[0];
            firstVotes = candidate[1];
        } else if (secondName === '' && candidate[0] !== firstName) {
            secondName = candidate[0];
            secondVotes = candidate[1];
        }

        totalVotes += candidate[1];
    });

    let oneWinner = true;
    [...winnersFromSystems].forEach(([system, candidate]) => {
        if (firstName !== candidate[0]) {
            oneWinner = false;
        }
    });

    if (oneWinner) {
        firstVotes = 0;
        [...winnersFromSystems].forEach(([system, candidate]) => {
            firstVotes += candidate[1];
        });

        console.log(`${firstName} wins with ${firstVotes} votes`);
        console.log(`${firstName} wins unopposed!`);

        return;
    }

    let firstCanTotalVotes = 0;
    [...winnersFromSystems].forEach(([system, candidate]) => {
        if (candidate[0] === firstName) {
            firstCanTotalVotes += candidate[1];
        }
    });

    if (totalVotes < firstCanTotalVotes * 2) {
        console.log(`${firstName} wins with ${firstCanTotalVotes} votes`);
        console.log(`Runner up: ${secondName}`);
        [...winnersFromSystems].sort(function (s1, s2) {
            return s2[1][1] - s1[1][1];
        }).forEach(([system, candidate]) => {
            if (candidate[0] === secondName) {
                console.log(`${system}: ${candidate[1]}`);
            }
        });
    } else {
        firstVotes = 0;
        secondVotes = 0;
        [...winnersFromSystems].forEach(([system, candidate]) => {
            if (candidate[0] === firstName) {
                firstVotes += candidate[1];
            }

            if (candidate[0] === secondName) {
                secondVotes = candidate[1];
            }
        });

        let per1 = Math.floor((firstVotes / totalVotes) * 100);
        let per2 = Math.floor((secondVotes / totalVotes) * 100);
        console.log(`Runoff between ${firstName} with ${per1}% and ${secondName} with ${per2}%`);
    }
}