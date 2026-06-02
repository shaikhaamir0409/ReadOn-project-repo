import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faUserTag,
  faKey,
  faQuestionCircle,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import './ProfileCard.css';
import { Modal, Input, Form, Button } from 'antd';
export default function ProfileCard() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    role: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [forgotConfirmLoading, setForgotConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [forgotForm] = Form.useForm();

  useEffect(() => {
    setUserData({
      username: localStorage.getItem('userName') || 'Guest',
      email: localStorage.getItem('userEmail') || 'No Email',
      role: localStorage.getItem('userRole') || 'User',
    });
  }, []);

  // Password Change Modal functions
  const showPasswordChangeModal = () => {
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    try {
      setConfirmLoading(true);
      // Validate form fields
      const values = await form.validateFields();
      const { currentPassword, newPassword, confirmNewPassword } = values;

      console.log('Password change values:', {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      // Get user ID from localStorage or wherever you store it
      const userId = localStorage.getItem('userId');

      // Call the API to change the password
      try {
        const response = await fetch(`http://localhost:5000/api/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Include authorization header if needed
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        });
        if (!response.ok) throw new Error('Failed to update password');
        console.log('Password update response:', response.data);

        setIsModalOpen(false);
        setConfirmLoading(false);
        form.resetFields();
        alert('Password changed successfully!');
      } catch (apiError) {
        console.error(
          'API Error:',
          apiError.response?.data || apiError.message
        );
        alert(
          `Failed to change password: ${
            apiError.response?.data?.message || apiError.message
          }`
        );
        setConfirmLoading(false);
      }
    } catch (validationError) {
      console.error('Validation failed:', validationError);
      setConfirmLoading(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // Forgot Password Modal functions
  const showForgotPasswordModal = () => {
    setIsForgotModalOpen(true);
  };

  const handleForgotModalOk = async () => {
    try {
      setForgotConfirmLoading(true);
      // Validate form fields
      const values = await forgotForm.validateFields();
      console.log('Forgot password values:', values);

      // Here you would typically call an API to reset the password
      // For now, just simulate a delay and show a success message
      setTimeout(() => {
        setIsForgotModalOpen(false);
        setForgotConfirmLoading(false);
        forgotForm.resetFields();
        alert('Password reset successfully!');
      }, 1000);
    } catch (error) {
      console.error('Validation failed:', error);
      setForgotConfirmLoading(false);
    }
  };

  const handleForgotModalCancel = () => {
    setIsForgotModalOpen(false);
    forgotForm.resetFields();
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h2>Profile Info</h2>
      </div>
      <div className="profile-content">
        <div className="info-item">
          <div className="info-label">
            <FontAwesomeIcon icon={faUser} className="info-icon" />
            <span>Username</span>
          </div>
          <div className="info-value">{userData.username}</div>
        </div>

        <div className="info-item">
          <div className="info-label">
            <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
            <span>Email</span>
          </div>
          <div className="info-value">{userData.email}</div>
        </div>

        <div className="info-item">
          <div className="info-label">
            <FontAwesomeIcon icon={faUserTag} className="info-icon" />
            <span>Role</span>
          </div>
          <div className="info-value">{userData.role}</div>
        </div>

        <div className="password-section">
          <h3>Password Management</h3>
          <p>Manage Your Account Security Settings</p>

          <div className="password-actions">
            <button
              className="password-button"
              onClick={showPasswordChangeModal}
            >
              <FontAwesomeIcon icon={faKey} className="password-icon" />
              <span>Change Password</span>
            </button>

            <button
              className="password-button"
              onClick={showForgotPasswordModal}
            >
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="password-icon"
              />
              <span>Forgot Password</span>
            </button>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      <Modal
        title="Change Password"
        open={isModalOpen}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleModalOk}
          >
            Change Password
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" name="password_change_form">
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              {
                required: true,
                message: 'Please input your current password!',
              },
            ]}
          >
            <Input.Password
              prefix={
                <FontAwesomeIcon
                  icon={faLock}
                  className="site-form-item-icon"
                />
              }
              placeholder="Current Password"
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              {
                required: true,
                message: 'Please input your new password!',
              },
              {
                min: 8,
                message: 'Password must be at least 8 characters!',
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={
                <FontAwesomeIcon
                  icon={faLock}
                  className="site-form-item-icon"
                />
              }
              placeholder="New Password"
            />
          </Form.Item>

          <Form.Item
            name="confirmNewPassword"
            label="Confirm New Password"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your new password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The two passwords do not match!')
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={
                <FontAwesomeIcon
                  icon={faLock}
                  className="site-form-item-icon"
                />
              }
              placeholder="Confirm New Password"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Forgot Password Modal */}
      <Modal
        title="Forgot Password"
        open={isForgotModalOpen}
        onCancel={handleForgotModalCancel}
        footer={[
          <Button key="cancel" onClick={handleForgotModalCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={forgotConfirmLoading}
            onClick={handleForgotModalOk}
          >
            Reset Password
          </Button>,
        ]}
      >
        <Form form={forgotForm} layout="vertical" name="forgot_password_form">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email address!',
              },
            ]}
          >
            <Input
              prefix={
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="site-form-item-icon"
                />
              }
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              {
                required: true,
                message: 'Please input your new password!',
              },
              {
                min: 8,
                message: 'Password must be at least 8 characters!',
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={
                <FontAwesomeIcon
                  icon={faLock}
                  className="site-form-item-icon"
                />
              }
              placeholder="New Password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The two passwords do not match!')
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={
                <FontAwesomeIcon
                  icon={faLock}
                  className="site-form-item-icon"
                />
              }
              placeholder="Confirm Password"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
