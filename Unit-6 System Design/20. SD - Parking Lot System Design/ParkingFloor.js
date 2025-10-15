"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingFloor = void 0;
const ParkingSlot_1 = require("./ParkingSlot");
const types_1 = require("./types");
const Vehicle_1 = require("./Vehicle");
class ParkingFloor {
    floorNumber;
    slots;
    constructor(floorNumber, slots) {
        this.floorNumber = floorNumber;
        this.slots = slots;
    }
    getAvailableSlotFor(vehicle) {
        for (const slot of this.slots) {
            if (slot.isAvailable) {
                if (vehicle.type === "EV Car" && slot.slotType === types_1.SlotType.EV)
                    return slot;
                if (slot.slotType === types_1.SlotType.NORMAL)
                    return slot;
            }
        }
        return null;
    }
}
exports.ParkingFloor = ParkingFloor;
//# sourceMappingURL=ParkingFloor.js.map