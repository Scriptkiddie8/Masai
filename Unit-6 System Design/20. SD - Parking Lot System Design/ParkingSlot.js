"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingSlot = void 0;
const types_1 = require("./types");
const Vehicle_1 = require("./Vehicle");
class ParkingSlot {
    id;
    slotType;
    isAvailable = true;
    parkedVehicle = null;
    constructor(id, slotType) {
        this.id = id;
        this.slotType = slotType;
    }
    park(vehicle) {
        if (!this.isAvailable)
            return false;
        this.isAvailable = false;
        this.parkedVehicle = vehicle;
        return true;
    }
    vacate() {
        const vehicle = this.parkedVehicle;
        this.isAvailable = true;
        this.parkedVehicle = null;
        return vehicle;
    }
}
exports.ParkingSlot = ParkingSlot;
//# sourceMappingURL=ParkingSlot.js.map