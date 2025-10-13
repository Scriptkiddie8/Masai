interface Observer {
  update(): void;
}

class Smartphone implements Observer {
  update(): void {
    console.log("Smartphone received notification");
  }
}

class Tablet implements Observer {
  update(): void {
    console.log("Tablet received notification");
  }
}

class NotificationCenter {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
    console.log(`Observer added: ${observer.constructor.name}`);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notify(): void {
    this.observers.forEach((o) => o.update());
  }
}

const center = new NotificationCenter();
const phone = new Smartphone();
const tab = new Tablet();

center.attach(phone);
center.attach(tab);

center.notify();
