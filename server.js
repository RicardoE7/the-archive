const express = require("express");
const methodOverride = require("method-override");
require("dotenv").config();

const connectDB = require("./db/connection");
const Book = require("./models/Book");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

// JSON API for the assignment and Postman.
app.use("/api/books", bookRoutes);

// The Archive's existing browser interface.
app.get("/", (req, res) => {
  res.redirect("/books");
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({}).sort({ _id: -1 });
    res.render("index", { books });
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not load the collection.");
  }
});

app.get("/books/new", (req, res) => {
  res.render("new");
});

app.post("/books", async (req, res) => {
  try {
    const { title, author, completed } = req.body;

    await Book.create({
      title,
      author,
      completed: completed === "on",
    });

    res.redirect("/books");
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not add the book.");
  }
});

app.get("/books/:id/edit", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).send("Book not found.");
    }

    res.render("edit", { book });
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not load the book.");
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).send("Book not found.");
    }

    res.render("show", { book });
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not load the book.");
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const { title, author, completed } = req.body;

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        completed: completed === "on",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!book) {
      return res.status(404).send("Book not found.");
    }

    res.redirect(`/books/${book._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not update the book.");
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).send("Book not found.");
    }

    res.redirect("/books");
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not remove the book.");
  }
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exitCode = 1;
  });