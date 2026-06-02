import React, { useState, useEffect } from 'react';
import './CategoryManagement.css';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState({
    id: null,
    name: '',
    image: null,
    discount: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCategoryData({ ...categoryData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', categoryData.name);
    formData.append('discount', categoryData.discount);
    if (categoryData.image) formData.append('image', categoryData.image);

    try {
      const response = await fetch(
        categoryData.id
          ? `http://localhost:5000/api/categories/${categoryData.id}`
          : 'http://localhost:5000/api/categories',
        {
          method: categoryData.id ? 'PUT' : 'POST',
          body: formData,
        }
      );

      if (!response.ok) throw new Error('Failed to save category');
      await fetchCategories();
      setCategoryData({ id: null, name: '', image: null, discount: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (category) => {
    setCategoryData({
      id: category._id,
      name: category.name,
      discount: category.discount,
    });
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete category');
      setCategories(categories.filter((cat) => cat._id !== categoryId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="category-management">
      <h1 className="heading">Manage Categories</h1>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="category-form">
        <input
          type="text"
          name="name"
          value={categoryData.name}
          onChange={handleInputChange}
          placeholder="Category Name"
          required
        />
        <input type="file" name="image" onChange={handleFileChange} />
        <input
          type="text"
          name="discount"
          value={categoryData.discount}
          onChange={handleInputChange}
          placeholder="Discount (e.g. 10% off)"
          required
        />
        <button type="submit" className="btn">
          {categoryData.id ? 'Update Category' : 'Add Category'}
        </button>
        {categoryData.id && (
          <button type="button" className="cancel-btn" onClick={() => setCategoryData({ id: null, name: '', image: null, discount: '' })}>
            Cancel
          </button>
        )}
      </form>

      <div className="category-list">
        <h2>Existing Categories</h2>
        <table className="category-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Category Name</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>
                  <img
                    src={`http://localhost:5000${category.imageUrl}`}
                    alt={category.name}
                    className="category-img"
                  />
                </td>
                <td>{category.name}</td>
                <td>{category.discount}</td>
                <td>
                  <button onClick={() => handleEdit(category)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(category._id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}