import express from "express";
import cors from "cors";                // ✅ Import cors here
import dotenv from "dotenv";
import connectDB from "./config/db.js"; 

dotenv.config();

const app = express();

// Enable CORS **before routes**
app.use(cors());                        // ✅ Allow all origins temporarily
app.use(express.json());                // Parse JSON

// Connect to MongoDB
connectDB();  

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
