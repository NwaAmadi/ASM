import './CSS/App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './SubComponents/AdminLogin';
import Home from './Maincomponents/Home';
import ConferenceHome from './SubComponents/ConferenceHome';
import Navbar from './SubComponents/Navbar';
import Footer from './SubComponents/Footer';
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status from localStorage on initial load
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle successful login and persist the state
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); 
    localStorage.setItem('isLoggedIn', 'true');
  };

  // Handle logout and remove the session data
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={(
            <>
              <Navbar />
              <ConferenceHome />
              <Footer />
            </>
          )}
        />
        
        <Route 
          path="/login" 
          element={(
            <>
              <Navbar />
              <AdminLogin onLoginSuccess={handleLoginSuccess} />
            </>
          )}
        />
        
        <Route 
          path="/home" 
          element={isLoggedIn ? (
            <>
              <Home />
              <Footer/>
            </>
          ) : (
            <Navigate to="/" />
          )}
        />

        {/* Optional Route for Logout */}
        <Route 
          path="/logout"
          element={<Navigate to="/" />}
        />

        {/* Catch-All Route (For 404 or non-existing paths) */}
        <Route 
          path="*" 
          element={(
            <>
              <Navbar />
              <ConferenceHome />
              <Footer />
            </>
          )}
        />
      </Routes>
    </Router>
  );
}

export default App;
