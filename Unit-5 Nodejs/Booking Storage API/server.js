const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());

const readfile = () => {
  JSON.parse(fs.readFileSync("./db.json", "utf8"));
};

const writefile = (data) => {
  fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
};

app.post("/books", (req, res) => {
  const books = readfile();
  console.log(req.body);
  const newBook = { id: Date.now(), ...req.body };
});
