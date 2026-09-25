const express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/Book");

const router = express.Router();

function sendError(res, error) {
  if (error.code === 11000) {
    return res.status(409).json({
      error: "A book with this ISBN already exists.",
    });
  }

  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({
      error: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    error: "An unexpected database error occurred.",
  });
}

// POST /api/books — create a book.
router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json(book);
  } catch (error) {
    return sendError(res, error);
  }
});

// GET /api/books — retrieve every book.
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.json(books);
  } catch (error) {
    return sendError(res, error);
  }
});

// GET /api/books/:id — retrieve one book.
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid book ID." });
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    return res.json(book);
  } catch (error) {
    return sendError(res, error);
  }
});

// PUT /api/books/:id — update one book.
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid book ID." });
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    return res.json(book);
  } catch (error) {
    return sendError(res, error);
  }
});

// DELETE /api/books/:id — remove one book.
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid book ID." });
    }

    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    return res.json({
      message: "Book deleted successfully.",
    });
  } catch (error) {
    return sendError(res, error);
  }
});

module.exports = router;
