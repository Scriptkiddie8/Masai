interface Book {
  getCategory(): string;
}

class PremiumBook implements Book {
  constructor(private title: string, private price: number) {}
  getCategory(): string {
    return "Premium Book";
  }
}

class RegularBook implements Book {
  constructor(private title: string, private price: number) {}
  getCategory(): string {
    return "Regular Book";
  }
}

class BookFactory {
  static createBook(title: string, price: number): Book {
    return price > 1000
      ? new PremiumBook(title, price)
      : new RegularBook(title, price);
  }
}

const b1 = BookFactory.createBook("Design Patterns", 1500);
console.log(b1.getCategory());

const b2 = BookFactory.createBook("JavaScript Guide", 500);
console.log(b2.getCategory());
