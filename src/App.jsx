import './CSS/App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './SubComponents/AdminLogin';
import Home from './Maincomponents/Home';
import ConferenceHome from './SubComponents/ConferenceHome';
import Navbar from './SubComponents/Navbar';
import Footer from './SubComponents/Footer';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); 
  };

  return (
    <Router>
      <Routes>
        {/* Routes with Navbar */}
        <Route path="/" element={<><Navbar /><ConferenceHome /> <Footer /></>} />
        <Route path="/login" element={<><Navbar /><AdminLogin onLoginSuccess={handleLoginSuccess} /></>} />

        {/* Protected Route - Only accessible if logged in */}
        <Route 
          path="/home" 
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
