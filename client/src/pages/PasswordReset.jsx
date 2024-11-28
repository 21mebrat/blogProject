import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Axios } from '../api/Axios';

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Get the email from the query string
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    if (!email) {
      setError('Invalid email link');
      return;
    }

    try {
      // Make an API call to reset the password using axios
      const response = await Axios.post('/user/reset-password', {
        email,
        newPassword,
      });

      if (response.status === 200) {
        setSuccess('Password has been reset successfully.');
        // Optionally, redirect the user to login page after resetting the password
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(response.data.message || 'Failed to reset password.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('An error occurred while resetting your password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Reset Your Password</h1>

        {/* New Password Field */}
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Error or Success Message */}
        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-500">{success}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
