import React, { useState } from 'react'
import { useGeolocated } from 'react-geolocated'
import './SignUpForm.css'

const SignUpForm = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    location: {
      type: 'manual', // or 'auto'
      address: '',
      coordinates: null
    },
    skills: {
      primary: '',
      description: ''
    }
  })

  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false
      },
      userDecisionTimeout: 5000,
      suppressLocationOnMount: true
    })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLocationTypeChange = async (type) => {
    if (type === 'auto') {
      getPosition()
      if (coords) {
        setFormData(prev => ({
          ...prev,
          location: {
            type: 'auto',
            coordinates: {
              latitude: coords.latitude,
              longitude: coords.longitude
            },
            address: ''
          }
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        location: {
          type: 'manual',
          address: '',
          coordinates: null
        }
      }))
    }
  }

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.fullName && formData.email && formData.password.length >= 8
      case 2:
        return formData.location.type === 'auto' ? formData.location.coordinates : formData.location.address
      case 3:
        return formData.skills.primary && formData.skills.description
      default:
        return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(prev => prev + 1)
    } else {
      // Handle form submission to backend
      console.log('Form submitted:', formData)
    }
  }

  const renderAuthSection = () => (
    <div className="form-section">
      <h2>Create Your Account</h2>
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="John Doe"
          required
        />
      </div>
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
          minLength={8}
        />
      </div>
    </div>
  )

  const renderLocationSection = () => (
    <div className="form-section">
      <h2>Your Location</h2>
      <p className="location-info">
        Allow this site to access your location? We use it only for matching opportunities nearby.
      </p>
      <div className="location-options">
        <button
          type="button"
          className={`location-btn ${formData.location.type === 'auto' ? 'active' : ''}`}
          onClick={() => handleLocationTypeChange('auto')}
        >
          Use My Current Location
        </button>
        <button
          type="button"
          className={`location-btn ${formData.location.type === 'manual' ? 'active' : ''}`}
          onClick={() => handleLocationTypeChange('manual')}
        >
          Enter Manually
        </button>
      </div>
      {formData.location.type === 'manual' && (
        <div className="form-group">
          <label htmlFor="address">Address or Zip Code</label>
          <input
            type="text"
            id="address"
            name="location.address"
            value={formData.location.address}
            onChange={handleInputChange}
            placeholder="Enter your address or zip code"
          />
        </div>
      )}
    </div>
  )

  const renderSkillsSection = () => (
    <div className="form-section">
      <h2>Your Skills</h2>
      <div className="form-group">
        <label htmlFor="primarySkills">Primary Skills</label>
        <input
          type="text"
          id="primarySkills"
          name="skills.primary"
          value={formData.skills.primary}
          onChange={handleInputChange}
          placeholder="Digital Marketing, Guitar Tutoring, Plumbing"
        />
      </div>
      <div className="form-group">
        <label htmlFor="skillDescription">Skill Description / Bio</label>
        <textarea
          id="skillDescription"
          name="skills.description"
          value={formData.skills.description}
          onChange={handleInputChange}
          placeholder="Tell us about your experience and what you can offer..."
          rows={4}
        />
      </div>
    </div>
  )

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="progress-bar">
          {[1, 2, 3].map(num => (
            <div
              key={num}
              className={`progress-step ${step >= num ? 'active' : ''}`}
            >
              {num}
            </div>
          ))}
        </div>

        {step === 1 && renderAuthSection()}
        {step === 2 && renderLocationSection()}
        {step === 3 && renderSkillsSection()}

        <div className="form-actions">
          {step > 1 && (
            <button
              type="button"
              className="back-btn"
              onClick={() => setStep(prev => prev - 1)}
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="next-btn"
            disabled={!validateStep()}
          >
            {step === 3 ? 'Sign Up' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm