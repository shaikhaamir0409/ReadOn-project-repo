const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/orders", createOrder); // Create order
router.get("/orders", getOrders); // Get all orders
router.get("/orders/:id", getOrderById); // Get a single order
router.put("/orders/:id", updateOrderStatus); // Update order status
router.delete("/orders/:id", deleteOrder); // Delete order

module.exports = router;
