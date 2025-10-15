"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PremiumBook {
    title;
    price;
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    getCategory() {
        return "Premium Book";
    }
}
class RegularBook {
    title;
    price;
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    getCategory() {
        return "Regular Book";
    }
}
class BookFactory {
    static createBook(title, price) {
        return price > 1000
            ? new PremiumBook(title, price)
            : new RegularBook(title, price);
    }
}
const b1 = BookFactory.createBook("Design Patterns", 1500);
console.log(b1.getCategory());
const b2 = BookFactory.createBook("JavaScript Guide", 500);
console.log(b2.getCategory());
//# sourceMappingURL=index.js.map