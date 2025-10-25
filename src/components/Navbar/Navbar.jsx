import React from 'react';
import './Navbar.css';

const Navbar = ({ user, onSignIn, onSignUp }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Skill Forge</h1>
        {!user ? (
          <div className="navbar-buttons">
            <button className="btn btn-signin" onClick={onSignIn}>
              Sign In
            </button>
            <button className="btn btn-signup" onClick={onSignUp}>
              Sign Up
            </button>
          </div>
        ) : (
          <button className="btn btn-user">
            <span className="sr-only">User Profile</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
