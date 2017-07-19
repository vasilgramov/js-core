class Task {

    constructor(title, deadline) {
        this.title = title;
        this.status = 'Open';
        this._deadline = deadline;
    }


    get deadline() {
        return this._deadline;
    }

    set deadline(value) {
        if (Date.now() > deadline.getTime()) {
            throw new Error("Deadline is past date!");
        }

        this._deadline = value;
    }

    get isOverdue() {
        return Date.now() > this._deadline.getTime() && this.status !== 'Complete';
    }

    static comparator(a, b) {
        if (a.isOverdue && !b.isOverdue) {
            return -1;
        } else if (!a.isOverdue && b.isOverdue) {
            return 1;
        }

        if (a.isOverdue && b.isOverdue) {
            return a._deadline.getTime() - b._deadline.getTime();
        }

        if (a.status === b.status) {
            return a._deadline.getTime() - b._deadline.getTime();
        }

        let map = new Map();
        map.set('In Progress', 1);
        map.set('Open', 2);
        map.set('Complete', 3);

        let aVal = map.get(a.status);
        let bVal = map.get(b.status);

        return aVal - bVal;
    }

    toString() {
        let icon = '';

        if (this.isOverdue) {
            icon = '\u26A0';
        } else if (this.status === 'Open') {
            icon = '\u2731';
        } else if (this.status === 'In Progress') {
            icon = '\u219D';
        } else if (this.status === 'Complete') {
            icon = '\u2714';
        }

        if (icon === '\u26A0') {
            return `[${icon}] ${this.title} (overdue)`;
        } else if (icon === '\u2714') {
            return `[${icon}] ${this.title}`;
        }

        return `[${icon}] ${this.title} (deadline: ${this._deadline})`;
    }
}


let date1 = new Date();
date1.setDate(date1.getDate() + 7); // Set date 7 days from now
let task1 = new Task('JS Homework', date1);
let date2 = new Date();
date2.setFullYear(date2.getFullYear() + 1); // Set date 1 year from now
let task2 = new Task('Start career', date2);
console.log(task1 + '\n' + task2);
console.log();
let date3 = new Date();
date3.setDate(date3.getDate() + 3); // Set date 3 days from now
let task3 = new Task('football', date3);
// // Create two tasks with deadline set to current time
let task4 = new Task('Task 4', new Date());
let task5 = new Task('Task 5', new Date());
task1.status = 'In Progress';
task3.status = 'In Progress';
task5.status = "Complete";
let tasks = [task1, task2, task3, task4, task5];
setTimeout(() => {
    tasks.sort(Task.comparator);
    console.log(tasks.join('\n'));
}, 1000); // Sort and print one second later
//
// // should throw an Error
// let overdueTask = new Task('Overdue Task', new Date(2005, '4', '20'));
// // should throw an Error
task1.deadline = new Date(2005, '4', '20');

