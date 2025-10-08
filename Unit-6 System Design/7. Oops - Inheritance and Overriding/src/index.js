"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//  Basic Inheritance
class Duck {
    swim() {
        console.log("I know swimming");
    }
}
class MallardDuck extends Duck {
}
const mallard = new MallardDuck();
mallard.swim();
console.log("");
//  Method Overriding Basics
class Bird {
    fly() {
        console.log("I can fly");
    }
}
class Penguin extends Bird {
    fly() {
        console.log("I cannot fly");
    }
}
const bird = new Bird();
const penguin = new Penguin();
bird.fly();
penguin.fly();
console.log("");
class ToyDuck {
    swim() {
        console.log("Can float on water");
    }
    fly() {
        console.log("Cannot fly");
    }
    sound() {
        console.log("Cannot sound");
    }
}
const toyDuck = new ToyDuck();
toyDuck.fly();
toyDuck.sound();
toyDuck.swim();
//# sourceMappingURL=index.js.map