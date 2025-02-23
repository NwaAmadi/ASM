import { useState, useEffect, useRef } from 'react';
import '../CSS/AdminHeader.css';
import ProgramForm from './ProgramForm';

function AdminHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [programs, setPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(''); // Store the program ID here
    const deleteDropdownRef = useRef(null);

    // Fetch programs from the backend API
    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await fetch('https://asm-backend-ztv1.onrender.com/api/programs');
                const data = await response.json();
                setPrograms(data);
            } catch (error) {
                console.error('Error fetching programs:', error);
            }
        };

        fetchPrograms();
    }, []);

    // Toggle the create program form
    const handleToggleCreateForm = () => {
        setIsOpen(!isOpen);
        setIsDeleteOpen(false);
    };

    // Toggle the delete program dropdown
    const handleToggleDeleteDropdown = () => {
        setIsDeleteOpen(!isDeleteOpen);
        setIsOpen(false);
    };

    // Handle program selection
    const handleProgramSelect = (event) => {
        setSelectedProgram(event.target.value); // Set the selected program's ID
    };

    // Confirm and delete the selected program
    const handleDeleteProgram = async (programId) => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this program?\nWarning! This action can't be undone!!"
        );

        if (confirmation) {
            console.log("Deleting program with ID:", programId); // Debugging log
            try {
                const token = localStorage.getItem('jwtToken');

                if (!token) {
                    alert("Unauthorized: No token found. Please log in.");
                    return;
                }

                const response = await fetch(`https://asm-backend-ztv1.onrender.com/api/programs/${programId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    alert("Program deleted successfully");
                    setPrograms(programs.filter(program => program.id !== programId));
                    setIsDeleteOpen(false);
                } else {
                    const errorResponse = await response.json();
                    console.error("Error response from backend:", errorResponse);
                    alert(`Failed to delete program: ${errorResponse.message || "Unknown error"}`);
                }
            } catch (error) {
                console.error("Error deleting program:", error);
                alert("Error deleting program");
            }
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (deleteDropdownRef.current && !deleteDropdownRef.current.contains(event.target)) {
                setIsDeleteOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className="content">
                <div className='uppersection'>
                    <h2>Conference Programs</h2>

                    <div className='button-holder'>
                        <button
                            className='create-program-button'
                            onClick={handleToggleCreateForm}
                        >
                            + | New Program
                        </button>
                        
                        <button
                            className='delete-program-button'
                            onClick={handleToggleDeleteDropdown} // Open delete dropdown
                        >
                            - | Delete Program
                        </button>
                    </div>
                </div>

                {isOpen && <ProgramForm closeForm={() => setIsOpen(false)} />} {/* Pass closeForm to ProgramForm */}

                {/* Delete Program Dropdown */}
                {isDeleteOpen && (
                    <div className='delete-dropdown-overlay'>
                        <div className="delete-dropdown" ref={deleteDropdownRef}>
                            <h4>Select a Program to Delete</h4>
                            <select value={selectedProgram} onChange={handleProgramSelect}>
                                <option value="">Select Program</option>
                                {programs.map((program, index) => (
                                    <option key={index} value={program.id}> {/* Set value to program's ID */}
                                        {program.title}
                                    </option>
                                ))}
                            </select>
                            <button 
                                onClick={() => handleDeleteProgram(selectedProgram)} 
                                className="confirm-delete-button"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminHeader;
