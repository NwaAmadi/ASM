import '../CSS/App.css';
import { useState } from 'react';
import Home from '../Maincomponents/Home';
import Footer from '../SubComponents/Footer';
import AdminLogin from '../SubComponents/AdminLogin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  // Handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);  
  };

  return (
    <div className="Mainbody">
      
      {isLoggedIn ? (
        <>
          <Home /> 
          <Footer />
        </>
      ) : (
        <AdminLogin onLoginSuccess={handleLoginSuccess} /> 
      )}
    </div>
  );
}

export default App;
