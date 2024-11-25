import { useState, useEffect } from 'react';
import '../CSS/darkmode.css'

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
      document.body.classList.toggle('dark-mode', savedMode === 'true');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      document.body.classList.toggle('dark-mode', newMode);
      return newMode;
    });
  };

  return (
        <button onClick={toggleDarkMode} className="dark-mode-toggle-btn">
            {darkMode ? (
                <img className='light' src="../Assets/light-theme.svg" alt="Light Mode" />
            ) : (
                <img className='dark' src="../Assets/dark-mode.svg" alt="Dark Mode" />
            )}
        </button>
  );
};

export default DarkMode;
