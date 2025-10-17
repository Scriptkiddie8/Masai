"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendingMachine = void 0;
const states_1 = require("./states");
class VendingMachine {
    constructor() {
        this.selectedItem = null;
        this.state = new states_1.IdleState();
    }
    getState() {
        return this.state.name;
    }
    setState(state) {
        this.state = state;
    }
    insertCoin() {
        this.state.insertCoin(this);
    }
    selectItem(item) {
        this.state.selectItem(this, item);
    }
    dispense() {
        this.state.dispense(this);
    }
}
exports.VendingMachine = VendingMachine;
exports.default = VendingMachine;
