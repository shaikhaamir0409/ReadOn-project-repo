// Navbar
import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

export default function Navbar(props) {
  const { active } = props;
  return (
    <nav className={`navbar Rs{active ? 'active' : ''}`}>
      <a href="/admin-home">Home</a>
      <a href="/admin-home/buyer-management">Manage Seller and Buyer</a>
      {/* <a href="/admin-home/manage-blogs">Manage Blogs</a> */}
      <a href="/admin-home/manage-categories">Manage Categories</a>
      <a href="/admin-home/admin-profile">Profile</a>
    </nav>
  );
}
Navbar.propTypes = {
  active: PropTypes.bool,
}.isRequired;
