"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Polymorphism – Duck Family
class PolyDuck {
    fly() {
        console.log("Duck is flying");
    }
}
class DesiDuck extends PolyDuck {
    fly() {
        console.log("DesiDuck flies at 10kmph");
    }
}
class VidesiDuck extends PolyDuck {
    fly() {
        console.log("VidesiDuck flies at 20kmph");
    }
}
class SmartDuck extends PolyDuck {
    fly() {
        console.log("SmartDuck flies at 50kmph");
    }
}
function makeDuckFly(duck) {
    duck.fly();
}
const desi = new DesiDuck();
const videsi = new VidesiDuck();
const smart = new SmartDuck();
makeDuckFly(desi);
makeDuckFly(videsi);
makeDuckFly(smart);
console.log("");
// Access Modifiers Exploration
class User {
    name;
    orgCode = "DuckCorp";
    role;
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }
    introduce() {
        console.log(`I am ${this.name} from ${this.orgCode}`);
    }
}
class Manager extends User {
    getRole() {
        console.log(this.role);
    }
}
const user = new User("Daffy", "Employee");
user.introduce();
const manager = new Manager("Daffy", "Manager");
manager.getRole();
//# sourceMappingURL=index.js.map