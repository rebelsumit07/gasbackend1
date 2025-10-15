import express from "express";
import {
  createOrder,
  getCustomerOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { upload } from "../config/cloudinary.js"; // Cloudinary middleware
import Order from "../models/order.js";

const router = express.Router();

// Create a new order (customer)
router.post("/create", createOrder);

// Get all orders of a specific customer
router.get("/customer/:customerEmail", getCustomerOrders);

// Update order status (Admin or Courier)
router.put("/status/:orderId", updateOrderStatus);

// -------------------------------
// New route: Upload payment screenshot
// -------------------------------
router.put("/:orderId/payment", upload.single("paymentScreenshot"), async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Update order with Cloudinary URL and set verification status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentScreenshotUrl: req.file.path,
        verificationStatus: "Pending",
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, data: updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
