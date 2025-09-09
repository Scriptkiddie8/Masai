const Book = require("../models/library.model");

exports.findBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    req.book = book;
    next();
  } catch {
    res.status(500).json({ error: "Invalid Book ID" });
  }
};

exports.addBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

exports.borrowBook = async (req, res) => {
  const book = req.book;
  book.status = "borrowed";
  book.borrowDate = new Date();
  book.returnDate = null;
  book.fine = 0;
  await book.save();
  res.json(book);
};

exports.returnBook = async (req, res) => {
  const book = req.book;
  book.status = "available";
  book.returnDate = new Date();

  const dueDays = 7;
  const borrowTime = new Date(book.borrowDate);
  const returnTime = new Date(book.returnDate);

  const diffInDays = Math.ceil(
    (returnTime - borrowTime) / (1000 * 60 * 60 * 24)
  );
  book.fine = diffInDays > dueDays ? (diffInDays - dueDays) * 10 : 0;

  await book.save();
  res.json(book);
};

exports.getBooks = async (req, res) => {
  const { status, title } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (title) filter.title = new RegExp(title, "i");
  const books = await Book.find(filter);
  res.json(books);
};

exports.deleteBook = async (req, res) => {
  const book = req.book;
  if (book.status === "borrowed") {
    return res.status(400).json({ error: "Cannot delete borrowed book" });
  }
  await Book.findByIdAndDelete(book._id);
  res.json({ message: "Book deleted" });
};
