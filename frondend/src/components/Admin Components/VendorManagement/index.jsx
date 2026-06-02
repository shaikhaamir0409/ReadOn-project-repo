import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './VendorManagement.css';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [currentVendor, setCurrentVendor] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Vendor', // Always setting role as Vendor
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  // ✅ Fetch vendors from the backend (only users with role: Vendor)
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/users?role=Vendor'
        );
        if (!response.ok) throw new Error('Failed to fetch vendors');
        const data = await response.json();
        setVendors(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchVendors();
  }, []);

  // ✅ Handle Input Change
  const handleInputChange = (e) => {
    setCurrentVendor({ ...currentVendor, [e.target.name]: e.target.value });
  };

  // ✅ Handle Add/Edit Vendor
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting Vendor:', currentVendor); // ✅ Debugging

      const url = isEditing
        ? `http://localhost:5000/api/users/${currentVendor._id}`
        : 'http://localhost:5000/api/users';

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentVendor),
      });

      const result = await response.json();
      console.log('Server Response:', result); // ✅ Debugging

      if (!response.ok)
        throw new Error(result.message || 'Failed to save vendor');

      if (isEditing) {
        setVendors(
          vendors.map((vendor) => (vendor._id === result._id ? result : vendor))
        );
      } else {
        setVendors([...vendors, result]);
      }

      setCurrentVendor({ name: '', email: '', password: '', role: 'Vendor' });
      setIsEditing(false);
    } catch (err) {
      console.error('Error Saving Vendor:', err);
      setError(err.message);
    }
  };

  // ✅ Handle Edit Vendor
  const handleEdit = (vendor) => {
    setCurrentVendor(vendor);
    setIsEditing(true);
  };

  // ✅ Handle Delete Vendor
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
      });
      setVendors(vendors.filter((vendor) => vendor._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="management-container">
      <h1 className="heading">
        Manage <span>Vendors</span>
      </h1>
      {error && <p className="error">{error}</p>}

      {/* ✅ Add/Edit Vendor Form */}
      <form onSubmit={handleSubmit} className="management-form">
        <input
          type="text"
          name="name"
          value={currentVendor.name}
          onChange={handleInputChange}
          placeholder="Vendor Name"
          required
        />
        <input
          type="email"
          name="email"
          value={currentVendor.email}
          onChange={handleInputChange}
          placeholder="Vendor Email"
          required
        />
        <input
          type="password"
          name="password"
          value={currentVendor.password}
          onChange={handleInputChange}
          placeholder="Vendor Password"
          required={!isEditing} // Password required only for new vendors
        />
        <button type="submit" className="btn">
          {isEditing ? 'Update' : 'Add'}
        </button>
      </form>

      {/* ✅ Vendor List Table */}
      <table className="management-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor._id}>
              <td>{vendor.name}</td>
              <td>{vendor.email}</td>
              <td>
                <button onClick={() => handleEdit(vendor)} className="edit-btn">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDelete(vendor._id)}
                  className="delete-btn"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
