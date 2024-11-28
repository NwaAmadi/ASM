function ImagePath() {
    // Random number between 1 and 4 (inclusive)
    let num = Math.floor(Math.random() * 4) + 1;
    let path;
  
    // Set the path based on the random number
    if (num === 1) {
      path = '/Assets/Tagpix.svg'; // Use the public folder path directly
    } else if (num === 2) {
      path = '/Assets/Tagpix2.svg';
    } else if (num === 3) {
      path = '/Assets/Tagpix3.svg';
    } else if (num === 4) {
      path = '/Assets/Tagpix4.svg';
    }
  
    // Return an image element with the selected path
    return <img src={path} alt="Random Image" />;
  }
  
  export default ImagePath;
  