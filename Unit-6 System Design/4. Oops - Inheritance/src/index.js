"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    username;
    constructor(username) {
        this.username = username;
    }
}
class Admin extends User {
    showUsername() {
        console.log(`My username is ${this.username}`);
    }
}
const myAdmin = new Admin("Kartik");
myAdmin.showUsername();
//# sourceMappingURL=index.js.map