import PropTypes from 'prop-types'; // Importing PropTypes

const Footer = ({ text }) => {
  return (
    <footer style={footerStyle}>
      {/* Copyright Logo and Text */}
      <span style={iconStyle}>&#169;</span> {/* Copyright symbol */}
      <p style={textStyle}>{text}</p>
    </footer>
  );
};

// Setting default props
Footer.defaultProps = {
  text: "Aba South Conference of Seventh-day Adventist Church",
};

// Prop validation
Footer.propTypes = {
  text: PropTypes.string, 
};

// Styles
const footerStyle = {
  display: 'flex',
  alignItems: 'center',  
  justifyContent: 'center', 
  padding: '5px', 
  backgroundColor: '#3f3f3f', 
  height: 'auto', 
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  textAlign:'center',
};

const iconStyle = {
  fontSize: '16px', 
  marginRight: '5px', 
  color: '#fff', 
};

const textStyle = {
  fontSize: '10px', 
  color: '#ffff',  
  fontFamily: 'Arial, sans-serif', 
  fontWeight: 'normal', 
  lineHeight: '1.5', 
  margin: 0, 
  letterSpacing: '0.5px', 
};

export default Footer;
