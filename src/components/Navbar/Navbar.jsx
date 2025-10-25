import React from 'react'
import './Navbar.css'

const Navbar = ({ user, onSignIn, onSignUp }) => {
  return (
    <nav className="bg-gray-900 border-b border-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-400">Skill Forge</h1>
          {!user ? (
            <div className="space-x-4">
              <button 
                onClick={onSignIn}
                className="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={onSignUp}
                className="px-6 py-2 rounded-full border border-purple-600 hover:bg-purple-900/50 transition-colors"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
              <span className="sr-only">User Profile</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar