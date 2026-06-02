import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="categories" id="categories">
      <h1 className="heading">Books <span>Categories</span></h1>

      <div className="box-container">
        {categories.map((category) => (
          <div
            className="cat-box"
            key={category._id}
            onClick={() => navigate(`/category/${category._id}`)} // Navigate to CatewiseProducts
          >
            <img src={`http://localhost:5000${category.imageUrl}`} alt={category.name} />
            <h3>{category.name}</h3>
            <strong className="cat-discount">{category.discount || "No discounts available"} OFF</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
