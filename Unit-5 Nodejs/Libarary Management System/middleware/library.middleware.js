module.exports.validateBookData = (req, res, next) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Missing title or author" });
  }
  next();
};

module.exports.validateBorrow = async (req, res, next) => {
  const book = req.book;
  if (book.status === "borrowed") {
    return res.status(400).json({ error: "Book is already borrowed" });
  }
  next();
};

module.exports.validateReturn = async (req, res, next) => {
  const book = req.book;
  if (book.status !== "borrowed") {
    return res.status(400).json({ error: "Book is not borrowed" });
  }
  next();
};
