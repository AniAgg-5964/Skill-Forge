import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GooeyNav from './components/Navbar/Navbar';
import Squares from './components/Squares/Squares';
import Landing from './components/Landing/Landing';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignIn/SignIn';
import SkillFeedDashboard from './components/SkillFeedDashboard/SkillFeedDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('auth-change', handleAuthChange);
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

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
        <Route path="/signin" element={<SignInForm />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <SkillFeedDashboard /> : <Navigate to="/" />} 
        />
      </Routes>
    </div>
  );
}

export default App;
 