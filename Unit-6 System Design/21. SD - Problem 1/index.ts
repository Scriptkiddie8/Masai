interface Vehicle {
  getDetails(): string;
}

class Bike implements Vehicle {
  constructor(private brand: string) {}
  getDetails() {
    return `Bike: ${this.brand}`;
  }
}

class Car implements Vehicle {
  constructor(private brand: string) {}
  getDetails() {
    return `Car: ${this.brand}`;
  }
}

type VehicleType = "Bike" | "Car";

class VehicleFactory {
  static createVehicle(type: "Bike", brand: string): Bike;
  static createVehicle(type: "Car", brand: string): Car;
  static createVehicle(type: VehicleType, brand: string): Vehicle {
    if (type === "Bike") return new Bike(brand);
    if (type === "Car") return new Car(brand);
    throw new Error(`Unknown vehicle type: ${type}`);
  }
}

const myBike = VehicleFactory.createVehicle("Bike", "Yamaha");
console.log(myBike.getDetails());
const myCar = VehicleFactory.createVehicle("Car", "Toyota");
console.log(myCar.getDetails());
