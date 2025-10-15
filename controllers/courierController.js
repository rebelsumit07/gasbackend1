import Order from "../models/order.js";

// Get verified orders
export const getVerifiedOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "verified" });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order status
export const updateStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findOneAndUpdate({ orderId }, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
