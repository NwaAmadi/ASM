import '../CSS/Navbar.css';
import Logo from '../SubComponents/Logo.jsx';
import { useNavigate } from 'react-router-dom';
import Login from '../SubComponents/Login.jsx';
import DarkMode from '../SubComponents/DarkMode.jsx';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Logo />
      </div>

      <div className="navbar-title">ASC Schedule Manager</div>

      <div className="navbar-signin">
        <button className='Modes'>
          <DarkMode />
        </button>

        <button onClick={handleSignInClick} className="signin-btn">
          <Login />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
