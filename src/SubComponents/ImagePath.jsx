import '../../public/Assets'
function ImagePath(){
    let num =  Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    let path;
    if (num === 1) {
        path = '../../public/Assets/Tagpix.svg';
    } 
    else if (num === 2) {
        path = '../../public/Assets/Tagpix2.svg';
    }
    else if (num === 3) {
        path = '../../public/Assets/Tagpix3.svg';
    }
    else if (num === 4){
        path = '../../public/Assets/Tagpix4.svg';
    }
    return(path);
}
export default ImagePath