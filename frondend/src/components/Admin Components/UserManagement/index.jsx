import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './UserManagement.css';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer', // ✅ Default role set to "User"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  // ✅ Fetch users & vendors from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  // ✅ Handle input changes
  const handleInputChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  // ✅ Handle Add/Edit User or Vendor
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing
        ? `http://localhost:5000/api/${currentUser._id}`
        : 'http://localhost:5000/api/register';

      const method = isEditing ? 'PUT' : 'POST';

      const userData = { ...currentUser };
      if (isEditing && !userData.password) delete userData.password; // ✅ Do not send empty password when updating

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error('Failed to save user');

      const updatedUser = await response.json();
      if (isEditing) {
        setUsers(
          users.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          )
        );
      } else {
        setUsers([...users, updatedUser]);
      }

      setCurrentUser({ name: '', email: '', password: '', role: 'buyer' });
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Handle Delete User or Vendor
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Handle Edit User or Vendor
  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
  };

  return (
    <div className="management-container">
      <h1 className="heading">
        Manage <span>Seller & Buyer</span>
      </h1>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="management-form">
        <input
          type="text"
          name="name"
          value={currentUser.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
          autoCapitalize="none" // ✅ Prevent capitalization
          autoCorrect="off"
          style={{ textTransform: 'none' }} // ✅ Ensure lowercase
        />

        <input
          type="email"
          name="email"
          value={currentUser.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          style={{ textTransform: 'none' }} // ✅ Ensure lowercase
        />

        <input
          type="password"
          name="password"
          value={currentUser.password}
          onChange={handleInputChange}
          placeholder={isEditing ? 'Leave blank to keep unchanged' : 'Password'}
          required={isEditing ? false : true}
          autoCapitalize="none" // ✅ Prevent capitalization
          autoCorrect="off"
          style={{ textTransform: 'none' }} // ✅ Ensure lowercase
        />

        <select
          name="role"
          value={currentUser.role}
          onChange={handleInputChange}
        >
           <option value="buyer">Buyer</option>
          <option value="seller">Seller</option> {/* ✅ Added Vendor role */}
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn">
          {isEditing ? 'Update' : 'Add'}
        </button>
      </form>

      <table className="management-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)} className="edit-btn">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
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
