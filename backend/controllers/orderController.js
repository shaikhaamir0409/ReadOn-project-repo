const Order = require("../models/Order");
const Product = require("../models/productsModel");

// ✅ Create a new order
const createOrder = async (req, res) => {
  try {
    console.log("Incoming Order Data:", req.body); // ✅ Debugging log

    const { user, products, totalAmount, paymentId } = req.body;

    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ error: "❌ No products found in the order" });
    }

    if (!totalAmount || !paymentId) {
      return res
        .status(400)
        .json({ error: "❌ Amount and transaction ID are required" });
    }

    const newOrder = new Order({
      user,
      products,
      amount: totalAmount,
      transactionId: paymentId,
      status: "Processing"
    });

    await newOrder.save();
    return res
      .status(201)
      .json({ message: "✅ Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("❌ Order Creation Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all orders

const getOrders = async (req, res) => {
  try {
    console.log("Fetching all orders...");

    const orders = await Order.find().populate({
      path: "products.productId",
      select: "name price imageUrl pdfUrl"
    });

    console.log("Orders fetched:", orders);

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
console.log(orders,"orders");

    // Safely process order data
    const formattedOrders = orders.map((order) => ({
      _id: order._id,
      products: order.products
        .filter((p) => p.productId) // Ignore null productIds
        .map((p) => ({
          pdfUrl:p.productId?.pdfUrl || "",
          productId: p.productId?._id || "Unknown",
          name: p.productId?.name || "Deleted Product",
          price: p.productId?.price || 0,
          imageUrl: p.productId?.imageUrl || "",
          quantity: p.quantity
        })),
      amount: order.amount,
      transactionId: order.transactionId,
      status: order.status,
      createdAt: order.createdAt
    }));

    console.log("Formatted Orders:", formattedOrders);

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ error: error.message });
  }
};


// ✅ Get a single order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.productId"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Delete an order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};
