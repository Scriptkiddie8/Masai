import { ParkingFloor } from "./ParkingFloor";
import { ParkingStrategy } from "./ParkingStrategy";
import { Vehicle } from "./Vehicle";
import { ChargeCalculator } from "./ChargeCalculator";

export class ParkingLot {
  constructor(
    public name: string,
    public floors: ParkingFloor[],
    public strategy: ParkingStrategy
  ) {}

  parkVehicle(vehicle: Vehicle): boolean {
    const slot = this.strategy.findSlot(this.floors, vehicle);
    if (!slot) {
      console.log("No available slot for", vehicle.type);
      return false;
    }
    slot.park(vehicle);
    console.log(`${vehicle.type} parked at slot ${slot.id}`);
    return true;
  }

  vacateVehicle(vehicle: Vehicle, hoursParked: number) {
    for (const floor of this.floors) {
      for (const slot of floor.slots) {
        if (slot.parkedVehicle?.regNumber === vehicle.regNumber) {
          slot.vacate();
          const charge = ChargeCalculator.calculate(vehicle, hoursParked);
          console.log(`Vehicle ${vehicle.regNumber} left. Charge: ₹${charge}`);
          return;
        }
      }
    }
    console.log("Vehicle not found");
  }
}
