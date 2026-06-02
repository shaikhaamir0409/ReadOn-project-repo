import React, { useState, useEffect } from 'react';
import './Blogs.css';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Blog Management States
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    description: '',
    imageUrl: '',
  });
  const [editingBlog, setEditingBlog] = useState(null);
  const [editData, setEditData] = useState({
    id: '',
    title: '',
    author: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Fetch Blogs from API
  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/blogs');
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Input Changes for New Blog
  const handleNewBlogChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  // Add New Blog
  const handleAddBlog = async (e) => {
    e.preventDefault();
    if (
      !newBlog.title ||
      !newBlog.author ||
      !newBlog.description ||
      !newBlog.imageUrl
    )
      return;
    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });
      if (!response.ok) throw new Error('Failed to add blog');
      await fetchBlogs();
      setNewBlog({ title: '', author: '', description: '', imageUrl: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Edit Click
  const handleEdit = (blog) => {
    setEditingBlog(blog._id);
    setEditData({
      id: blog._id,
      title: blog.title,
      author: blog.author,
      description: blog.description,
      imageUrl: blog.imageUrl,
    });
  };

  // Handle Edit Input Changes
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Update Blog
  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    if (
      !editData.title ||
      !editData.author ||
      !editData.description ||
      !editData.imageUrl
    )
      return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${editData.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editData),
        }
      );
      if (!response.ok) throw new Error('Failed to update blog');
      await fetchBlogs();
      setEditingBlog(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete Blog
  const handleDeleteBlog = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete blog');
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <section className="blogs" id="blogs">
      <h1 className="heading">
        Manage <span>Blogs</span>
      </h1>

      {/* Add New Blog Form */}
      <form onSubmit={handleAddBlog} className="blog-form">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={newBlog.title}
          onChange={handleNewBlogChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={newBlog.author}
          onChange={handleNewBlogChange}
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={newBlog.imageUrl}
          onChange={handleNewBlogChange}
          required
        />
        <textarea
          name="description"
          placeholder="Blog Description"
          value={newBlog.description}
          onChange={handleNewBlogChange}
          required
        ></textarea>
        <button type="submit" className="btn">
          Add Blog
        </button>
      </form>

      {/* Edit Blog Form */}
      {editingBlog && (
        <form onSubmit={handleUpdateBlog} className="edit-form">
          <input
            type="text"
            name="title"
            placeholder="Edit Title"
            value={editData.title}
            onChange={handleEditChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Edit Author"
            value={editData.author}
            onChange={handleEditChange}
            required
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Edit Image URL"
            value={editData.imageUrl}
            onChange={handleEditChange}
            required
          />
          <textarea
            name="description"
            placeholder="Edit Description"
            value={editData.description}
            onChange={handleEditChange}
            required
          ></textarea>
          <button type="submit" className="btn">
            Update Blog
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setEditingBlog(null)}
          >
            Cancel
          </button>
        </form>
      )}

      {/* Blog List */}
      <div className="blogs-container">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <div className="blog-image">
              <img src={blog.imageUrl} alt={blog.title} />
            </div>
            <div className="blog-content">
              <h3>{blog.title}</h3>
              <p>
                <strong>Author:</strong> {blog.author}
              </p>
              <p className="blog-description">{blog.description}</p>
              <div className="admin-actions">
                <button onClick={() => handleEdit(blog)} className="edit-btn">
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
