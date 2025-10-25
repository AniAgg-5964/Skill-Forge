import { useState } from 'react'
import './App.css'

import Navbar from "./components/Navbar/Navbar.jsx";
import SearchBar from './components/SearchBar/SearchBar.jsx'
import SkillCard from './components/SkillCard/SkillCard.jsx'

function App() {
  const [user, setUser] = useState(null)
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    location: '',
    radius: 5 // default 5km radius
  })

  // Mock data for demonstration
  const mockSkills = [
    {
      id: 1,
      title: 'Digital Marketing',
      provider: 'John Doe',
      rating: 5.0,
      description: 'Specialized in social media marketing and content strategy',
      distance: 2.5,
      onBook: (id) => console.log(`Booking skill with id: ${id}`)
    }
    // Add more mock skills as needed
  ]

  const handleSignIn = () => {
    // Implement sign in logic
    console.log('Sign in clicked')
  }

  const handleSignUp = () => {
    // Implement sign up logic
    console.log('Sign up clicked')
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar 
        user={user}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar 
          searchParams={searchParams}
          onSearchChange={setSearchParams}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {mockSkills.map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App