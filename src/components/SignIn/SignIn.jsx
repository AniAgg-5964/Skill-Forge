import React, { useState } from 'react'
import './SignIn.css'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('https://skill-forge-km0u.onrender.com//api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        // Store the token in localStorage
        localStorage.setItem('token', data.token)
        // Dispatch event to notify auth state change
        window.dispatchEvent(new Event('auth-change'))
        // Redirect to dashboard
        window.location.href = '/dashboard'
      } else {
        const error = await response.json()
        setError(error.message || 'Login failed')
      }
    } catch (error) {
      setError('Network error occurred')
    }
  }

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
            required
          />
        </div>
        <button type="submit" className="signin-btn">Sign In</button>
      </form>
    </div>
  )
}

export default SignIn