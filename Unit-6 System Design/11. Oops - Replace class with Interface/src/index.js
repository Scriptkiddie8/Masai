"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Car {
    start() {
        console.log("Car is starting");
    }
}
class Bike {
    start() {
        console.log("Bike is starting");
    }
}
class Driver {
    vehicle;
    constructor(vehicle) {
        this.vehicle = vehicle;
    }
    drive() {
        this.vehicle.start();
        console.log("Driving...");
    }
}
const carDriver = new Driver(new Car());
carDriver.drive();
const bikeDriver = new Driver(new Bike());
bikeDriver.drive();
//# sourceMappingURL=index.js.map