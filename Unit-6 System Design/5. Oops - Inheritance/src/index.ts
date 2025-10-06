interface Printable {
  print(): void;
}

class Document implements Printable {
  print(): void {
    console.log("Printing Document...");
  }
}

class Photo implements Printable {
  print(): void {
    console.log("Printing Photo...");
  }
}

const doc = new Document();
const photo = new Photo();

doc.print();
photo.print();

const printables: Printable[] = [doc, photo];

for (const item of printables) {
  item.print();
}
