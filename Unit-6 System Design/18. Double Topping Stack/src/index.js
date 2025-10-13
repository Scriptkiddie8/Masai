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
class Sugar extends Beverage {
    base;
    constructor(base) {
        super();
        this.base = base;
    }
    getDescription() {
        return `${this.base.getDescription()} + Sugar`;
    }
    getCost() {
        return this.base.getCost() + 10;
    }
}
const tea = new Sugar(new Sugar(new GreenTea()));
console.log(tea.getDescription());
console.log(tea.getCost());
//# sourceMappingURL=index.js.map