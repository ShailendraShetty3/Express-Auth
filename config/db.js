
// require("dotenv").config();
// const { MongoClient } = require("mongodb");

// const MONGO_URI = process.env.MONGO_URI; // Replace with your actual DB URI

// async function connectDB() {
//   try {
//     const client = new MongoClient(MONGO_URI); // No need for options
//     await client.connect();
//     console.log("Connected to MongoDB");
//     return client.db();
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   }
// }

// module.exports = connectDB;






const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/crud_db2", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process if MongoDB connection fails
  }
};

module.exports = connectDB;
