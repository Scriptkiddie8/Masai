import { ParkingFloor } from "./ParkingFloor";
import { ParkingStrategy } from "./ParkingStrategy";
import { Vehicle } from "./Vehicle";
export declare class ParkingLot {
    name: string;
    floors: ParkingFloor[];
    strategy: ParkingStrategy;
    constructor(name: string, floors: ParkingFloor[], strategy: ParkingStrategy);
    parkVehicle(vehicle: Vehicle): boolean;
    vacateVehicle(vehicle: Vehicle, hoursParked: number): void;
}
//# sourceMappingURL=ParkingLot.d.ts.map