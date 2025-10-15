"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingLot = void 0;
const ParkingFloor_1 = require("./ParkingFloor");
const ParkingStrategy_1 = require("./ParkingStrategy");
const Vehicle_1 = require("./Vehicle");
const ChargeCalculator_1 = require("./ChargeCalculator");
class ParkingLot {
    name;
    floors;
    strategy;
    constructor(name, floors, strategy) {
        this.name = name;
        this.floors = floors;
        this.strategy = strategy;
    }
    parkVehicle(vehicle) {
        const slot = this.strategy.findSlot(this.floors, vehicle);
        if (!slot) {
            console.log("No available slot for", vehicle.type);
            return false;
        }
        slot.park(vehicle);
        console.log(`${vehicle.type} parked at slot ${slot.id}`);
        return true;
    }
    vacateVehicle(vehicle, hoursParked) {
        for (const floor of this.floors) {
            for (const slot of floor.slots) {
                if (slot.parkedVehicle?.regNumber === vehicle.regNumber) {
                    slot.vacate();
                    const charge = ChargeCalculator_1.ChargeCalculator.calculate(vehicle, hoursParked);
                    console.log(`Vehicle ${vehicle.regNumber} left. Charge: ₹${charge}`);
                    return;
                }
            }
        }
        console.log("Vehicle not found");
    }
}
exports.ParkingLot = ParkingLot;
//# sourceMappingURL=ParkingLot.js.map