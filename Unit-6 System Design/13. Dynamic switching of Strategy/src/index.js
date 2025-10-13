"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bike {
    start() {
        console.log("Bike is starting");
    }
}
class Car {
    start() {
        console.log("Car is starting");
    }
}
class Driver {
    vehicle;
    constructor(vehicle) {
        this.vehicle = vehicle;
    }
    setVehicle(vehicle) {
        this.vehicle = vehicle;
    }
    drive() {
        this.vehicle.start();
        console.log("Driving...");
    }
}
const driver = new Driver(new Bike());
driver.drive();
driver.setVehicle(new Car());
driver.drive();
//# sourceMappingURL=index.js.map