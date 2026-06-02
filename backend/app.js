const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connection");
require("dotenv").config();
const Razorpay = require("razorpay");
const productRoutes = require("./routes/productsRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const blogRoutes = require("./routes/blogRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

const port = 5000 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api", orderRoutes);
app.use("/api", userRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/uploads", express.static("uploads"));

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.post("/api/payment", async (req, res) => {
      try {
        const { amount } = req.body;
        const order = await razorpay.orders.create({
          amount,
          currency: "INR",
          receipt: "order_rcptid_11",
        });

        res.json(order);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    app.listen(port, console.log("Server is connected to port " + port));
  } catch (error) {
    console.log(error);
  }
};

start();
