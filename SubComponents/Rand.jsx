function getRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
let path;
  
const randomInt = getRandomIntInRange(1, 4);
  
if (randomInt === 1) {
    path = '../Assets/Tagpix.svg';
} 
else if (randomInt === 2) {
    path = '../Assets/Tagpix2.svg';
}
else if (randomInt === 3) {
    path = '../Assets/Tagpix3.svg';
}
else if (randomInt === 4){
    path = '../Assets/Tagpix4.svg';
}
  
  console.log(path); 
  