const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  isbn: { type: String, unique: true, sparse: true, trim: true },
  publishedDate: { type: Date },
  inStock: { type: Boolean, default: true },

  // Used by The Archive website.
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Book", bookSchema);