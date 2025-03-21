const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projects");
require("dotenv").config();

const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://student-project-submission-app.onrender.com",
    ], // Allowed origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies if needed
  })
);

// ✅ Handle CORS Preflight Requests
app.options("*", cors());

// ✅ Middleware
app.use(express.json());

// ✅ Database Connection
connectDB();

// ✅ Routes
app.use("/projects", projectRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
