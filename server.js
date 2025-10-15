import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // <- your db.js

dotenv.config();

const app = express();

// Middleware etc
app.use(express.json());

// Connect to MongoDB
connectDB();  // <-- This actually runs the DB connection

// Your routes
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import courierRoutes from "./routes/courierRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/courier", courierRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
