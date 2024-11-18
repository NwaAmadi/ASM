import "../CSS/adminSidebar.css";
import Logo from "./Logo";
import { useState } from "react";
import ProgramForm from './ProgramForm';

const AdminSidebar = () => {

  const [isOpen, setIsOpen] = useState(false);

    // Function to toggle dropdown
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

  return (
    <div>
      
      <div className="sidebar">
        <div className="sidebar-content">
          <ul>
            <div className="Top">
              <Logo />
              <h4>Admin</h4>
            </div>
            <li>
              <img className="sidebar-icon" src="../Assets/Home.svg" alt="Home" />
              <a href="#home">Dashboard</a>
            </li>
            <li>
              <img className="sidebar-icon" src="../Assets/Calendar.svg" alt="Programs" />
              <a href="#about">Programs</a>
            </li>
            <li>
              <img className="sidebar-icon" src="../Assets/Speakers.svg" alt="Speakers" />
              <a href="#services">Speakers</a>
            </li>
            <li>
              <img className="sidebar-icon" src="../Assets/Attendees.svg" alt="Notify" />
              <a href="#Notify">Notify</a>
            </li>
            <li>
              <img className="sidebar-icon" src="../Assets/Settings.svg" alt="settings" />
              <a href="#settings">Settings</a>
            </li>
          </ul>
        </div>
       
        <div className="create-program">
          <button onClick={handleToggle}>Create a New Program</button>
        </div>
      </div>

      {isOpen && <ProgramForm />}
    </div>
  );
};

export default AdminSidebar;
