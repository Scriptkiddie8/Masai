"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Beverage {
}
class GreenTea extends Beverage {
    getDescription() {
        return "Green Tea";
    }
    getCost() {
        return 40;
    }
}
const tea = new GreenTea();
console.log(tea.getDescription());
console.log(tea.getCost());
//# sourceMappingURL=index.js.map