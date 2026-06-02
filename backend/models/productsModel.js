const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Enter a Name..."],
  },
  price: {
    type: Number,
    required: [true, "Must be a number..."],
    min: 0, // Ensure the price is non-negative
    default: 0,
  },
  pdfUrl: {
    type: String, // Store path to the uploaded PDF
  },
  ratings: {
    type: Number,
    required: [true, "Must be between 0 and 5..."],
    min: 0.0, // Minimum rating
    max: 5.0, // Maximum rating
    default: 0.0,
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required..."],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Assuming you have a Category model
    required: [true, "Category is required..."],
  },
});

module.exports = mongoose.model("Product", ProductSchema);
