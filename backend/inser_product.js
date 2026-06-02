const mongoose = require("mongoose");
const Product = require("../backend/models/productsModel");
const Category = require("../backend/models/categoryModel");

// Connect to DB
mongoose
  .connect("mongodb://127.0.0.1:27017/readon", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB...");

    // Step 1: Insert dummy categories
    const dummyCategories = [
      {
        name: "Electronics",
        imageUrl: "https://example.com/electronics.jpg",
        discount: "10% off",
      },
      {
        name: "Accessories",
        imageUrl: "https://example.com/accessories.jpg",
        discount: "15% off",
      },
    ];

    const insertedCategories = await Category.insertMany(dummyCategories);
    console.log(
      "Inserted Categories:",
      insertedCategories.map((c) => c.name)
    );

    // Step 2: Use inserted category IDs to insert products
    const dummyProducts = [
      {
        name: "Bluetooth Speaker",
        price: 49.99,
        ratings: 4.6,
        imageUrl: "https://example.com/speaker.jpg",
        category: insertedCategories[0]._id, // Electronics
      },
      {
        name: "Gaming Headset",
        price: 79.99,
        ratings: 4.7,
        imageUrl: "https://example.com/headset.jpg",
        category: insertedCategories[0]._id, // Electronics
      },
      {
        name: "Phone Holder",
        price: 15.99,
        ratings: 4.2,
        imageUrl: "https://example.com/holder.jpg",
        category: insertedCategories[1]._id, // Accessories
      },
    ];

    await Product.insertMany(dummyProducts);
    console.log("Dummy products inserted successfully!");

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });
