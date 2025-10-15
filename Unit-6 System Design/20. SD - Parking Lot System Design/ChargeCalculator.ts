import { Vehicle } from "./Vehicle";
import { VehicleType } from "./types";

export class ChargeCalculator {
  static calculate(vehicle: Vehicle, hours: number): number {
    let rate = 0;
    switch (vehicle.type) {
      case VehicleType.TRUCK:
        rate = 50;
        break;
      case VehicleType.CAR:
        rate = 30;
        break;
      case VehicleType.BIKE:
        rate = 20;
        break;
      case VehicleType.EV_CAR:
        rate = 25;
        break;
    }
    return rate * hours;
  }
}
