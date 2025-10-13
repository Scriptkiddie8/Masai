interface IVehicle {
  start(): void;
}

class Car implements IVehicle {
  start(): void {
    console.log("Car is starting");
  }
}

class Bike implements IVehicle {
  start(): void {
    console.log("Bike is starting");
  }
}

class Driver {
  constructor(private vehicle: IVehicle) {}

  drive(): void {
    this.vehicle.start();
    console.log("Driving...");
  }
}

const carDriver = new Driver(new Car());
carDriver.drive();

const bikeDriver = new Driver(new Bike());
bikeDriver.drive();
