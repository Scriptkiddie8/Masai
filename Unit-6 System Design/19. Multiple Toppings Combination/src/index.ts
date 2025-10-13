abstract class Beverage {
  abstract getDescription(): string;
  abstract getCost(): number;
}

class GreenTea extends Beverage {
  getDescription(): string {
    return "Green Tea";
  }
  getCost(): number {
    return 40;
  }
}

class Sugar extends Beverage {
  constructor(private base: Beverage) {
    super();
  }
  getDescription(): string {
    return `${this.base.getDescription()} + Sugar`;
  }
  getCost(): number {
    return this.base.getCost() + 10;
  }
}

class Honey extends Beverage {
  constructor(private base: Beverage) {
    super();
  }
  getDescription(): string {
    return `${this.base.getDescription()} + Honey`;
  }
  getCost(): number {
    return this.base.getCost() + 20;
  }
}

const tea = new Honey(new Sugar(new GreenTea()));
console.log(tea.getDescription());
console.log(tea.getCost());
