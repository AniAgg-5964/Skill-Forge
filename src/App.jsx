import { useState } from 'react'
import './App.css'
import Landing from './components/Landing/Landing'
import GooeyNav from './components/Navbar/Navbar'
import Squares from './components/Squares/Squares'

function App() {
  return (
    <div className="app">
      <GooeyNav />
      <Squares
            speed={0.3}
            squareSize={50}
            direction="diagonal"
            borderColor="rgba(255, 255, 255, 0.09)"
            hoverFillColor="rgba(204, 153, 255, 0.5)"
          />
      <Landing />
    </div>
  )
}

export default App