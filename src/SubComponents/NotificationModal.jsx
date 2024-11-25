import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import "../CSS/notificationModal.css";

const NotificationModal = ({ onClose }) => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [message, setMessage] = useState("");
  const [csvFile, setCsvFile] = useState(null);

  
  useEffect(() => {
    fetch("http://localhost:5000/api/programs")
      .then((res) => res.json())
      .then((data) => setPrograms(data))
      .catch((error) => console.error("Error fetching programs:", error));
  }, []);

  
  const handleFileUpload = (files) => {
    setCsvFile(files[0]); 
  };

  const handleSend = async () => {
    if (!selectedProgram || !message || !csvFile) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("programTitle", selectedProgram);
    formData.append("message", message);
    formData.append("csvFile", csvFile);

    try {
      const response = await fetch("http://localhost:5000/api/send-notification", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      alert(result.message || result.error); 
      onClose();
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".csv", 
    onDrop: handleFileUpload, 
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Send Notification</h2>
        <select value={selectedProgram} onChange={(e) => setSelectedProgram(e.target.value)}>
          <option value=""> <p className="prompt-header">Select Program</p> </option>
          {programs.map((program) => (
            <option key={program.id} value={program.title}>
              {program.title}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Drag and drop area */}
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>{csvFile ? `Send to: ${csvFile.name}` : "Drag & drop your CSV file here, or click to select"}</p>
        </div>

        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

NotificationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default NotificationModal;
