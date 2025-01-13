import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'; 
import '../CSS/ProgramForm.css';

const ProgramForm = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    location: '',
    about: '',
    speakers: '',
  });

  const formRef = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeForm(); 
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeForm]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    try {
      const response = await fetch('https://asm-backend-y6oz.onrender.com/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Form submitted successfully:', result);
        closeForm(); 
      } else {
        alert('Submission failed:', result);
      }
    } catch (error) {
      alert('Error submitting form:', error);
    }
  };

  return (
    <div className="dropdown-content" ref={formRef}>
      <form onSubmit={handleSubmit}>
        <p>Add Program</p>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Program Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.locationocation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Speakers</label>
          <input
            type="text"
            name="speakers"
            value={formData.speakers}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};


ProgramForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
};

export default ProgramForm;
