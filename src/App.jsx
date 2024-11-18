import '../CSS/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from '../SubComponents/AdminLogin';
import Home from '../Maincomponents/Home';
import ConferenceHome from '../SubComponents/ConferenceHome';
import Navbar from '../SubComponents/Navbar';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with Navbar */}
        <Route path="/" element={<><Navbar /><ConferenceHome /></>} />
        <Route path="/login" element={<><Navbar /><AdminLogin /></>} />

        {/* Route without Navbar */}
        <Route path="/home" element={<Home />} />
      </Routes>
      
    </Router>
  );
}

export default App;