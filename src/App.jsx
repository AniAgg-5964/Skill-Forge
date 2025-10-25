import { useState } from 'react'
import './App.css'
import Landing from './components/Landing/Landing'
import GooeyNav from './components/Navbar/Navbar'

function App() {
  return (
    <div className="app">
      <GooeyNav />
      <Landing />
    </div>
  )
}

export default App