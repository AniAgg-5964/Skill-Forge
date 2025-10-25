import { Routes, Route } from 'react-router-dom';
import GooeyNav from './components/Navbar/Navbar';
import Squares from './components/Squares/Squares';
import Landing from './components/Landing/Landing';
import SignUpForm from './components/SignUpForm/SignUpForm';

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
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </div>
  );
}

export default App;
 