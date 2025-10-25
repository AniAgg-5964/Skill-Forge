import React, { useState } from 'react';
import { useGeolocated } from 'react-geolocated';
import './SignUpForm.css';

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    location: {
      method: 'manual', // ✅ changed from type
      address: '',
      coordinates: null,
    },
    skills: [{ primary: '', description: '' }],
  });

  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: false },
      userDecisionTimeout: 5000,
      suppressLocationOnMount: true,
    });

  // Handle input field changes (supports nested objects)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle switching between manual & automatic location
  const handleLocationMethodChange = async (method) => {
    if (method === 'auto') {
      try {
        await getPosition();
        if (coords) {
          setFormData((prev) => ({
            ...prev,
            location: {
              method: 'auto',
              coordinates: {
                latitude: coords.latitude,
                longitude: coords.longitude,
              },
              address: '',
            },
          }));
        } else {
          alert('Please allow location access in your browser.');
        }
      } catch (error) {
        console.error('Error getting location:', error);
        alert('Could not get your location. Try entering manually.');
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        location: {
          method: 'manual',
          address: '',
          coordinates: null,
        },
      }));
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Move to next step if not last step
    if (step < 3) {
      setStep(prev => prev + 1);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('✅ Signup successful:', data);
  
        // Save token
        localStorage.setItem('token', data.token);
  
        // Notify auth state change
        window.dispatchEvent(new Event('auth-change'));
  
        // ✅ Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        console.error('Signup failed:', data);
        alert(data.message || 'Signup failed. Try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Unable to connect to server. Please try again later.');
    }
  };

  const handleSkillChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    }));
  };

  // Add new skill field
  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { primary: '', description: '' }]
    }));
  };

  // Remove skill field
  const removeSkill = (index) => {
    if (formData.skills.length > 1) {
      setFormData(prev => ({
        ...prev,
        skills: prev.skills.filter((_, i) => i !== index)
      }));
    }
  };

  // Step validation
  const validateStep = () => {
    switch (step) {
      case 1:
        return (
          formData.fullName.trim() &&
          formData.email.trim() &&
          formData.password.length >= 8
        );
      case 2:
        return formData.location.method === 'auto'
          ? formData.location.coordinates
          : formData.location.address.trim();
      case 3:
        // ✅ Check every skill object safely
        return formData.skills.every(
          skill => skill?.primary?.trim() && skill?.description?.trim()
        );
      default:
        return false;
    }
  };

  // Render: Step 1
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
          minLength={8}
          required
        />
      </div>
    </div>
  );

  // Render: Step 2
  const renderLocationSection = () => (
    <div className="form-section">
      <h2>Your Location</h2>
      <p className="location-info">
        Allow this site to access your location? We use it only for matching
        nearby opportunities.
      </p>
      <div className="location-options">
        <button
          type="button"
          className={`location-btn ${
            formData.location.method === 'auto' ? 'active' : ''
          }`}
          onClick={() => handleLocationMethodChange('auto')}
        >
          Use My Current Location
        </button>
        <button
          type="button"
          className={`location-btn ${
            formData.location.method === 'manual' ? 'active' : ''
          }`}
          onClick={() => handleLocationMethodChange('manual')}
        >
          Enter Manually
        </button>
      </div>

      {formData.location.method === 'manual' && (
        <div className="form-group">
          <label htmlFor="address">Address or Zip Code</label>
          <input
            type="text"
            id="address"
            name="location.address"
            value={formData.location.address}
            onChange={handleInputChange}
            placeholder="Enter your address or zip code"
            required
          />
        </div>
      )}
    </div>
  );

  // Render: Step 3
 const renderSkillsStep = () => (
    <div className="form-step">
      <h2>Your Skills</h2>
      {formData.skills.map((skill, index) => (
        <div key={index} className="skill-entry">
          <div className="skill-header">
            <h3>Skill {index + 1}</h3>
            {formData.skills.length > 1 && (
              <button 
                type="button" 
                className="remove-skill-btn"
                onClick={() => removeSkill(index)}
              >
                Remove
              </button>
            )}
          </div>
          <div className="skill-input-group">
  <label htmlFor={`skill-primary-${index}`}>Primary Skill</label>
        <input
            type="text"
            id={`skill-primary-${index}`}
            placeholder="e.g., React Development, UI/UX Design"
            value={skill.primary}
            onChange={(e) => handleSkillChange(index, 'primary', e.target.value)}
            required
        />
        </div>

        <div className="skill-input-group">
        <label htmlFor={`skill-description-${index}`}>Skill Description</label>
        <textarea
            id={`skill-description-${index}`}
            placeholder="Describe your experience and expertise in this skill..."
            value={skill.description}
            onChange={(e) => handleSkillChange(index, 'description', e.target.value)}
            required
        />
        </div>
        </div>
      ))}
      <button 
        type="button" 
        className="add-skill-btn"
        onClick={addSkill}
      >
        Add Another Skill
      </button>
    </div>
  );

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="progress-bar">
          {[1, 2, 3].map((num) => (
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
        {step === 3 && renderSkillsStep()}

        <div className="form-actions">
          {step > 1 && (
            <button
              type="button"
              className="back-btn"
              onClick={() => setStep((prev) => prev - 1)}
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
  );
};

export default SignUpForm;
