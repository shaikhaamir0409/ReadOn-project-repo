const express = require("express");
const router = express.Router();
const multer = require("multer");

// Set up Multer storage (store images in 'uploads/' folder)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");

// Use `upload.single("image")` to handle file uploads
router.route("/").post(upload.single("image"), addCategory).get(getCategories);
router
  .route("/:id")
  .get(getCategory)
  .put(upload.single("image"), updateCategory) // Ensure updates also support file uploads
  .delete(deleteCategory);

module.exports = router;
