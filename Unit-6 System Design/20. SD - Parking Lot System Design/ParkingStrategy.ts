import { ParkingFloor } from "./ParkingFloor";
import { Vehicle } from "./Vehicle";
import { ParkingSlot } from "./ParkingSlot";

export interface ParkingStrategy {
  findSlot(floors: ParkingFloor[], vehicle: Vehicle): ParkingSlot | null;
}

export class NearestSlotStrategy implements ParkingStrategy {
  findSlot(floors: ParkingFloor[], vehicle: Vehicle): ParkingSlot | null {
    for (const floor of floors) {
      const slot = floor.getAvailableSlotFor(vehicle);
      if (slot) return slot;
    }
    return null;
  }
}
