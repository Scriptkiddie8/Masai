"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FastFly {
    fly() {
        console.log("Flying fast like a rocket!");
    }
}
class NoFly {
    fly() {
        console.log("I cannot fly");
    }
}
class Duck {
    flyStrategy;
    constructor(flyStrategy) {
        this.flyStrategy = flyStrategy;
    }
    performFly() {
        this.flyStrategy.fly();
    }
    setFlyStrategy(flyStrategy) {
        this.flyStrategy = flyStrategy;
    }
}
const duck = new Duck(new FastFly());
duck.performFly();
duck.setFlyStrategy(new NoFly());
duck.performFly();
//# sourceMappingURL=index.js.map