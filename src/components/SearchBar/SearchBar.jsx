import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchParams, onSearchChange }) => {
  const handleChange = (field) => (e) => {
    onSearchChange({
      ...searchParams,
      [field]: field === 'radius' ? Number(e.target.value) : e.target.value,
    });
  };

  return (
    <div className="searchbar-container">
      <h2 className="searchbar-title">Find Skills Near You</h2>
      <div className="searchbar-grid">
        <input
          type="text"
          placeholder="Search skills..."
          className="searchbar-input"
          value={searchParams.keyword}
          onChange={handleChange('keyword')}
        />
        <input
          type="text"
          placeholder="Location"
          className="searchbar-input"
          value={searchParams.location}
          onChange={handleChange('location')}
        />
        <select
          className="searchbar-input"
          value={searchParams.radius}
          onChange={handleChange('radius')}
        >
          <option value={1}>Within 1km</option>
          <option value={5}>Within 5km</option>
          <option value={10}>Within 10km</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
