"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PetrolEngine {
    start() {
        console.log("Petrol engine started");
    }
}
class DieselEngine {
    start() {
        console.log("Diesel engine started");
    }
}
class Car {
    engine;
    constructor(engine) {
        this.engine = engine;
    }
    drive() {
        this.engine.start();
        console.log("Driving car");
    }
}
const petrolCar = new Car(new PetrolEngine());
petrolCar.drive();
const dieselCar = new Car(new DieselEngine());
dieselCar.drive();
//# sourceMappingURL=index.js.map