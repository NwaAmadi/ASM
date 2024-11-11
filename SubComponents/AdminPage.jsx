import { useEffect, useState } from 'react';
import ProgramCard from './ProgramCard';

const AdminPage = () => {
  const [programs, setPrograms] = useState([]);

  // Fetch programs from the backend API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/programs');
        const data = await response.json();
        setPrograms(data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Programs List</h1>
      {programs.length === 0 ? (
        <p>No programs available</p>
      ) : (
        programs.map((program, index) => (
          <ProgramCard
            key={index}
            title={program.title}
            dates={program.dates}
            duration={program.duration}
          />
        ))
      )}
    </div>
  );
};

export default AdminPage;
