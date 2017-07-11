function solve(array, criteria) {

    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    let tickets = [];
    for (let data of array) {
        let tokens = data.split("|");
        let ticket = new Ticket(tokens[0], Number(tokens[1]), tokens[2]);

        tickets.push(ticket);
    }

    tickets = tickets.sort(mySort);

    function mySort(a, b) {
        return a[criteria] > b[criteria];
    }

    return tickets;
}

console.log(solve(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'destination'));


