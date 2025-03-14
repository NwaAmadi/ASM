import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../CSS/AdminLogin.module.css';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const response = await fetch('https://asm-backend-ztv1.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Response Data:', data); 

      if (response.ok) {
        // Use 'data.access_token' instead of 'data.token'
        const jwtToken = data.access_token; 
        if (jwtToken) {
          
          localStorage.setItem('jwtToken', jwtToken);
          console.log('JWT Token:', jwtToken); 
          navigate('/home');
          onLoginSuccess();
        } else {
          setError('No token received');
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Error:', error); 
    } finally {
      setIsLoading(false); // End loading
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
              placeholder="Username"
              required
              className={styles['input-field']}
            />
          </div>
          <div className={styles['input-group']}>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles['input-field']}
            />
          </div>
          <button type="submit" className={styles['login-button']} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
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
