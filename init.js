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


function keyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
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

// file navigation

// NOTE: paths are not stored internally as the actual json object, they are stored as an array, every value in the array is the value in the json path
//
// ex:
//  (json path would be): system["C"]["folders"][1]
//
//  (but internal path would be) : ["C", "folders", 1]
//
//  why?? it's so that i can go back directories easier, because i can just remove a value from the internal path and then ill be back
var NAV_default_path = ["C"];               // the default path that the DOS starts at
var NAV_current_path = NAV_default_path;    // the current path
var NAV_column_index = {                    // index of all the display values for each column (left to right) (the values are not split by every 20 values for scrolling pages (yet))
    "col_1": [      // for column 1
    ],
    "col_2": [      // for column 2
    ],
    "col_3": [      // for column 3
    ]
}

var NAV_column_display = {                  // just like index but with the entries split by page (every 20 entries)
    "col_1": [      // for column 1
        [           // page 1

        ]
    ],
    "col_2": [      // for column 2
        [           // page 1

        ]
    ],
    "col_3": [      // for column 3
        [           // page 1

        ]
    ]
}



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
    updatePart("time", `${time}`);
}




upDATE();

setInterval(upDATE, 15000);

function indexDir(path) {
    // index the current directory
    var seldir
    if (path) {
        seldir = path;
    } else {
        seldir = NAV_current_path;
    }
    
    deb(`indexing path ${seldir.join("\\")}`, 'indexdir');

    var finalJsonPath = ``;
    for (i in seldir) {
        finalJsonPath = `${finalJsonPath}`;
    }
}


function updatePart(part, value) {
    var part_time = document.getElementById("DOS-FLS-TIME");
    var part_curdir = document.getElementById("DOS-FLS-CURDIR");
    var part_version = document.getElementById("DOS-FLS-VER");
    // part is the part of the screen
    // value is the new value                         ↖

    // list of parts: all, time, curdir, version, 
    if (part == "all") {

    } else if (part == "time") {
        part_time.innerHTML = `${value}`;
    } else if (part == "curdir") {
        var width = 56;
        var in_len = value.length;
        var final = "";
        if (in_len == width) {                      // if length of file tree is exactly the width of the space
            final = `${value}`;
        } else if (in_len < width) {                // if the file tree is shorter than the width of the space
            var diff = width - in_len;
            final = `${value}${" ".repeat(diff)}`;
        } else if (in_len > width) {                // if the file tree is wider than the width of the space
            var diff = in_len - width;
            final = `...${value.substring(diff + 3)}`;
        }
        
        part_curdir.innerHTML = `${final}`.replaceAll("↖", "\\");
    } else if (part == "version") {
        part_version.innerHTML = `${value}`;
    }

}


