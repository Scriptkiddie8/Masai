"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Engine {
    start() {
        console.log("Engine started");
    }
}
class Car {
    engine;
    constructor() {
        this.engine = new Engine();
    }
    drive() {
        this.engine.start();
        console.log("Car is driving");
    }
}
const car = new Car();
car.drive();
//# sourceMappingURL=index.js.map