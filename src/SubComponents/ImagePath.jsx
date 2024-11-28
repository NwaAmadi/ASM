import Tagpix from '../../Assets/Tagpix.svg';
import Tagpix2 from '../../Assets/Tagpix2.svg';
import Tagpix3 from '../../Assets/Tagpix3.svg';
import Tagpix4 from '../../Assets/Tagpix4.svg';

function ImagePath() {
    
    let num = Math.floor(Math.random() * 4) + 1;
    let path;
  
    
    if (num === 1) {
      path = Tagpix; 
    } else if (num === 2) {
      path = Tagpix2;
    } else if (num === 3) {
      path = Tagpix3;
    } else if (num === 4) {
      path = Tagpix4;
    }
  
    return <img src={path} alt="Random Image" />;
  }
  
  export default ImagePath;
  