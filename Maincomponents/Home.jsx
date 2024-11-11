import AdminSidebar from "../SubComponents/adminSidebar";
import '../CSS/home.css';
import AdminHeader from "../SubComponents/AdminHeader";
import SearchBar from "../SubComponents/SearchBar";
import ProgramCard from "../SubComponents/ProgramCard";
import { useEffect, useState } from 'react';

function Home() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch programs from the backend API
    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/programs'); // Correct backend URL
                if (!response.ok) {
                    throw new Error('Failed to fetch programs');
                }
                const data = await response.json();
                setPrograms(data);  // Set the fetched programs to the state
                setLoading(false);
            } catch (error) {
                console.error('Error fetching programs:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);  // This useEffect runs once when the component mounts

    return (
        <div className="Body">
            <div className="Home">
                <AdminHeader />
                <AdminSidebar />
                <SearchBar />
                
                {/* Display loading state, error message, or program cards */}
                {loading && <p>Loading programs...</p>}
                {error && <p>Error loading programs: {error.message}</p>}
                {!loading && programs.length === 0 && <p>No programs available</p>}
                
                {!loading && programs.length > 0 && (
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
        </div>
    );
}

export default Home;
