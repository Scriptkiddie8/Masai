import { ParkingSlot } from "./ParkingSlot";
import { Vehicle } from "./Vehicle";
export declare class ParkingFloor {
    floorNumber: number;
    slots: ParkingSlot[];
    constructor(floorNumber: number, slots: ParkingSlot[]);
    getAvailableSlotFor(vehicle: Vehicle): ParkingSlot | null;
}
//# sourceMappingURL=ParkingFloor.d.ts.map