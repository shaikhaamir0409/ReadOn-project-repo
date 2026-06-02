// UsersVendorsManagement.jsx

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrash,
  faUser,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import './AddVendorUsers.css';

export default function AddVendorUsers() {
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    name: '',
    email: '',
    type: 'user',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Initialize with sample data
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ]);
    setVendors([
      { id: 1, name: 'Acme Corp', email: 'acme@example.com' },
      { id: 2, name: 'XYZ Supplies', email: 'xyz@example.com' },
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing item
      if (currentItem.type === 'user') {
        setUsers(
          users.map((user) => (user.id === currentItem.id ? currentItem : user))
        );
      } else {
        setVendors(
          vendors.map((vendor) =>
            vendor.id === currentItem.id ? currentItem : vendor
          )
        );
      }
    } else {
      // Add new item
      const newItem = {
        ...currentItem,
        id: currentItem.type === 'user' ? users.length + 1 : vendors.length + 1,
      };
      if (currentItem.type === 'user') {
        setUsers([...users, newItem]);
      } else {
        setVendors([...vendors, newItem]);
      }
    }
    setCurrentItem({ name: '', email: '', type: 'user' });
    setIsEditing(false);
  };

  const handleEdit = (item, type) => {
    setCurrentItem({ ...item, type });
    setIsEditing(true);
  };

  const handleDelete = (id, type) => {
    if (type === 'user') {
      setUsers(users.filter((user) => user.id !== id));
    } else {
      setVendors(vendors.filter((vendor) => vendor.id !== id));
    }
  };

  return (
    <div className="users-vendors-management">
      <h1 className="heading">
        Add/Update/Delete <span>Users & Vendors</span>
      </h1>

      <form onSubmit={handleSubmit} className="management-form">
        <input
          type="text"
          name="name"
          value={currentItem.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={currentItem.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <select
          name="type"
          value={currentItem.type}
          onChange={handleInputChange}
          required
        >
          <option value="user">User</option>
          <option value="vendor">Vendor</option>
        </select>
        <button type="submit" className="btn">
          {isEditing ? 'Update' : 'Add'}
        </button>
      </form>

      <div className="list-container">
        <div className="users-list">
          <h2>Users</h2>
          {users.map((user) => (
            <div key={user.id} className="list-item">
              <FontAwesomeIcon icon={faUser} className="icon" />
              <span>
                {user.name} - {user.email}
              </span>
              <div className="item-actions">
                <button
                  onClick={() => handleEdit(user, 'user')}
                  className="edit-btn"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDelete(user.id, 'user')}
                  className="delete-btn"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="vendors-list">
          <h2>Vendors</h2>
          {vendors.map((vendor) => (
            <div key={vendor.id} className="list-item">
              <FontAwesomeIcon icon={faStore} className="icon" />
              <span>
                {vendor.name} - {vendor.email}
              </span>
              <div className="item-actions">
                <button
                  onClick={() => handleEdit(vendor, 'vendor')}
                  className="edit-btn"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(vendor.id, 'vendor')}
                  className="delete-btn"
                  aria-label="delete button"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
