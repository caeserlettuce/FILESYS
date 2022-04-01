// runs on page resize event

// superhot DOS scale:
//
// relative to screen height: 787/1050   size:   0.74952380952 * screen height      padding:    0.13428571428   * screen height
// relative to screen width:  967/1680   size:   0.57559523809 * screen width       padding:    0.2125          * screen width
//
// 8/3 aspect ratio or 2.66666666667
//
//  font-size: 3.5vh;
//  font-size: 2.5vw;


function checkLandscape() {
    windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    documentWidth = document.documentElement.clientWidth || document.body.clientWidth;
    documentHeight = document.documentElement.clientHeight || document.body.clientHeight;
    window_aspectratio = documentWidth / documentHeight;
    document_aspectratio = documentWidth / documentHeight;
    debi(document_aspectratio);
    if (document_aspectratio > DOS_aspectratio) {         // landscape
        if (documentWidth < documentHeight) {
            landscape = false;
        } else {
            landscape = true;
        }
        landscape = true;
    }
    if (document_aspectratio < DOS_aspectratio) {  // portrait
        if (documentWidth > documentHeight + 100) {
            landscape = true;
        } else {
            landscape = false;
        }
    }
    debi(landscape, 'checkLandscape');
    return landscape
}



function resizeDOS() {
    //console.log(windowWidth);
    checkLandscape();
    if (landscape == true) {
        DOS_resize.innerHTML = `.DOS_part { font-size: 3.5vh; }`;
    } else if (landscape == false ) {
        DOS_resize.innerHTML = `.DOS_part { font-size: 2.5vw; }`;
    }
}







resizeDOS();
window.onresize = resizeDOS;