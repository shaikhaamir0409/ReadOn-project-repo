// Navbar
import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

export default function Navbar(props) {
  const { active } = props;
  return (
    <nav className={`navbar Rs{active ? 'active' : ''}`}>
      <a href="/seller-home">Home</a>
      <a href="/seller-home/add-product">AddProduct</a>
      <a href="/seller-home/manage-order-status">Manage Order Status</a>
      <a href="/seller-home/seller-profiler">Profile</a>
    </nav>
  );
}
Navbar.propTypes = {
  active: PropTypes.bool,
}.isRequired;
