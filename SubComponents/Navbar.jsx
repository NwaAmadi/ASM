import '../CSS/Navbar.css';
import Logo from '../SubComponents/Logo.jsx';
import { useNavigate } from 'react-router-dom';
import Login from './Login.jsx';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-logo">
        <Logo />
      </div>

      {/* Center: Title */}
      <div className="navbar-title">ASC Schedule Manager</div>

      {/* Right: Sign-in Button */}
      <div className="navbar-signin">
        <button onClick={handleSignInClick} className="signin-btn">
          <Login />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
