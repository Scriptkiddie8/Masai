import { State, IdleState } from "./states";

export class VendingMachine {
  private state: State;
  public selectedItem: string | null = null;

  constructor() {
    this.state = new IdleState();
  }

  getState(): string {
    return this.state.name;
  }

  setState(state: State): void {
    this.state = state;
  }

  insertCoin(): void {
    this.state.insertCoin(this);
  }

  selectItem(item: string): void {
    this.state.selectItem(this, item);
  }

  dispense(): void {
    this.state.dispense(this);
  }
}

export default VendingMachine;
