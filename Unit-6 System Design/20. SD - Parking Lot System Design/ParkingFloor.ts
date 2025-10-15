import { ParkingSlot } from "./ParkingSlot";
import { SlotType } from "./types";
import { Vehicle } from "./Vehicle";

export class ParkingFloor {
  constructor(public floorNumber: number, public slots: ParkingSlot[]) {}

  getAvailableSlotFor(vehicle: Vehicle): ParkingSlot | null {
    for (const slot of this.slots) {
      if (slot.isAvailable) {
        if (vehicle.type === "EV Car" && slot.slotType === SlotType.EV)
          return slot;
        if (slot.slotType === SlotType.NORMAL) return slot;
      }
    }
    return null;
  }
}
