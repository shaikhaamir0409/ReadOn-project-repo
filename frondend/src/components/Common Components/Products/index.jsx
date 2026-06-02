import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
console.log(filteredProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };

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

    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/wishlist/${userId}`
        );
        if (!response.ok) throw new Error('Failed to fetch wishlist');
        const data = await response.json();
        setWishlist(data?.products || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
    fetchCategories();
    fetchWishlist();
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    // Apply both category and search filters
    filterProducts(categoryId, searchQuery);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    // Apply both category and search filters
    filterProducts(selectedCategory, searchQuery);
  };

  // const handleViewProduct = (productId) => {
  //   const product = filteredProducts.find((p) => p._id === productId);
  //   if (product?.pdfUrl) {
  //     window.open(`http://localhost:5000${product.pdfUrl}`, '_blank');
  //   } else {
  //     alert('PDF not available for this product');
  //   }
  // };

  // Combined function to filter products by both category and search query
  const filterProducts = (categoryId, query) => {
    let filtered = products;

    // Apply category filter if selected
    if (categoryId) {
      filtered = filtered.filter((p) => p.category === categoryId);
    }

    // Apply search query filter if present
    if (query) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description?.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const addToCart = (product) => {
    console.log(product);
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/buyer-home/cart');
  };

  const toggleWishlist = async (productId) => {
    const isWishlisted = wishlist.some((item) => item._id === productId);
    const url = isWishlisted
      ? 'http://localhost:5000/api/wishlist/remove'
      : 'http://localhost:5000/api/wishlist/add';

    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId }),
      });

      // Update local state without refetching entire wishlist
      setWishlist((prev) =>
        isWishlisted
          ? prev.filter((p) => p._id !== productId)
          : [...prev, { _id: productId }]
      );
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  return (
    <div className="products">
      <h1 className="heading">
        Our <span>Books</span>
      </h1>

      <div className="filter-container">
        <div className="category-filter">
          <label className="category-drop-title">Filter by Category </label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-dropdown"
          >
            <option value="">Select Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
      </div>

      <div className="products-main">
        {filteredProducts.map((product) => (
          <div key={product._id} className="productmain-card">
            <div className="image-container">
              <img
                src={
                  `http://localhost:5000${product.imageUrl}` ||
                  'fallback-image.jpg'
                }
                alt={product.name}
                // onClick={() => handleViewProduct(product._id)}
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>
                Category:{' '}
                {categories.find((cat) => cat._id === product.category)?.name ||
                  'Unknown'}
              </p>
              <div className="price">Rs {product.price}</div>
            </div>
            <div className="product-actions">
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="btn"
                style={{ border: 'none', fontSize: '12px' }}
              >
                Add To Cart
              </button>
              {/* <button
  type="button"
  onClick={() => handleViewProduct(product._id)}
  className="btn view-btn"
  style={{ border: 'none', fontSize: '12px' }}
>
  View PDF
</button> */}
              <button
                type="button"
                className={`wishlist-btn ${
                  wishlist.some((item) => item._id === product._id)
                    ? 'wishlisted'
                    : ''
                }`}
                onClick={() => toggleWishlist(product._id)}
              >
                {wishlist.some((item) => item._id === product._id) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="red"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="red"
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
