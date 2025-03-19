const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoute")
const categoryRoutes = require("./routes/categoryRoute")

const connectDB = require("./config/db");

//for logging in the console
const morgan = require("morgan");


dotenv.config();
const app = express();

app.use(express.json()); // Middleware to parse JSON

// Use Morgan to log all HTTP requests
app.use(morgan("dev")); // 'dev' gives colored, concise logs


connectDB(); // 🔥 Connect to DB

app.listen(5000, () => console.log("🚀 Server running on port 5000"));


// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/category", categoryRoutes);
