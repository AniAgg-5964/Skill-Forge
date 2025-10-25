import React from 'react'
import './SearchBar.css'

const SearchBar = ({ searchParams, onSearchChange }) => {
  const handleChange = (field) => (e) => {
    onSearchChange({
      ...searchParams,
      [field]: field === 'radius' ? Number(e.target.value) : e.target.value
    })
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Find Skills Near You</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search skills..."
          className="bg-gray-800 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          value={searchParams.keyword}
          onChange={handleChange('keyword')}
        />
        <input
          type="text"
          placeholder="Location"
          className="bg-gray-800 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          value={searchParams.location}
          onChange={handleChange('location')}
        />
        <select
          className="bg-gray-800 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          value={searchParams.radius}
          onChange={handleChange('radius')}
        >
          <option value={1}>Within 1km</option>
          <option value={5}>Within 5km</option>
          <option value={10}>Within 10km</option>
        </select>
      </div>
    </div>
  )
}

export default SearchBar