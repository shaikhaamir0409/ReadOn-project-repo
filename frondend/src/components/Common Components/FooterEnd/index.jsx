import React from 'react';
import './FooterEnd.css';
import { Link } from 'react-router-dom';

const FooterEnd = () => {
  return (
    <footer className="footerEnd">
      <div className="footer-container">
        <div className="footer-brand" style={{
    display: "flex"}}>
        <img
            className="p-1"
            src="/image/logo.png"
            width="40"
            height="40"
        ></img>
          <h2 style={{marginLeft:"15px"}}>BT-BOOKSTORE</h2>
        </div>

        <div className="footer-columns">
          <div className="footer-column">
            <h4>USER AREA</h4>
           
            <Link to="/buyer-home/cart">My Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/buyer-home/wishlist">Wishlist</Link>
          </div>

          <div className="footer-column">
            <h4>SHOPPING GUID</h4>
            <h3>Payment</h3>
            <h3>Shipment</h3>
            <h3>FAQ</h3>
          </div>

          <div className="footer-column">
            <h4>CONTACT DETAILS</h4>
            <h3>phone no1: +123 456 7890</h3>
            <h3>phone no2: +111 222 3333</h3>
            <h3>Email id: name@email.com</h3>
    
          </div>

          <div className="footer-column">
            <h4>SOCIAL MEDIA</h4>
            <p>Follow us on social media to get the latest updates.</p>
            <div className="social-icons">
             <Link><img src="/image/facebook.png" alt="Facebook" /></Link>
              <Link><img src="/image/twitter.png" alt="Twitter" /></Link>
              <Link><img src="/image/instagram.png" alt="instagram" /></Link>
              <Link><img src="/image/linkedin.png" alt="linkedin" /></Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 BT-BOOKSTORE. All rights reserved.</p>
          <div className="footer-links">
            <Link>Terms of Service</Link>
            <Link>Privacy Policy</Link>
            <Link>Security</Link>
            <Link>contact us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterEnd;

