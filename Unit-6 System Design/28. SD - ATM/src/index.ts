type ATMStateName =
  | "Idle"
  | "CardInserted"
  | "Authenticated"
  | "DispensingCash";

interface ATMState {
  readonly name: ATMStateName;
  insertCard(atm: ATM): void;
  enterPin(atm: ATM, pin: number): void;
  requestCash(atm: ATM, amount: number): void;
  dispense(atm: ATM): void;
  ejectCard(atm: ATM): void;
}

class IdleState implements ATMState {
  readonly name = "Idle" as const;
  insertCard(atm: ATM): void {
    console.log("Card inserted");
    atm.setState(new CardInsertedState());
  }
  enterPin(): void {
    console.log("Insert card first");
  }
  requestCash(): void {
    console.log("Insert card and enter PIN");
  }
  dispense(): void {
    console.log("Nothing to dispense");
  }
  ejectCard(): void {
    console.log("No card to eject");
  }
}

class CardInsertedState implements ATMState {
  readonly name = "CardInserted" as const;
  insertCard(): void {
    console.log("Card already inserted");
  }
  enterPin(atm: ATM, pin: number): void {
    if (atm.verifyPin(pin)) {
      console.log("PIN accepted");
      atm.setState(new AuthenticatedState());
    } else {
      console.log("Invalid PIN");
    }
  }
  requestCash(): void {
    console.log("Enter PIN first");
  }
  dispense(): void {
    console.log("Enter PIN and request cash first");
  }
  ejectCard(atm: ATM): void {
    console.log("Card ejected");
    atm.setState(new IdleState());
  }
}

class AuthenticatedState implements ATMState {
  readonly name = "Authenticated" as const;
  insertCard(): void {
    console.log("Card already inserted");
  }
  enterPin(): void {
    console.log("Already authenticated");
  }
  requestCash(atm: ATM, amount: number): void {
    if (!atm.hasCash(amount)) {
      console.log("Insufficient ATM funds");
      return;
    }
    atm.debit(amount);
    console.log(`Withdrawing ${amount}`);
    atm.setState(new DispensingCashState());
  }
  dispense(): void {
    console.log("Request cash first");
  }
  ejectCard(atm: ATM): void {
    console.log("Card ejected");
    atm.setState(new IdleState());
  }
}

class DispensingCashState implements ATMState {
  readonly name = "DispensingCash" as const;
  insertCard(): void {
    console.log("Please wait, dispensing");
  }
  enterPin(): void {
    console.log("Please wait, dispensing");
  }
  requestCash(): void {
    console.log("Please wait, dispensing");
  }
  dispense(atm: ATM): void {
    console.log(`Dispensed ${atm.lastDispensed}. Thank you`);
    atm.lastDispensed = 0;
    atm.setState(new IdleState());
  }
  ejectCard(): void {
    console.log("Please wait, dispensing");
  }
}

class ATM {
  private state: ATMState = new IdleState();
  private cash: number;
  private readonly correctPin: number;
  lastDispensed = 0;

  constructor(cash: number, pin: number = 1234) {
    this.cash = cash;
    this.correctPin = pin;
  }

  getState(): ATMStateName {
    return this.state.name;
  }
  setState(s: ATMState): void {
    this.state = s;
  }

  verifyPin(pin: number): boolean {
    return pin === this.correctPin;
  }
  hasCash(amount: number): boolean {
    return amount <= this.cash;
  }
  debit(amount: number): void {
    this.cash -= amount;
    this.lastDispensed = amount;
  }

  insertCard(): void {
    this.state.insertCard(this);
  }
  enterPin(pin: number): void {
    this.state.enterPin(this, pin);
  }
  requestCash(amount: number): void {
    this.state.requestCash(this, amount);
  }
}
