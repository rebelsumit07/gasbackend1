// controllers/orderController.js
import Order from "../models/order.js";
import { v4 as uuidv4 } from "uuid"; // ✅ Import UUID for unique order IDs

// ✅ Create a new order
export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      address,
      deliveryType,
      paymentMethod,
      paymentScreenshot,
      cylinderName,
      cylinderPrice,
      deliveryCharge,
      totalPrice,
    } = req.body;

    // Validate required fields
    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !address ||
      !deliveryType ||
      !paymentMethod ||
      !cylinderName ||
      !cylinderPrice ||
      !deliveryCharge ||
      !totalPrice
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // For online payment, require screenshot
    if (paymentMethod === "online" && !paymentScreenshot) {
      return res.status(400).json({
        success: false,
        message: "Payment screenshot is required for online payment",
      });
    }

    // ✅ Generate a unique orderId
    const orderId = uuidv4();

    const newOrder = new Order({
      orderId, // assign the generated UUID
      customerName,
      customerEmail,
      customerPhone,
      address,
      deliveryType,
      paymentMethod,
      paymentScreenshot,
      cylinderName,
      cylinderPrice,
      deliveryCharge,
      totalPrice,
      status: "Pending",
    });

    await newOrder.save();

    // ✅ Return orderId to frontend
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId: newOrder.orderId,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Get all orders of a specific customer
export const getCustomerOrders = async (req, res) => {
  try {
    const { customerEmail } = req.params;
    const orders = await Order.find({ customerEmail }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order status updated", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
