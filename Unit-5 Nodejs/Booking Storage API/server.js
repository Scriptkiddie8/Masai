const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());

const readData = () => {
  return JSON.parse(fs.readFileSync("./db.json", "utf8"));
};

const writeData = (data) => {
  fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
};

app.post("/books", (req, res) => {
  const books = readData();
  //   console.log(req.body);
  const newBook = { id: Date.now(), ...req.body };
  books.push(newBook);
  writeData(books);
  res.status(201).json(newBook);
});

app.get("/books", (req, res) => {
  const books = readData();
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const books = readData();
  const book = books.find((b) => b.id == req.params.id);
  book ? res.json(book) : res.status(404).send("Book not found");
});

app.put("/books/:id", (req, res) => {
  const books = readData();
  const index = books.findIndex((b) => b.id == req.params.id);
  if (index == -1) return res.status(404).send("Book Not Found");

  books[index] = { ...books[index], ...req.body };
  writeData(books);
  res.json(books[index]);
});

app.delete("/books/:id", (req, res) => {
  let books = readData();
  const index = books.findIndex((b) => b.id == req.params.id);
  if (index === -1) return res.status(404).send("Book not found");

  const deleted = books.splice(index, 1);
  writeData(books);
  res.json(deleted[0]);
});

app.listen(port, () => {
  console.log(`Server is running at : http://localhost/${port}`);
});
