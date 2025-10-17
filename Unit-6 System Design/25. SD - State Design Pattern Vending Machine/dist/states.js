"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispensingState = exports.ProcessingState = exports.IdleState = void 0;
class IdleState {
    constructor() {
        this.name = "Idle";
    }
    insertCoin(machine) {
        console.log("Coin inserted → Processing");
        machine.setState(new ProcessingState());
    }
    selectItem() {
        console.log("Insert coin first.");
    }
    dispense() {
        console.log("Nothing to dispense. Insert coin and select an item.");
    }
}
exports.IdleState = IdleState;
class ProcessingState {
    constructor() {
        this.name = "Processing";
    }
    insertCoin() {
        console.log("Coin already inserted.");
    }
    selectItem(machine, item) {
        console.log(`Selected: ${item} → Dispensing`);
        machine.selectedItem = item;
        machine.setState(new DispensingState());
    }
    dispense() {
        console.log("Select an item first.");
    }
}
exports.ProcessingState = ProcessingState;
class DispensingState {
    constructor() {
        this.name = "Dispensing";
    }
    insertCoin() {
        console.log("Please wait, dispensing in progress.");
    }
    selectItem() {
        console.log("Already dispensing, please wait.");
    }
    dispense(machine) {
        var _a;
        const item = (_a = machine.selectedItem) !== null && _a !== void 0 ? _a : "item";
        console.log(`Dispensing ${item}... Done → Idle`);
        machine.selectedItem = null;
        machine.setState(new IdleState());
    }
}
exports.DispensingState = DispensingState;
