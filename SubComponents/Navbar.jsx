import '../CSS/Navbar.css';
import Logo from '../SubComponents/Logo.jsx'
import AdminLogin from './AdminLogin.jsx';

const Navbar = () => {
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
        <button onClick={<AdminLogin />} className="signin-btn">Sign In</button>
      </div>
    </nav>

  );
};

export default Navbar;
