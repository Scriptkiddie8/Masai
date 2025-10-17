import VendingMachine from "./VendingMachine";

const vm = new VendingMachine();
console.log(`Start state: ${vm.getState()}`);

vm.selectItem("Chips");
vm.insertCoin();
vm.selectItem("Chips");
vm.dispense();

console.log(`End state: ${vm.getState()}`);
