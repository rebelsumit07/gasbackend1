import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// ✅ Configure CORS properly
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500", "https://yourfrontenddomain.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json({ limit: "10mb" }));

// ✅ MongoDB Connection
connectDB();

// ✅ Import Routes
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import courierRoutes from "./routes/courierRoutes.js";

// ✅ Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/courier", courierRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
