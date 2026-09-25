const dns = require("dns");
const mongoose = require("mongoose");

async function connectDB() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing from your .env file");
  }

  // Restore the DNS configuration your working app used for Atlas.
  dns.setServers(["8.8.8.8", "1.1.1.1"]);

  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
}

module.exports = connectDB;