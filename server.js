// DEPENDENCIES
const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

// CONFIGURATION
const app = express();
const PORT = process.env.PORT || 3001;
const uri = process.env.MONGO_URI;

// DATABASE
const client = new MongoClient(uri);

async function mongoDbConnection() {
  try {
    await client.connect();

    console.log("Database Connection Has Been Made");

    return true;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);

    return false;
  }
}

// ROUTES
app.get("/", async (req, res) => {
  const connected = await mongoDbConnection();

  if (connected) {
    res.json({
      message: "Successfully connected to the database!",
    });
  } else {
    res.status(500).json({
      message: "Failed to connect to the database.",
    });
  }
});

// PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
