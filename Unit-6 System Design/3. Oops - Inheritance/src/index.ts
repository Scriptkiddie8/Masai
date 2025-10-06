class Vehicle {
  brand: string;
  speed: number;

  constructor(brand: string, speed: number) {
    this.brand = brand;
    this.speed = speed;
  }

  drive(): void {
    console.log(`Driving at speed ${this.speed} km/h`);
  }
}

class Car extends Vehicle {
  fuelType: string;

  constructor(brand: string, speed: number, fuelType: string) {
    super(brand, speed);
    this.fuelType = fuelType;
  }

  refuel(): void {
    console.log(`Refuling: ${this.fuelType}`);
  }
}

const myCar = new Car("Range Rover", 220, "Diesel");

myCar.drive();
myCar.refuel();
