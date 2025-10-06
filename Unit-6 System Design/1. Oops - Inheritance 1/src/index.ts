class Student {
  name: string;
  age: number;
  rollno: number;

  constructor(name: string, age: number, rollno: number) {
    this.name = name;
    this.age = age;
    this.rollno = rollno;
  }

  displayDetails(): void {
    console.log(
      `Hey, my name is ${this.name} and i'm ${this.age} old and have roll no ${this.rollno}`
    );
  }
}

const student1 = new Student("Kartik", 24, 17);
const student2 = new Student("Kashish", 25, 18);

student1.displayDetails();
student2.displayDetails();
