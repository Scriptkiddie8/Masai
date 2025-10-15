"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const ParkingLot_1 = require("./ParkingLot");
const ParkingFloor_1 = require("./ParkingFloor");
const ParkingSlot_1 = require("./ParkingSlot");
const Vehicle_1 = require("./Vehicle");
const types_1 = require("./types");
const ParkingStrategy_1 = require("./ParkingStrategy");
const floor1 = new ParkingFloor_1.ParkingFloor(1, [
    new ParkingSlot_1.ParkingSlot(1, types_1.SlotType.EV),
    new ParkingSlot_1.ParkingSlot(2, types_1.SlotType.NORMAL),
    new ParkingSlot_1.ParkingSlot(3, types_1.SlotType.NORMAL),
]);
const floor2 = new ParkingFloor_1.ParkingFloor(2, [
    new ParkingSlot_1.ParkingSlot(4, types_1.SlotType.EV),
    new ParkingSlot_1.ParkingSlot(5, types_1.SlotType.NORMAL),
    new ParkingSlot_1.ParkingSlot(6, types_1.SlotType.NORMAL),
]);
const lot = new ParkingLot_1.ParkingLot("City Center", [floor1, floor2], new ParkingStrategy_1.NearestSlotStrategy());
const car1 = new Vehicle_1.Vehicle("CAR123", types_1.VehicleType.CAR);
const ev1 = new Vehicle_1.Vehicle("EV999", types_1.VehicleType.EV_CAR);
lot.parkVehicle(car1);
lot.parkVehicle(ev1);
lot.vacateVehicle(car1, 3);
lot.vacateVehicle(ev1, 2);
//# sourceMappingURL=index.js.map