"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Student {
    name;
    age;
    rollno;
    constructor(name, age, rollno) {
        this.name = name;
        this.age = age;
        this.rollno = rollno;
    }
    displayDetails() {
        console.log(`Hey, my name is ${this.name} and i'm ${this.age} old and have roll no ${this.rollno}`);
    }
}
const student1 = new Student("Kartik", 24, 17);
const student2 = new Student("Kashish", 25, 18);
student1.displayDetails();
student2.displayDetails();
//# sourceMappingURL=index.js.map