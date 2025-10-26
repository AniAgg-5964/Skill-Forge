import { useState } from 'react';
import { Link } from 'react-router-dom';
import ShinyText from '../ShinyText/ShinyText';
import Squares from '../Squares/Squares';
import './Landing.css';
import SpotlightCard from '../Card/SpotlightCard';
import RotatingText from '../Tagline/RotatingText';

const Landing = () => {
  const [isAuthenticated] = useState(!!localStorage.getItem('token'));

  return (
    <div className="landing-container">
      
      <div className="content-container">
        <div className="hero-section">
          <ShinyText text="Welcome to Skill Forge" disabled={false} speed={3} className="hero-title" />
          <p className="hero-subtitle">Your Ultimate Platform for Hackathon Team Formation and Project Management</p>
        </div>

        <div className="features-section">
            <div className="cards-container">
            <SpotlightCard
              title="Geo-Location Matching"
              content="This feature directly addresses the core problem of connecting residents with local help or learning opportunities in their vicinity.This feature allows users to discover and filter skill offerings or requests based on their geographical location."
              buttonText="Get Started"
              className="custom-spotlight-card"
            />
            <SpotlightCard
              title="User Auth & Verification"
              content="This feature establishes the necessary trust and security required for individuals to feel safe sharing or seeking skills within their community.This involves secure sign-up/login mechanisms and processes for verifying user identity and skills."
              buttonText="Get Started"
              className="custom-spotlight-card"
            /></div>
            <div className="cards-container">
            <SpotlightCard
              title="Booking & Scheduling"
              content=" This is the transactional mechanism that facilitates the actual exchange of skills once two parties have been connected. This platform includes a built-in calendar for scheduling sessions between users."
              buttonText="Get Started"
              className="custom-spotlight-card"
            />
            <SpotlightCard
              title="Reputation System"
              content="This system fosters the long-term trust and reliability needed for a community-based platform, encouraging participation and quality service. This involves ratings and skill endorsements that are visible on a user's profile."
              buttonText="Get Started"
              className="custom-spotlight-card"
            /></div>
          
        </div>
      </div>
    </div>
  );
};

export default Landing;