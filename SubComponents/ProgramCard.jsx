import PropTypes from 'prop-types';

const ProgramCard = ({ title, dates, duration }) => {
  return (
    <div style={styles.banner}>
      <div style={styles.wreathContainer}>
        <img 
          src="../Assets/TagPix.svg" 
          alt="Wreath Icon" 
          style={styles.wreathImage} 
        />
      </div>
      <div style={styles.text}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.date}>{dates}</p>
      </div>
      <div style={styles.duration}>
        <p>{duration}</p>
      </div>
    </div>
  );
};

// Prop validation with PropTypes
ProgramCard.propTypes = {
  title: PropTypes.string.isRequired,
  dates: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
};

// Default props in case they are not provided
ProgramCard.defaultProps = {
  title: 'Conference 2022',
  dates: 'June 30, 2022 - July 2, 2022',
  duration: '3d 12h',
};

const styles = {
  banner: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    //backgroundColor: '#f7f2eb',
    borderRadius: '8px',
    fontFamily: "inter",
    marginTop:'20px',
    marginRight:'20px',
    height:'70px',
  },
  wreathContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    //backgroundColor: '#e8e2d1', // Light background for program icon
    marginRight: '10px',
  },
  wreathImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    flexGrow: 1,
  },
  text: {
    flexGrow: 1,
  },
  title: {
    fontSize: '15px',
    color: '#3c3c3b',
   
  },
  date: {
    fontSize: '12px',
    color: '#A1824A',
    marginBottom: '10px',
  },
  duration: {
    fontSize: '14px',
    color: '#3c3c3b',
    marginRight:'8px',
    backgroundColor:'#f7f2eb',
    borderRadius:'15px',
    paddingLeft:'7px',
    paddingRight:'7px',
    
  },
};

export default ProgramCard;
