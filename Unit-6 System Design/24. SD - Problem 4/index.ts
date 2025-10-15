interface Character {
  getStats(): string;
}

class Warrior implements Character {
  constructor(
    private name: string,
    private strength: number = 85,
    private defense: number = 70
  ) {}
  getStats(): string {
    return `Warrior ${this.name} - Strength: ${this.strength}, Defense: ${this.defense}`;
  }
}

class Archer implements Character {
  constructor(
    private name: string,
    private agility: number = 80,
    private strength: number = 40
  ) {}
  getStats(): string {
    return `Archer ${this.name} - Agility: ${this.agility}, Strength: ${this.strength}`;
  }
}

class Mage implements Character {
  constructor(
    private name: string,
    private intelligence: number = 90,
    private mana: number = 100
  ) {}
  getStats(): string {
    return `Mage ${this.name} - Intelligence: ${this.intelligence}, Mana: ${this.mana}`;
  }
}

type CharacterType = "Warrior" | "Archer" | "Mage";

class CharacterFactory {
  static createCharacter(type: "Warrior", name: string): Warrior;
  static createCharacter(type: "Archer", name: string): Archer;
  static createCharacter(type: "Mage", name: string): Mage;
  static createCharacter(type: CharacterType, name: string): Character {
    switch (type) {
      case "Warrior":
        return new Warrior(name);
      case "Archer":
        return new Archer(name);
      case "Mage":
        return new Mage(name);
      default:
        throw new Error(`Unknown character type: ${type}`);
    }
  }
}

const archer = CharacterFactory.createCharacter("Archer", "Eldrin");
console.log(archer.getStats());

const mage = CharacterFactory.createCharacter("Mage", "Gandalf");
console.log(mage.getStats());
