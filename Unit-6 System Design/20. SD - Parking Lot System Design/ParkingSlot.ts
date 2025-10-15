import { SlotType } from "./types";
import { Vehicle } from "./Vehicle";

export class ParkingSlot {
  public isAvailable: boolean = true;
  public parkedVehicle: Vehicle | null = null;

  constructor(public id: number, public slotType: SlotType) {}

  park(vehicle: Vehicle): boolean {
    if (!this.isAvailable) return false;
    this.isAvailable = false;
    this.parkedVehicle = vehicle;
    return true;
  }

  vacate(): Vehicle | null {
    const vehicle = this.parkedVehicle;
    this.isAvailable = true;
    this.parkedVehicle = null;
    return vehicle;
  }
}
