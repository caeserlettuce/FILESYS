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

function checkLen(value, len) {
    var in_len = value.length;
    var final = "";
    if (in_len == len) {                      // if length of file tree is exactly the width of the space
        final = `${value}`;
    } else if (in_len < len) {                // if the file tree is shorter than the width of the space
        var diff = len - in_len;
        final = `${value}${" ".repeat(diff)}`;
    } else if (in_len > len) {                // if the file tree is wider than the width of the space
        var diff = in_len - len;
        final = `...${value.substring(diff + 3)}`;
    }
    return final;
}

function arrDim(arr) {
    return [ arr.length, arr[0].length ];
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


var max_column1_len = 12;
var max_column2_len = 8;
var max_column2_len = 34;
var max_column_height = ["egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg"];


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
var NAV_column_index = new Array();
var NAV_column_display = new Array();
var NAV_column1_page = 0;
var NAV_column2_page = 0;
var NAV_column3_page = 0;


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
        seldir = path;                  // if a path is defined
    } else {
        seldir = NAV_current_path;      // if a path is not defined
    }
    
    deb(`indexing path ${seldir.join("\\")}`, 'indexdir');  // fancy

    var finalJsonPath = ``;                                 // setup variable
    for (i in seldir) {                                     // for i in path segments
        finalJsonPath = `${finalJsonPath}["${seldir[i]}"]`; // add it to a string version of json notation
    }
    deb(`getting contents of path ${finalJsonPath}`, 'indexdir');

    var dir = eval(`system${finalJsonPath}`);               // eval() it because theres NO OTHER WAY THAT I CAN FIND AAAAA (and then it returns the correct directroy)

    var files = dir["files"];
    var folders = dir["folders"];

    var files_final = new Array();
    var folders_final = new Array();
    var final_col1 = new Array();
    var final_col2 = new Array();
    var final_col3 = new Array();
    
    if (finalJsonPath != '["C"]') {
        final_col1.push("/..         ");
        final_col2.push("<UP-FOL>");
    }

    for (i in files) {  // for every file
        var fi = files[i];
        var file_name = fi["name"];
        var file_ext = file_name.split(".")[1];
        var file_contents = fi["contents"].split("\n");
        var file_id = "";
        var file_info = "--FILE->";
        if (file_ext == "txt") {                            // OPERATIONS FOR WHAT DIFFERENT FILES SHOULD DO
            file_id = "";
        } else if (file_ext == "exe") {
            file_id = fi["id"];
        } else if (file_ext == "ini") {
            file_id = fi["id"];
        }
        debi(`selected file: ${file_name}, contents: ${file_contents}, info: ${file_info}, id: ${file_id}`);
        var checked = checkLen(file_name, max_column1_len);
        final_col1.push(checked);
        final_col2.push(file_info);
        final_col3.push(file_contents);
    }
    final_col1.push("============");
    final_col2.push("========");

    for (i in folders) {  // for every file
        var fo = folders[i];
        var folder_name = fo["name"];
        var folder_ext = folder_name.split(".")[1];
        var folder_contents = fo["contents"];
        var folder_info = ">FOLDER<";
        debi(`selected file: ${folder_name}, contents: ${folder_contents}, info: ${folder_info}`);
        var checked = checkLen(folder_name, max_column1_len);
        final_col1.push(checked);
        final_col2.push(folder_info);
        final_col3.push(" ");
    }

    NAV_column_index[0] = final_col1;
    NAV_column_index[1] = final_col2;
    NAV_column_index[2] = final_col3;
}


function parseColumnDisplay() {
    var count = 0;
    var count2 = 0;
    var work_col1 = new Array();
    var work_col2 = new Array();
    var work_col3 = new Array();
    var col1_fin = new Array();
    var col2_fin = new Array();
    var col3_fin = new Array();
    for (i in NAV_column_index[0]) {
        var entry = NAV_column_index[0][i];
        var info = NAV_column_index[1][i];
        var contents = NAV_column_index[2][i];
        deb(`pushing entry: ${entry}, count: ${count}, count2: ${count2}`);
        if (count >= 20) {
            // new arr!!
            console.log(work_col1)
            col1_fin[count2] = work_col1;
            work_col1 = new Array();
            col2_fin[count2] = work_col2;
            work_col2 = new Array();
            col3_fin[count2] = work_col3;
            work_col3 = new Array();
            
            count2 += 1;
            count = 0;
        } else {
            work_col1.push(entry);
            work_col2.push(info);
            work_col3.push(contents);
        }

        count += 1;
    }
    col1_fin[count2] = work_col1;
    col2_fin[count2] = work_col2;
    col3_fin[count2] = work_col3;

    console.log(col1_fin);
    console.log(col2_fin);
    console.log(col3_fin);

    var count1 = 0;
    var count2 = 0;


    NAV_column_display = [
        col1_fin,
        col2_fin,
        col3_fin
    ]
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
    } else if (part == "files") {
        for (i in max_column_height) {
            if (NAV_column_display[0][NAV_column1_page][i]) {
                document.getElementById(`DOS-FLS-FLIST-NAME-${i}`).innerHTML = NAV_column_display[0][NAV_column1_page][i];
            } else {
                document.getElementById(`DOS-FLS-FLIST-NAME-${i}`).innerHTML = "            ";
            }
            if (NAV_column_display[1][NAV_column2_page][i]) {
                document.getElementById(`DOS-FLS-FLIST-TYPE-${i}`).innerHTML = NAV_column_display[1][NAV_column2_page][i];
            } else {
                document.getElementById(`DOS-FLS-FLIST-TYPE-${i}`).innerHTML = "        ";
            }
            
        }
    }
}

async function updatePage() {
    await indexDir();
    await parseColumnDisplay();
    await updatePart("files");
}

updatePage();

function changePage(columns, up) {
    var col1;
    var col2;
    var col3;
    var col1_limit = NAV_column_display[0].length;
    var col2_limit = NAV_column_display[1].length;
    var col3_limit = NAV_column_display[2].length;
    var factor = 0;
    if (columns.indexOf(1) > 0) {
        col1 = true;
    }
    if (columns.indexOf(2) > 0) {
        col2 = true;
    }
    if (columns.indexOf(3) > 0) {
        col3 = true;
    }
    function ifup() {
        if (up == true) {
            return "up"
        } else {
            return "down"
        }
    }
    deb(`scrolling ${ifup()}`);

    if (up == true) {
        factor = -1;
    } else if (up == false) {
        factor = 1;
    }

    console.log(NAV_column1_page + factor);

    if (NAV_column1_page + factor < 0) {

    } else if (NAV_column1_page + factor > col1_limit) {
        
    } else {
        NAV_column1_page += factor;
    }

    updatePage();
}
