function ImagePath() {
    // Random number between 1 and 4 (inclusive)
    let num = Math.floor(Math.random() * 4) + 1;
    let path;
  
    
    if (num === 1) {
      path = '../assets/Tagpix.svg'; 
    } else if (num === 2) {
      path = '../assets/Tagpix2.svg';
    } else if (num === 3) {
      path = '../assets/Tagpix3.svg';
    } else if (num === 4) {
      path = '../assets/Tagpix4.svg';
    }
  
    return <img src={path} alt="Random Image" />;
  }
  
  export default ImagePath;
  