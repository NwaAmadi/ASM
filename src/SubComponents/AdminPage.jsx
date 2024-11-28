import { useEffect, useState } from 'react';
import ProgramCard from './ProgramCard';
import FormatDate from './FormatDate';


const AdminPage = () => {
  const [programs, setPrograms] = useState([]);

  // Fetch programs from the backend API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('https://asm-backend-y6oz.onrender.com/api/programs');
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
            dates={FormatDate(program.dates)}
            duration={program.duration}
          />
        ))
      )}
    </div>
  );
};

export default AdminPage;
