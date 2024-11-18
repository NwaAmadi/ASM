import { useState } from 'react';
import PropTypes from 'prop-types'; 
import styles from '../CSS/AdminLogin.module.css';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import Home from '../Maincomponents/Home';

function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Import useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      
      navigate(<Home />);
      onLoginSuccess(); // Update state in Navbar
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={styles['login-page']}> 
      <div className={styles['login-container']}>
        <div className={styles['login-header']}>
          <Logo />
          <p className={styles['login-title']}>ASC Schedule Manager</p>
        </div>
        <form onSubmit={handleSubmit} className={styles['login-form']}>
          <div className={styles['input-group']}>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              required
              className={styles['input-field']}
            />
          </div>
          <div className={styles['input-group']}>
            <input
              type="password"
              id="password"
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles['input-field']}
            />
          </div>
          <button type="submit" className={styles['login-button']}>Login</button>
          {error && <p className={styles['error-message']}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

AdminLogin.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default AdminLogin;
