import { SlotType } from "./types";
import { Vehicle } from "./Vehicle";
export declare class ParkingSlot {
    id: number;
    slotType: SlotType;
    isAvailable: boolean;
    parkedVehicle: Vehicle | null;
    constructor(id: number, slotType: SlotType);
    park(vehicle: Vehicle): boolean;
    vacate(): Vehicle | null;
}
//# sourceMappingURL=ParkingSlot.d.ts.map