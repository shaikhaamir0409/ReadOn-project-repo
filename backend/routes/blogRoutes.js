const {
  addBlogs,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const express = require("express");
const router = express.Router();

router.route("/").get(getBlogs).post(addBlogs);
router.route("/:id").get(getBlog).put(updateBlog).delete(deleteBlog);

module.exports = router;
