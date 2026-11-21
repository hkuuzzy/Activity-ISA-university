const path = require("node:path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: path.join(__dirname, ".env") });

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is missing. Create backend/.env from backend/.env.example.");
  }

  await mongoose.connect(uri);
  console.log(`Connected to MongoDB database "${mongoose.connection.name}".`);
}

module.exports = { connectToDatabase };
