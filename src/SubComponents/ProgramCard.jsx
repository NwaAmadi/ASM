import PropTypes from 'prop-types';
import '../CSS/programCard.css';
import Tags from './Tags';



const ProgramCard = ({ title, dates, duration }) => {
  return (
    <div className="banner-container">
      <div className="bannerAdmin">
        <div className="wreath-container">
          <Tags />
        </div>
        <div className="text">
          <h2 className="title">{title}</h2>
          <p className="date">{dates}</p>
        </div>
        <div className="duration">
          <p>{duration}</p>
        </div>
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
  title: "Conference 2022",
  dates: "June 30, 2022 - July 2, 2022",
  duration: "3d 12h",
};

export default ProgramCard;