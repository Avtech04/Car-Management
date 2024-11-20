const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const swagger= require("./swagger");
require("dotenv").config();
connectDB();

const app = express();

// Middleware
swagger(app);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve static files from uploads directory

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

// Start Server
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
