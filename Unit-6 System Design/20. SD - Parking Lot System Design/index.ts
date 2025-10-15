// index.ts
import { ParkingLot } from "./ParkingLot";
import { ParkingFloor } from "./ParkingFloor";
import { ParkingSlot } from "./ParkingSlot";
import { Vehicle } from "./Vehicle";
import { VehicleType, SlotType } from "./types";
import { NearestSlotStrategy } from "./ParkingStrategy";

const floor1 = new ParkingFloor(1, [
  new ParkingSlot(1, SlotType.EV),
  new ParkingSlot(2, SlotType.NORMAL),
  new ParkingSlot(3, SlotType.NORMAL),
]);

const floor2 = new ParkingFloor(2, [
  new ParkingSlot(4, SlotType.EV),
  new ParkingSlot(5, SlotType.NORMAL),
  new ParkingSlot(6, SlotType.NORMAL),
]);

const lot = new ParkingLot(
  "City Center",
  [floor1, floor2],
  new NearestSlotStrategy()
);

const car1 = new Vehicle("CAR123", VehicleType.CAR);
const ev1 = new Vehicle("EV999", VehicleType.EV_CAR);

lot.parkVehicle(car1);
lot.parkVehicle(ev1);

lot.vacateVehicle(car1, 3);
lot.vacateVehicle(ev1, 2);
