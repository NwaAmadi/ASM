import '../CSS/InfoIcon.css';
import Icon from '/public/Assets/infoIcon.svg';
function InfoIcon() {
    return(
        <div className="infoIcon">
            <img src={Icon} alt="Logo"/>
        </div>
    );
}
export default InfoIcon