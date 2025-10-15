import express from "express";
import { getAllOrders, verifyOrder, loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

// Admin login
router.post("/login", loginAdmin);

// Get all orders
router.get("/orders", getAllOrders);

// Verify order
router.put("/verify/:orderId", verifyOrder);

export default router;
