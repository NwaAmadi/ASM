import PropTypes from 'prop-types';

const RedDot = ({ color }) => {
  const dotStyle = {
    width: '8px',            
    height: '8px',           
    backgroundColor: color,   
    borderRadius: '50%',    
    display: 'flex',          
    justifyContent: 'center', 
    alignItems: 'center',   
    marginRight: '5px',    
  };

  return <div style={dotStyle}></div>;
};

// Prop validation
RedDot.propTypes = {
  color: PropTypes.oneOf(['red', 'gray', '#009963']).isRequired,  // The color must be one of the specified values
};

export default RedDot;