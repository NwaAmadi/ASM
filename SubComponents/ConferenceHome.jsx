// ConferenceHome.jsx
import { useEffect, useState } from 'react';
import '../CSS/ConferenceHome.css';
import PlayButton from './PlayButton';

const ConferenceHome = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="conference-home">
      {/* Banner Section */}
      <div className="banner">
        <h1>June 2024</h1>
        <p>
          Join us for an enriching program designed for church workers, where inspiration, growth, and collaboration come together to strengthen our faith and service.
        </p>
        {/*<button className="buy-tickets-btn">Buy Tickets</button>*/}
      </div>

      {/* Navigation Tabs 
      <div className="tabs">
        <button className="tab active">Schedule</button>
        <button className="tab">Speakers</button>
      </div>*/}

      {/* Schedule Section */}
      <div className="schedule-section">
        <h2>June 14</h2>
        {programs.length > 0 ? (
          programs.map((program) => (
            <div className="program-item" key={program.id}>
              <button className="play-icon"><PlayButton /></button>
              <div className="program-details">
                <h3>{program.title}</h3>
                <p>Hosted by: {program.speakers || 'TBA'}</p>
              </div>
              <span className="program-duration">{program.date}</span>
            </div>
          ))
        ) : (
          <p>No programs available.</p>
        )}
      </div>
    </div>
  );
};

export default ConferenceHome;
