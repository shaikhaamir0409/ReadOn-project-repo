import React, { useState, useEffect } from 'react';
import './AddProducts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faStarHalfAlt,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.min.css';

export default function Products() {
  SwiperCore.use([Autoplay]);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    pdf: null,
    imageUrl: '',
    category: '',
    ratings: 0,
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products and categories
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));

    fetch('http://localhost:5000/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
  
    if (type === "file") {
      setNewProduct({ ...newProduct, [name]: files[0] }); // Handles image and pdf both
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };
  
  

  // Handle Add or Update Product
  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("category", newProduct.category);
      formData.append("ratings", newProduct.ratings);
      
      if (newProduct.image) {
        formData.append("image", newProduct.image); // Ensure image is appended
      }
      if (newProduct.pdf) {
        formData.append("pdf", newProduct.pdf);
      }
      let response;
      if (editingProduct) {
        response = await fetch(`http://localhost:5000/api/products/${editingProduct._id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        response = await fetch("http://localhost:5000/api/products", {
          method: "POST",
          body: formData,
        });
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }
  
      const productData = await response.json();
      setProducts(editingProduct
        ? products.map((p) => (p._id === productData._id ? productData : p))
        : [...products, productData]
      );
  
      setEditingProduct(null);
      setNewProduct({ name: "", price: "", image: null,pdf: null, category: "", ratings: 0 });
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };
  
  

  // Handle Delete Product
  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Handle Edit Product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      ratings: product.ratings,
    });
  };

  return (
    <section className="products" id="products">
      <h1 className="heading">
        Manage <span>Books</span>
      </h1>

      {/* Add/Edit Product Form */}
      <form onSubmit={handleAddOrUpdateProduct} className="add-product-form">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        {/* <input
          type="text"
          name="imageUrl"
          value={newProduct.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
          required
        /> */}
<input type="file" name="image" onChange={handleInputChange} required />
        <select
          name="category"
          value={newProduct.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
  type="file"
  name="pdf"
  accept="application/pdf"
  onChange={handleInputChange}
/>

        <input
          type="number"
          name="ratings"
          value={newProduct.ratings}
          onChange={handleInputChange}
          placeholder="Ratings (0-5)"
          min="0"
          max="5"
          step="0.1"
        />

        <button type="submit" className="btn">
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Product Display */}
      <div className="products-slider slider">
        <div className="wrapper swiper-wrapper">
          <Swiper
            loop
            spaceBetween={20}
            autoplay={{ delay: 7500, disableOnInteraction: false }}
            slidesPerView={1}
            pagination={{ clickable: true }}
            centeredSlides
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={{ padding: '1rem' }}
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="box">
                  <img src={`http://localhost:5000${product.imageUrl}`} alt={product.name} />

                  <h3>{product.name}</h3>
                  <div className="price">Rs {product.price}</div>
                  <p>
                    Category:{' '}
                    {categories.find((cat) => cat._id === product.category)
                      ?.name || 'Unknown'}
                  </p>
                  <div className="product-actions">
                    <button
                      type="button"
                      onClick={() => handleEditProduct(product)}
                      className="edit-btn"
                      aria-label="Edit Product"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(product._id)}
                      className="delete-btn"
                      aria-label="Delete Product"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
