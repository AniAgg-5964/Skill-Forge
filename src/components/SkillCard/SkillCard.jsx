import React from 'react'
import './SkillCard.css'

const SkillCard = ({ skill }) => {
  return (
    <div className="bg-gray-900 rounded-xl p-6 hover:ring-2 hover:ring-purple-500 transition-all cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{skill.title}</h3>
          <p className="text-gray-400">{skill.provider}</p>
        </div>
        <div className="bg-purple-600 text-xs px-3 py-1 rounded-full">
          {skill.rating} ★
        </div>
      </div>
      <p className="text-gray-300 mb-4">{skill.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">{skill.distance} km away</span>
        <button 
          onClick={() => skill.onBook(skill.id)}
          className="px-4 py-2 rounded-3xl bg-purple-600 hover:bg-purple-700 transition-colors text-sm"
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

export default SkillCard