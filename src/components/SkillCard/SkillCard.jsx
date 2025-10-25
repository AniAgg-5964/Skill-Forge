import React from 'react';
import './SkillCard.css';

const SkillCard = ({ skill }) => {
  return (
    <div className="skillcard">
      <div className="skillcard-header">
        <div>
          <h3 className="skillcard-title">{skill.title}</h3>
          <p className="skillcard-provider">{skill.provider}</p>
        </div>
        <div className="skillcard-rating">
          {skill.rating} ★
        </div>
      </div>
      <p className="skillcard-description">{skill.description}</p>
      <div className="skillcard-footer">
        <span className="skillcard-distance">{skill.distance} km away</span>
        <button 
          className="skillcard-button"
          onClick={() => skill.onBook(skill.id)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default SkillCard;
