import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Wishlist.css';

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) {
            navigate("/login"); // Redirect to login if not logged in
            return;
        }
        const fetchWishlist = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/wishlist/${userId}`);
                if (!response.ok) throw new Error('Failed to fetch wishlist');
                const data = await response.json();
                setWishlist(data?.products || []);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchWishlist();
    }, []);

    const removeFromWishlist = async (productId) => {
        try {
            await fetch('http://localhost:5000/api/wishlist/remove', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, productId }),
            });

            setWishlist((prev) => prev.filter((p) => p._id !== productId));
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    const addToCart = (product) => {
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

    if (error) return <div className="error">{error}</div>;

    return (
        <div className="wishlist">
            <h1 className="heading">Your <span>Wishlist</span></h1>

            {wishlist.length === 0 ? (
                <p className="empty-message">Your wishlist is empty.</p>
            ) : (
                <div className="products-main">
                    {wishlist.map((product) => (
                        <div key={product._id} className="productmain-card">
                            <div className="image-container">
                                <img src={`http://localhost:5000${product.imageUrl}` || 'fallback-image.jpg'} alt={product.name} />
                            </div>
                            <h3>{product.name}</h3>
                            <div className="price">Rs {product.price}</div>
                            <div className="product-actions">
                                <button type="button" onClick={() => addToCart(product)} className="btn">
                                    Add To Cart
                                </button>
                                <button type="button" className="remove-btn" onClick={() => removeFromWishlist(product._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M18 6l-12 12" /><path d="M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
