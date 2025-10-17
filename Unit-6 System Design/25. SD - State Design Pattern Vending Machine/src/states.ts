import type { VendingMachine } from "./VendingMachine";

export interface State {
  readonly name: "Idle" | "Processing" | "Dispensing";
  insertCoin(machine: VendingMachine): void;
  selectItem(machine: VendingMachine, item: string): void;
  dispense(machine: VendingMachine): void;
}

export class IdleState implements State {
  name = "Idle" as const;
  insertCoin(machine: VendingMachine): void {
    console.log("Coin inserted → Processing");
    machine.setState(new ProcessingState());
  }
  selectItem(): void {
    console.log("Insert coin first.");
  }
  dispense(): void {
    console.log("Nothing to dispense. Insert coin and select an item.");
  }
}

export class ProcessingState implements State {
  name = "Processing" as const;
  insertCoin(): void {
    console.log("Coin already inserted.");
  }
  selectItem(machine: VendingMachine, item: string): void {
    console.log(`Selected: ${item} → Dispensing`);
    machine.selectedItem = item;
    machine.setState(new DispensingState());
  }
  dispense(): void {
    console.log("Select an item first.");
  }
}

export class DispensingState implements State {
  name = "Dispensing" as const;
  insertCoin(): void {
    console.log("Please wait, dispensing in progress.");
  }
  selectItem(): void {
    console.log("Already dispensing, please wait.");
  }
  dispense(machine: VendingMachine): void {
    const item = machine.selectedItem ?? "item";
    console.log(`Dispensing ${item}... Done → Idle`);
    machine.selectedItem = null;
    machine.setState(new IdleState());
  }
}
