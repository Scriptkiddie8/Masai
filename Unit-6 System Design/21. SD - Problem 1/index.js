"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bike {
    brand;
    constructor(brand) {
        this.brand = brand;
    }
    getDetails() {
        return `Bike: ${this.brand}`;
    }
}
class Car {
    brand;
    constructor(brand) {
        this.brand = brand;
    }
    getDetails() {
        return `Car: ${this.brand}`;
    }
}
class VehicleFactory {
    static createVehicle(type, brand) {
        if (type === "Bike")
            return new Bike(brand);
        if (type === "Car")
            return new Car(brand);
        throw new Error(`Unknown vehicle type: ${type}`);
    }
}
const myBike = VehicleFactory.createVehicle("Bike", "Yamaha");
console.log(myBike.getDetails());
const myCar = VehicleFactory.createVehicle("Car", "Toyota");
console.log(myCar.getDetails());
//# sourceMappingURL=index.js.map