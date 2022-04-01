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


function swagDOS() {
    windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    documentWidth = document.documentElement.clientWidth || document.body.clientWidth;
    documentHeight = document.documentElement.clientHeight || document.body.clientHeight;
    window_aspectratio = documentWidth / documentHeight;
    document_aspectratio = documentWidth / documentHeight;
    //debi(document_aspectratio);
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
    //debi(landscape, 'checkLandscape');
    if (landscape == true) {
        if (DOS_resize.innerHTML != `.DOS_part { font-size: 3.5vh; }`) {
            DOS_resize.innerHTML = `.DOS_part { font-size: 3.5vh; }`;
        }
    } else if (landscape == false ) {
        if (DOS_resize.innerHTML != `.DOS_part { font-size: 2.5vw; }`) {
            DOS_resize.innerHTML = `.DOS_part { font-size: 2.5vw; }`;
        }
    }
    documentWidth = document.documentElement.clientWidth || document.body.clientWidth;
    documentHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //debi(`${documentWidth}, ${documentHeight}`, 'document size');
    DOS_width = DOS_text.clientWidth;
    DOS_height = DOS_text.clientHeight;
    //debi(`${DOS_width}, ${DOS_height}`, 'dos size');
    var distance_from_left = (documentWidth / 2) - (DOS_width / 2);
    var distance_from_top = (documentHeight / 2) - (DOS_height / 2);
    //debi(`${distance_from_top}, ${distance_from_left}`, 'dos displace');
    if (DOS_text.style.left != `${distance_from_left}px`) {
        DOS_text.style.left = `${distance_from_left}px`;
    }
    if (DOS_text.style.top != `${distance_from_top}px`) {
        DOS_text.style.top = `${distance_from_top}px`;
    }
}





window.onresize = swagDOS;
setTimeout(function() {swagDOS()}, 100);