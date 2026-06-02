const {
  addReview,
  getReview,
  getReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewsController");
const express = require("express");

const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.route("/").get(getReviews).post(upload.single("imageFile"), addReview);
router.route("/:id").get(getReview).put(updateReview).delete(deleteReview);

module.exports = router;
