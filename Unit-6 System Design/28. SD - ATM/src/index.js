"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IdleState {
    name = "Idle";
    insertCard(atm) {
        console.log("Card inserted");
        atm.setState(new CardInsertedState());
    }
    enterPin() {
        console.log("Insert card first");
    }
    requestCash() {
        console.log("Insert card and enter PIN");
    }
    dispense() {
        console.log("Nothing to dispense");
    }
    ejectCard() {
        console.log("No card to eject");
    }
}
class CardInsertedState {
    name = "CardInserted";
    insertCard() {
        console.log("Card already inserted");
    }
    enterPin(atm, pin) {
        if (atm.verifyPin(pin)) {
            console.log("PIN accepted");
            atm.setState(new AuthenticatedState());
        }
        else {
            console.log("Invalid PIN");
        }
    }
    requestCash() {
        console.log("Enter PIN first");
    }
    dispense() {
        console.log("Enter PIN and request cash first");
    }
    ejectCard(atm) {
        console.log("Card ejected");
        atm.setState(new IdleState());
    }
}
class AuthenticatedState {
    name = "Authenticated";
    insertCard() {
        console.log("Card already inserted");
    }
    enterPin() {
        console.log("Already authenticated");
    }
    requestCash(atm, amount) {
        if (!atm.hasCash(amount)) {
            console.log("Insufficient ATM funds");
            return;
        }
        atm.debit(amount);
        console.log(`Withdrawing ${amount}`);
        atm.setState(new DispensingCashState());
    }
    dispense() {
        console.log("Request cash first");
    }
    ejectCard(atm) {
        console.log("Card ejected");
        atm.setState(new IdleState());
    }
}
class DispensingCashState {
    name = "DispensingCash";
    insertCard() {
        console.log("Please wait, dispensing");
    }
    enterPin() {
        console.log("Please wait, dispensing");
    }
    requestCash() {
        console.log("Please wait, dispensing");
    }
    dispense(atm) {
        console.log(`Dispensed ${atm.lastDispensed}. Thank you`);
        atm.lastDispensed = 0;
        atm.setState(new IdleState());
    }
    ejectCard() {
        console.log("Please wait, dispensing");
    }
}
class ATM {
    state = new IdleState();
    cash;
    correctPin;
    lastDispensed = 0;
    constructor(cash, pin = 1234) {
        this.cash = cash;
        this.correctPin = pin;
    }
    getState() {
        return this.state.name;
    }
    setState(s) {
        this.state = s;
    }
    verifyPin(pin) {
        return pin === this.correctPin;
    }
    hasCash(amount) {
        return amount <= this.cash;
    }
    debit(amount) {
        this.cash -= amount;
        this.lastDispensed = amount;
    }
    insertCard() {
        this.state.insertCard(this);
    }
    enterPin(pin) {
        this.state.enterPin(this, pin);
    }
    requestCash(amount) {
        this.state.requestCash(this, amount);
    }
}
//# sourceMappingURL=index.js.map