import AdminSidebar from "../SubComponents/AdminSidebar";
import '../CSS/home.css';
import AdminHeader from "../SubComponents/AdminHeader";
import SearchBar from "../SubComponents/SearchBar";
import ProgramCard from "../SubComponents/ProgramCard";
import { useEffect, useState } from 'react';
import Footer from '../SubComponents/Footer'
import Navbar from "../SubComponents/Navbar";
function Home() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await fetch('https://asm-backend-ztv1.onrender.com/api/programs');
                if (!response.ok) {
                    throw new Error('Failed to fetch programs');
                }
                const data = await response.json();
                setPrograms(data); 
                setLoading(false);
            } catch (error) {
                console.error('Error fetching programs:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []); 

    return (
        <div className="Body-container">
            <div className="Home">
                <Navbar />
                <AdminHeader />
                <AdminSidebar />
                <SearchBar />
                
                
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
            <Footer />
        </div>
    );
}

export default Home;
