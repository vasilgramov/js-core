function solve() {

    class Person {
        constructor(name, email) {
            this.name = name;
            this.email = email;
        }

        toString() {
            return `${this.constructor.name} (name: ${this.name}, email: ${this.email})`;
        }
    }

    class Teacher extends Person {
        constructor(name, email, subject) {
            super(name, email);

            this.subject = subject
        }

        toString() {
            let string = super.toString().slice(0, -1);
            return string + `, subject: ${this.subject})`
        }
    }

    class Student extends Person {
        constructor(name, email, course) {
            super(name, email);

            this.course = course;
        }

        toString() {
            let string = super.toString().slice(0, -1);
            return string + `, course: ${this.course})`;
        }
    }

    return {
        Person,
        Teacher,
        Student
    };
}

let Person = solve().Person;
let Teacher = solve().Teacher;

let person = new Person('gosho', 'gosho@abv.bg');
let teacher = new Teacher('gosho', 'gosho@abv.bg', 'goshovko');

console.log(person.toString());
console.log(teacher.toString());