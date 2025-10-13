interface Vehicle {
  start(): void;
}

class Bike implements Vehicle {
  start(): void {
    console.log("Bike is starting");
  }
}

class Car implements Vehicle {
  start(): void {
    console.log("Car is starting");
  }
}

class Driver {
  constructor(private vehicle: Vehicle) {}

  setVehicle(vehicle: Vehicle): void {
    this.vehicle = vehicle;
  }

  drive(): void {
    this.vehicle.start();
    console.log("Driving...");
  }
}

const driver = new Driver(new Bike());
driver.drive();

driver.setVehicle(new Car());
driver.drive();
