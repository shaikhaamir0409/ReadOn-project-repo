import React, { useEffect, useState } from 'react';
import './checkout.css';

export default function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')) || []);
  }, []);

  const handlePayment = async () => {
    try {
      if (cart.length === 0) {
        alert('❌ Your cart is empty!');
        return;
      }

      const totalAmount = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      // ✅ Step 1: Initiate Payment
      const paymentResponse = await fetch('http://localhost:5000/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount * 100 }), // Convert to paise
      });

      const orderData = await paymentResponse.json();
      console.log('Payment Order Data:', orderData); // ✅ Debugging log

      // ✅ Step 2: Proceed with Razorpay
      const options = {
        key: 'rzp_test_WgxamtVupSULV6',
        amount: orderData.amount,
        currency: 'INR',
        name: 'Your Store',
        description: 'Purchase',
        order_id: orderData.id,
        handler: async function (response) {
          alert('✅ Payment Successful!');

          // ✅ Step 3: Send Order Details to Backend
          const orderResponse = await fetch(
            'http://localhost:5000/api/orders',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                user: 'Guest', // Replace with actual user info
                products: cart.map((item) => ({
                  productId: item._id,
                  quantity: item.quantity,
                })),
                totalAmount, // ✅ Ensure this is included
                paymentId: response.razorpay_payment_id, // ✅ Ensure this is included
              }),
            }
          );

          if (!orderResponse.ok) {
            const errorData = await orderResponse.json();
            console.error('❌ Order API Error:', errorData);
            alert(`Order Failed: ${errorData.error}`);
            return;
          }

          const orderResult = await orderResponse.json();
          console.log('✅ Order Placed:', orderResult);
          localStorage.removeItem('cart');
          setCart([]); // Clear the cart after successful payment
        },
        prefill: { name: 'Customer', email: 'customer@example.com' },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error('❌ Payment Error:', error);
    }
  };

  return (
    <div className="checkout-container" style={{margin: '50px auto'}}>
      <div className="checkout-header">Checkout</div>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty! 🛒</p>
      ) : (
        <>
          <div className="cart-summary">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={`http://localhost:5000${item.imageUrl}` || 'fallback-image.jpg'} alt={item.name} />
                <h3>{item.name}</h3>
                <p>Rs {item.price.toFixed(2)} x {item.quantity}</p>
              </div>
            ))}
            <p className="total-amount">Total: Rs {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
          </div>

          <button className="pay-btn" onClick={handlePayment}>
            Pay with Razorpay
          </button>
        </>
      )}
    </div>
  );
}
