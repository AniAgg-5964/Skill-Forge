import React, { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://skill-forge-km0u.onrender.com/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token
        localStorage.setItem('token', data.token);

        // ✅ Determine role
        let isProvider = localStorage.getItem('isProvider');

        // If missing (existing user), ask once
        if (isProvider === null) {
          isProvider = window.confirm(
            'Are you a Skill Provider? Click OK for yes, Cancel for no'
          )
            ? 'true'
            : 'false';
          localStorage.setItem('isProvider', isProvider);
        }

        // Redirect based on role
        window.location.href = isProvider === 'true' ? '/provider' : '/dashboard';
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error occurred');
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2>Sign In</h2>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Minimum 8 characters"
            required
          />
        </div>

        <button type="submit" className="signin-btn">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
