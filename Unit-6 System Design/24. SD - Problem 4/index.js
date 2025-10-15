"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Warrior {
    name;
    strength;
    defense;
    constructor(name, strength = 85, defense = 70) {
        this.name = name;
        this.strength = strength;
        this.defense = defense;
    }
    getStats() {
        return `Warrior ${this.name} - Strength: ${this.strength}, Defense: ${this.defense}`;
    }
}
class Archer {
    name;
    agility;
    strength;
    constructor(name, agility = 80, strength = 40) {
        this.name = name;
        this.agility = agility;
        this.strength = strength;
    }
    getStats() {
        return `Archer ${this.name} - Agility: ${this.agility}, Strength: ${this.strength}`;
    }
}
class Mage {
    name;
    intelligence;
    mana;
    constructor(name, intelligence = 90, mana = 100) {
        this.name = name;
        this.intelligence = intelligence;
        this.mana = mana;
    }
    getStats() {
        return `Mage ${this.name} - Intelligence: ${this.intelligence}, Mana: ${this.mana}`;
    }
}
class CharacterFactory {
    static createCharacter(type, name) {
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
//# sourceMappingURL=index.js.map