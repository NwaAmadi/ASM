import PropTypes from 'prop-types';
import '../CSS/programCard.css'
/*import ImagePath  from './ImagePath';*/


function GetPath() {
  let num = Math.floor(Math.random() * 4) + 1;
  let path;

  if (num === 1) {
    path = "src/assets/Tagpix.svg";
  } else if (num === 2) {
    path = "src/assets/Tagpix2.svg";
  } else if (num === 3) {
    path = "src/assets/Tagpix3.svg";
  } else if (num === 4) {
    path = "src/assets/Tagpix4.svg";
  }

  return path;
}

let pix = GetPath();

const ProgramCard = ({ title, dates, duration }) => {
  return (
    <div className="banner-container">
      <div className="bannerAdmin">
        <div className="wreath-container">
          <img src={pix} alt="Wreath Icon" className="wreath-image" />
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