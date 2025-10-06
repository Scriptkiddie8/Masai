"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Book {
    title;
    author;
    price;
    constructor(title, author, price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }
}
const myBook = new Book("The last Live", "Kartik", 1800);
console.log(`Title: ${myBook.title}`);
console.log(`Author: ${myBook.author}`);
console.log(`Price: ${myBook.price}`);
//# sourceMappingURL=index.js.map