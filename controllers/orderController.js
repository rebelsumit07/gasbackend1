// controllers/orderController.js
import Order from "../models/order.js";

// Function to generate 4 digits + 1 uppercase letter
function generateShortOrderId() {
  const digits = Math.floor(1000 + Math.random() * 9000); // 1000-9999
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
  return `${digits}${letter}`;
}

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
      transactionCode, // ✅ replaced paymentScreenshot
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

    // For online payment, require transaction code
    if (paymentMethod === "online" && !transactionCode) {
      return res.status(400).json({
        success: false,
        message: "Transaction code is required for online payment",
      });
    }

    // ✅ Generate a unique short orderId
    let orderId;
    let exists = true;
    while (exists) {
      orderId = generateShortOrderId();
      const existingOrder = await Order.findOne({ orderId });
      if (!existingOrder) exists = false;
    }

    // ✅ Include orderId in saved document
    const newOrder = new Order({
      orderId,
      customerName,
      customerEmail,
      customerPhone,
      address,
      deliveryType,
      paymentMethod,
      transactionCode, // ✅ store transaction code instead of screenshot
      cylinderName,
      cylinderPrice,
      deliveryCharge,
      totalPrice,
      status: "Pending",
    });

    await newOrder.save();

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

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order status updated", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
