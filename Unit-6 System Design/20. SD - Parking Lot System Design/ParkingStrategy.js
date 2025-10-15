"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NearestSlotStrategy = void 0;
const ParkingFloor_1 = require("./ParkingFloor");
const Vehicle_1 = require("./Vehicle");
const ParkingSlot_1 = require("./ParkingSlot");
class NearestSlotStrategy {
    findSlot(floors, vehicle) {
        for (const floor of floors) {
            const slot = floor.getAvailableSlotFor(vehicle);
            if (slot)
                return slot;
        }
        return null;
    }
}
exports.NearestSlotStrategy = NearestSlotStrategy;
//# sourceMappingURL=ParkingStrategy.js.map