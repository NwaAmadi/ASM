import { useEffect, useState } from 'react';
import '../CSS/ConferenceHome.css';
import PlayButton from './PlayButton';
import RedDot from './RedDot';

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

function getCurrentMonth() {
  const date = new Date(); 
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const month = monthNames[date.getMonth()];
  return month;
}

const ConferenceHome = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentMonth = getCurrentMonth();  // Get the current month (e.g., 'November')

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/programs');
        if (!response.ok) {
          throw new Error('Failed to fetch programs');
        }
        const data = await response.json();
        setPrograms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) return <p>Loading programs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="conference-home">
        {/* Banner Section */}
        <div className="banner">
          <h1>{getCurrentMonthAndYear()}</h1>
          <p>
            Join us for an enriching program designed for church workers, where inspiration, growth, and collaboration come together to strengthen our faith and service.
          </p>
        </div>

        {/* Schedule Section */}
        <div className="schedule-section">
          <h2>{getCurrentMonth()}</h2>
          {programs.length > 0 ? (
            programs.map((program) => {
              const programMonth = new Date(program.date).toLocaleString('default', { month: 'long' });
              const isCurrentMonth = programMonth === currentMonth;

              // Set color based on priority
              let dotColor;
              switch (program.priority) {
                case 'Mandatory':
                  dotColor = 'red';
                  break;
                case 'Medium':
                  dotColor = 'gray';
                  break;
                case 'Low':
                  dotColor = '#009963';
                  break;
                default:
                  dotColor = 'gray';  // Default color if priority is not defined
                  break;
              }

              return (
                <div 
                  className={`program-item ${isCurrentMonth ? '' : 'fade-out'}`} 
                  key={program.id}
                >
                  <button className="play-icon"><PlayButton /></button>
                  <div className="program-details">
                    <h3>{program.title}</h3>
                    <p>Hosted by: {program.speakers || 'TBA'}</p>
                  </div>
                  <div className="priority">
                    <RedDot color={dotColor} />
                    <span className="priority-text">{program.priority}</span>
                  </div>
                  <span className="program-duration">{formatDate(program.date)}</span>
                </div>
              );
            })
          ) : (
            <p>No programs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConferenceHome;
