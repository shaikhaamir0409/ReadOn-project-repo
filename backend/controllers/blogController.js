const blog = require("../models/blogModel");

const addBlogs = async (req, res) => {
  try {
    const blogs = await blog.create(req.body);
    return res.status(201).json(blogs);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await blog.find({});
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getBlog = async (req, res) => {
  try {
    const blogID = req.params.id;
    const blogs = await blog.findOne({ _id: blogID });
    if (!blogs) {
      return res
        .status(404)
        .json({ msg: `No Data found with an id: Rs{blogID}` });
    }
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogID = req.params.id;
    const blogs = await blog.findOneAndUpdate({ _id: blogID }, req.body);
    if (!blogs) {
      return res.status(404).json({ msg: `No Data found with id: Rs{blogID}` });
    }
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogID = req.params.id;
    const blogs = await blog.findOneAndDelete({ _id: blogID });
    if (!blogID) {
      return res.status(404).json({ msg: `No Data found with id: Rs{blogID}` });
    }
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

module.exports = { addBlogs, getBlogs, getBlog, updateBlog, deleteBlog };
