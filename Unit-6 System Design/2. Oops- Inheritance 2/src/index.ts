class Book {
  title: string;
  author: string;
  price: number;

  constructor(title: string, author: string, price: number) {
    this.title = title;
    this.author = author;
    this.price = price;
  }
}

const myBook = new Book("The last Live", "Kartik", 1800);

console.log(`Title: ${myBook.title}`);
console.log(`Author: ${myBook.author}`);
console.log(`Price: ${myBook.price}`);
