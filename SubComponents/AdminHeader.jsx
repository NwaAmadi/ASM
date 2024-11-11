import { useState } from 'react';
import '../CSS/AdminHeader.css';
import ProgramForm from './ProgramForm';  // Import the form component

function AdminHeader() {
    // State to toggle the visibility of the form
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle dropdown
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="content">
                <div className='uppersection'>
                    <h2>Conference Programs</h2>

                    <div className='button-holder'>
                        {/* Button to toggle the form dropdown */}
                        <button
                            className='create-program-button'
                            onClick={handleToggle}
                        >
                            + | New Program
                        </button>
                        
                        <button className='delete-program'> - | Delete Program</button>
                    </div>
                </div>
                
                {/* Show the form if isOpen is true */}
                {isOpen && <ProgramForm />}
            </div>
        </div>
    );
}

export default AdminHeader;
