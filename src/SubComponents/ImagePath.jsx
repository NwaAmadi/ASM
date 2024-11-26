
function ImagePath(){
    let num =  Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    let path;
    if (num === 1) {
        path = '../../Assets/Tagpix.svg';
    } 
    else if (num === 2) {
        path = '../../Assets/Tagpix2.svg';
    }
    else if (num === 3) {
        path = '../../Assets/Tagpix3.svg';
    }
    else if (num === 4){
        path = '../../Assets/Tagpix4.svg';
    }
    return(path);
}
export default ImagePath