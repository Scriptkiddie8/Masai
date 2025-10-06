class User {
  protected username: string;

  constructor(username: string) {
    this.username = username;
  }
}

class Admin extends User {
  showUsername(): void {
    console.log(`My username is ${this.username}`);
  }
}

const myAdmin = new Admin("Kartik");
myAdmin.showUsername();
