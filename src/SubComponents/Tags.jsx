import PropTypes from 'prop-types';

const Tags = ({ height = '40px', width = '40px', backgroundColor = '#F5F0E5', borderRadius = '12px' }) => {
  const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor,
    borderRadius,
    width,
    height,
    padding: '12px',
    marginRight:'8px',
  };

  const imageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  };

  return (
    <div style={styles}>
      <img 
        src="/Assets/play-button-svgrepo-com.svg" 
        alt="Tag Icon" 
        style={imageStyles} 
      />
    </div>
  );
};

// Adding PropTypes validation
Tags.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.string,
};

export default Tags;
