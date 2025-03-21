const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projects");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Middleware
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/projects", projectRoutes);
// Correct MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // Avoid infinite waiting
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
