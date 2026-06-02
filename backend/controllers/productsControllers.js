const products = require("../models/productsModel");

const addProducts = async (req, res) => {
  try {
    const imageFile = req.files?.image?.[0];
    const pdfFile = req.files?.pdf?.[0];

    if (!imageFile) {
      return res.status(400).json({ error: "Image is required" });
    }

    const newProduct = new products({
      name: req.body.name,
      price: req.body.price,
      ratings: req.body.ratings,
      category: req.body.category,
      imageUrl: `/uploads/${imageFile.filename}`,
      pdfUrl: pdfFile ? `/uploads/${pdfFile.filename}` : null,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getProducts = async (req, res) => {
  try {
    const product = await products.find({});
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await products.findOne({ _id: productID });
    if (!product) {
      return res
        .status(404)
        .json({ msg: `No Data found with id: {productID}` });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    const { name, price, category, ratings } = req.body;

    const updateFields = { name, price, category, ratings };

    if (req.files?.image?.[0]) {
      updateFields.imageUrl = `/uploads/${req.files.image[0].filename}`;
    }

    if (req.files?.pdf?.[0]) {
      updateFields.pdfUrl = `/uploads/${req.files.pdf[0].filename}`;
    }

    const updatedProduct = await products.findOneAndUpdate(
      { _id: productID },
      updateFields,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ msg: `No product found with id: ${productID}` });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};



const deleteProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await products.findOneAndDelete({ _id: productID });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const product = await products.find({ category: categoryId });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addProducts,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory
};
