// Navbar
import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  const { active } = props;
  return (
    <nav className={`navbar ${active ? 'active' : ''}`}>
      <Link to="/buyer-home">home</Link>
      {/* <Link to="/buyer-home/features">features</Link> */}
      <Link to="/buyer-home/product">products</Link>
      <Link to="/buyer-home/categories">categories</Link>
      <Link to="/buyer-home/review">review</Link>
      {/* <Link to="/buyer-home/blogs">blogs</Link> */}
      <Link to="/buyer-home/order">Order Status</Link>
      <Link to="/buyer-home/purchase-book-history">Purchase Book History</Link>
      <Link to="/buyer-home/profile">Profile</Link>
    </nav>
  );
}
Navbar.propTypes = {
  active: PropTypes.bool,
}.isRequired;
