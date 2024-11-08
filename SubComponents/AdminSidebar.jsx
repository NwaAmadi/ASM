import "../CSS/adminSidebar.css";
import Logo from "./Logo";

const AdminSidebar = () => {
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
              <img className="sidebar-icon" src="../Assets/Attendees.svg" alt="Attendees" />
              <a href="#Attendees">Attendees</a>
            </li>
            <li>
              <img className="sidebar-icon" src="../Assets/Settings.svg" alt="settings" />
              <a href="#settings">Settings</a>
            </li>
          </ul>
        </div>
       
        <div className="create-program">
          <button>Create a New Program</button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
