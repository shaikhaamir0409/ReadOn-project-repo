const Review = require("../models/reviewsModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in an 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const addReview = async (req, res) => {
  try {
    console.log("Received request:", req.body, req.file); // Debugging

    const { name, review, rating } = req.body;
    const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null; // Adjust the path


    // Validate rating to ensure it's a number
    const ratingValue = parseFloat(rating);
    if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
      return res.status(400).json({ error: "Rating must be between 0 and 5" });
    }

    const newReview = new Review({
      name: req.body.name,
      review: req.body.review,
      rating: req.body.rating,
      imageUrl: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null
    });
    

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ error: error.message });
  }
};


const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getReview = async (req, res) => {
  try {
    const reviewID = req.params.id;
    const reviews = await Review.findOne({ _id: reviewID });
    if (!reviews) {
      return res
        .status(404)
        .json({ msg: `No review found with id: Rs{reviewID}` });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const updateReview = async (req, res) => {
  try {
    const reviewID = req.params.id;
    const reviews = await Review.findOneAndUpdate({ _id: reviewID }, req.body);
    if (!reviews) {
      return res
        .status(404)
        .json({ msg: `No review found with id: Rs{reviewID}` });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewID = req.params.id;

    // Find and delete the review
    const reviews = await Review.findByIdAndDelete(reviewID);

    if (!reviews) {
      return res
        .status(404)
        .json({ msg: `No review found with id: ${reviewID}` });
    }

    return res
      .status(200)
      .json({ msg: "Review deleted successfully", deletedReview: reviews });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = {
  addReview,
  updateReview,
  getReview,
  getReviews,
  deleteReview
};
