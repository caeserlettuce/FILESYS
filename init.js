function deb(message, prefix) {
    var fullPrefix = "";
    if (prefix) {
        fullPrefix = `[${prefix.toUpperCase()}]: `;
    } else {
        fullPrefix = "";
    }
    console.log(`${fullPrefix}${message}`);
}

function debi(message, prefix) {
    if (debug == true) {
        deb(message, prefix);
    }
}
// variables

var debug = true;
var landscape = true;
var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var documentWidth = document.documentElement.clientWidth || document.body.clientWidth;
var documentHeight = document.documentElement.clientHeight || document.body.clientHeight;
var window_aspectratio = windowWidth / windowHeight;
var document_aspectratio = documentWidth / documentHeight;
var DOS = document.getElementById("DOS");
var DOS_text = document.getElementById("DOS_text");
var DOS_resize = document.getElementById("DOS_resize");
//var DOS_cursor = document.getElementById("DOS_cursor");
var DOS_aspectratio = 2.66666666667;
var DOS_width = DOS_text.clientWidth;
var DOS_height = DOS_text.clientHeight;
var time = "00:00";
var screen = "file";


var FLS_startdir = system["C"];

var FLS_curdir = FLS_startdir;


deb("variables loaded.", "init");

// dev functions (tm)

function devSet(message) {
    DOS_text.innerHTML = `${message}`.replaceAll("↖", "\\");
    //DOS_cursor.innerHTML = `${message}`.replaceAll("↖", "\\");
}

// tool functions

function removeLast(str, num) {
    return str.substring(0, str.length - num);
}

// getting into the screen operations (tm)

function upDATE() {
    var dat = new Date();
    var hor = dat.getHours();
    var min = dat.getMinutes();
    hor = `${hor}`;
    min = `${min}`;
    if (hor.length == 1) {
        hor = `0${hor}`;
    }
    if (min.length == 1) {
        min = `0${min}`;
    }
    time = `${hor}:${min}`;     // make it update the time
}

function updateFilescreen(part) {
    var funeral = "";

    superhot_main = [
        [`┌────────────┬────────┬───────────────────────────${time}──┐`], // 0
        [`│superhot.exe│--FILE->│ directory:APPS         |>FOLDER< │`], // 1
        [`│            │        │                                  │`], // 2
        [`│------------│--------│                                  │`], // 3
        [`├────────────┴────────┴──────────────────────────────────┤`], // 4
        [`│C:↖                                                     │`], // 5
        [`└──────────────────────────────────────FILESYS─${version}──┘`] // 6
    ];

    var funeral = superhot_main

    
                // WORK ON NAVIGATING THROUGH FILES FIRST!!!!!!!!
}




setInterval(upDATE, 30000);




function updateFileScreen() {


    var fileList = FLS_curdir["files"]

    for (i in fileList ) {
        var filename = fileList[i]["name"];
        deb(`i: ${i}, file: ${filename}`);

    }

    
}















devSet(superhot_main);