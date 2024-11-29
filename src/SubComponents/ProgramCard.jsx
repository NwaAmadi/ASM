import PropTypes from 'prop-types';
import '../CSS/programCard.css';
import Tagpix from '../../public/Assets2/Tagpix.svg';
import Tagpix2 from '../../public/Assets2/Tagpix2.svg';
import Tagpix3 from '../../public/Assets2/Tagpix3.svg';
import Tagpix4 from '../../public/Assets2/Tagpix4.svg';


function GetPath() {
  const images = [Tagpix, Tagpix2, Tagpix3, Tagpix4];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
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