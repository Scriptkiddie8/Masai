"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Smartphone {
    update() {
        console.log("Smartphone received notification");
    }
}
class Tablet {
    update() {
        console.log("Tablet received notification");
    }
}
class NotificationCenter {
    observers = [];
    attach(observer) {
        this.observers.push(observer);
        console.log(`Observer added: ${observer.constructor.name}`);
    }
    detach(observer) {
        this.observers = this.observers.filter((o) => o !== observer);
    }
    notify() {
        this.observers.forEach((o) => o.update());
    }
}
const center = new NotificationCenter();
const phone = new Smartphone();
const tab = new Tablet();
center.attach(phone);
center.attach(tab);
center.notify();
//# sourceMappingURL=index.js.map