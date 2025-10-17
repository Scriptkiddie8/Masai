"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VendingMachine_1 = __importDefault(require("./VendingMachine"));
const vm = new VendingMachine_1.default();
console.log(`Start state: ${vm.getState()}`);
vm.selectItem("Chips");
vm.insertCoin();
vm.selectItem("Chips");
vm.dispense();
console.log(`End state: ${vm.getState()}`);
