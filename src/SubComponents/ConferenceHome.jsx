import { useEffect, useState } from 'react';
import '../CSS/ConferenceHome.css';
import '../CSS/dark-mode.css';
{/*import PlayButton from '../SubComponents/PlayButton';*/}
import RedDot from '../SubComponents/RedDot';
{/*import InfoIcon from '../SubComponents/InfoIcon';*/}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) {
    return 'Invalid Date';
  }

  const year = date.getFullYear();
  const day = date.getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'Nov.', 'December'
  ];

  const month = monthNames[date.getMonth()];
  return `${month} ${day}, ${year}`;
}

function getCurrentMonthAndYear() {
  const date = new Date();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
}

function getCurrentDay() {
  return new Date().getDate();
}

function getCurrentMonth() {
  const date = new Date();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return monthNames[date.getMonth()];
}

const ConferenceHome = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProgram, setHoveredProgram] = useState(null);

  const currentMonth = getCurrentMonth();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Assuming JWT is stored in localStorage

        const response = await fetch('https://asm-backend-ztv1.onrender.com/api/programs', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Add JWT token to Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch programs');
        }

        const data = await response.json();

        const now = new Date();
        const formattedPrograms = data.map((program) => {
          const programDate = new Date(program.date);
          let status = 'Upcoming';

          if (programDate < now) {
            status = 'Completed';
          } else if (programDate <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)) {
            status = 'This Week';
          } else if (programDate > now) {
            status = 'Coming Soon';
          }

          return { ...program, status };
        });

        setPrograms(formattedPrograms);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) return (
    <div className='loadingdiv'>
      <p 
        className='loading' 
        role="status"
        aria-live="polite"
        aria-label="Loading programs"
      >
        Loading programs, please wait<span className="loading__dots"></span>
      </p>
    </div>
  );
  
  if (error) return (
    <div className='errordiv'>
      <p 
        className='error' 
        role="alert"
        aria-live="assertive"
        aria-label="Error message"
      >
        Error: {error} !
      </p>
    </div>
  );

  return (
    <div>
      <div className="conference-home">
        <div className="banner">
          <h1>{getCurrentMonthAndYear()}</h1>
          <p>
            Join us for an enriching program designed for church workers & members, where
            inspiration, growth, and collaboration come together
            to strengthen our faith and service.
          </p>
        </div>

        <div className="schedule-section">
          <div className="month">
            <div className="month-name">
              <RedDot color="green" />
              <h2>{currentMonth}</h2>
              <h2>{"'"}{getCurrentDay()}</h2>
            </div>
          </div>

          <h2 className='UCP'>Upcoming Church Programs</h2>
          <div className="program-cards-container">
            {programs.length > 0 ? (
              programs.map((program) => (
                <div className="program-card" key={program.id}>
                  <h3>{program.title}</h3>
                  <p><strong>Date:</strong> {formatDate(program.date)}</p>
                  <p><strong>Time:</strong> {program.duration || 'TBA'}</p>
                  <p><strong>Location:</strong> {program.location || 'TBA'}</p>
                  <span
                    className={`program-status status-${program.status.toLowerCase().replace(' ', '-')}`}
                  >
                    {program.status}
                  </span>
                </div>
              ))
            ) : (
              <p>No programs available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceHome;
