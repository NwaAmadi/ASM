function ImagePath() {
  
    let num = Math.floor(Math.random() * 4) + 1;
    let path;
  
    if (num === 1) {
      path = 'src/assets/Tagpix.svg'; 
    } else if (num === 2) {
      path = 'src/assets/Tagpix2.svg';
    } else if (num === 3) {
      path = 'src/assets/Tagpix3.svg';
    } else if (num === 4) {
      path = 'src/assets/Tagpix4.svg';
    }
  
    return path;
  }
  
export default ImagePath;
  