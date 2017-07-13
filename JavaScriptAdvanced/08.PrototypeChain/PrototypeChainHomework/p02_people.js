function solve() {

    class Employee {
        constructor(name, age) {
            if (new.target === Employee) {
                throw new Error("Cannot instance directly.");
            }

            this.name = name;
            this.age = age;

            this.salary = 0;
            this.tasks = [];
        }

        getSalary() {
            return this.salary;
        }

        work() {
            let tasks = this.tasks.shift();
            console.log(tasks);
            this.tasks.push(tasks);
        }

        collectSalary() {
            console.log(`${this.name} received ${this.getSalary()} this month.`);
        }
    }

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age);

            this.tasks.push(`${this.name} is working on a simple task.`)
        }
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age);

            this.tasks.push(`${this.name} is working on a complicated task.`);
            this.tasks.push(`${this.name} is taking time off work.`);
            this.tasks.push(`${this.name} is supervising junior workers.`);
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age);
            this.dividend = 0;

            this.tasks.push(`${this.name} scheduled a meeting.`);
            this.tasks.push(`${this.name} is preparing a quarterly report.`);
        }

        getSalary() {
            return this.salary + this.dividend;
        }
    }

    return {
        Employee,
        Junior,
        Senior,
        Manager
    };
}


