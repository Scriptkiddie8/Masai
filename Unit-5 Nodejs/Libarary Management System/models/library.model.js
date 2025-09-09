const mongoose = require("mongoose");

const LibrarySchema = new mongoose.Schema({
  title: String,
  author: String,
  status: { type: String, default: "available" },
  borrowDate: Date,
  returnDate: Date,
  fine: Number,
});

module.exports = mongoose.model("Book", LibrarySchema);
