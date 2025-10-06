class Person {
  walk(): void {
    console.log("Person is walking...");
  }
}

interface Coder {
  code(): void;
}

class Developer extends Person implements Coder {
  walk(): void {
    console.log("Developer is walking in office...");
  }

  code(): void {
    console.log("Developer is writing TypeScript code...");
  }
}

const dev = new Developer();

dev.walk();
dev.code();
