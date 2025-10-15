import { ParkingFloor } from "./ParkingFloor";
import { Vehicle } from "./Vehicle";
import { ParkingSlot } from "./ParkingSlot";
export interface ParkingStrategy {
    findSlot(floors: ParkingFloor[], vehicle: Vehicle): ParkingSlot | null;
}
export declare class NearestSlotStrategy implements ParkingStrategy {
    findSlot(floors: ParkingFloor[], vehicle: Vehicle): ParkingSlot | null;
}
//# sourceMappingURL=ParkingStrategy.d.ts.map