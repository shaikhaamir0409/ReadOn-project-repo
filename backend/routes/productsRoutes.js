const {
  addProducts,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} = require("../controllers/productsControllers");
const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Set storage for images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store images in "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});

// Multer upload middleware
const upload = multer({ storage: storage });

// Upload both image and PDF
const multiUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "pdf", maxCount: 1 },
]);

// router.route("/").post(addProducts).get(getProducts);

router.route("/category/:categoryId").get(getProductsByCategory);
// router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

router.route("/").post(multiUpload, addProducts).get(getProducts);
router.route("/:id").put(multiUpload, updateProduct).delete(deleteProduct);


module.exports = router;
