"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargeCalculator = void 0;
const Vehicle_1 = require("./Vehicle");
const types_1 = require("./types");
class ChargeCalculator {
    static calculate(vehicle, hours) {
        let rate = 0;
        switch (vehicle.type) {
            case types_1.VehicleType.TRUCK:
                rate = 50;
                break;
            case types_1.VehicleType.CAR:
                rate = 30;
                break;
            case types_1.VehicleType.BIKE:
                rate = 20;
                break;
            case types_1.VehicleType.EV_CAR:
                rate = 25;
                break;
        }
        return rate * hours;
    }
}
exports.ChargeCalculator = ChargeCalculator;
//# sourceMappingURL=ChargeCalculator.js.map