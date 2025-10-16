import express from "express";
import { createOrder, getCustomerOrders, updateOrderStatus,  trackOrderById } from "../controllers/orderController.js";
// import { upload } from "../config/cloudinary.js"; // No longer needed
import Order from "../models/order.js";

const router = express.Router();

// Create a new order (customer)
router.post("/create", createOrder);

// Get all orders of a specific customer
router.get("/customer/:customerEmail", getCustomerOrders);

// Update order status (Admin or Courier)
router.put("/status/:orderId", updateOrderStatus);

// order tacing 
router.get("/track/:orderId", trackOrderById);


// ✅ Remove /:orderId/payment route since transactionCode is sent on creation
// If needed in future, you can create a route to update transactionCode:
// router.put("/:orderId/transaction", async (req, res) => { ... });

export default router;


