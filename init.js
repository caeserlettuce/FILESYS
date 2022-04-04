
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
var DOS_welcome_text = document.getElementById("DOS_welcome");
var DOS_welcome_textbar = document.getElementById("welcome-textbar");
var DOS_resize = document.getElementById("DOS_resize");
//var DOS_cursor = document.getElementById("DOS_cursor");
var DOS_aspectratio = 2.66666666667;
var DOS_width = DOS_text.clientWidth;
var DOS_height = DOS_text.clientHeight;
var time = "00:00";
var screen = "file";
var inputlock = false;
var scrollLock = false;
var navLock = false;
var welcome_user = true;
var welcomeLock = !welcome_user;

var SET_animations = true;
var SET_postfx = true;


var max_column1_len = 12;
var max_column2_len = 8;
var max_column2_len = 34;
var max_column_height = ["egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg", "egg"];
var display_animation_length = ["egg", "egg", "egg", "egg"];

// file navigation

// NOTE: paths are not stored internally as the actual json object, they are stored as an array, every value in the array is the value in the json path
//
// ex:
//  (json path would be): system["C"]["folders"][1]["contents"]
//
//  (but internal path would be) : ["C", "folders", 1, "contents"]
//
//  why?? it's so that i can go back directories easier, because i can just remove a value from the internal path and then ill be back
var NAV_default_path = ["C"];               // the default path that the DOS starts at
var NAV_current_path = NAV_default_path;    // the current path
var NAV_column_index = new Array();
var NAV_column_display = new Array();
var NAV_parsed_txtfile = new Array();
var NAV_prev_select = [0, 0];
var NAV_column_select = [0, 0]; // first value is from 0-2, second value is from 0-19
var NAV_column1_page = 0;
var NAV_column2_page = 0;
var NAV_column3_page = 0;
var SEL_file_info = new Object();

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
    var prevTime = time;
    time = `${hor}:${min}`;     // make it update the time
    if (time != prevTime) {
        updatePart("time", `${time}`);
        transition("time");
    }
    
}


//      system["C"]["folders"][1]["contents"]["folders"][2]["contents"]
//            ["C", "folders", 1, "contents", "folders", 1, "contents"]
//                              ↖
function parsePath(pathtm) {
    var finalPath = `C:↖`;
    var work_path = NAV_current_path;
    var raw_workpath = copyArr(work_path);
    var paths = new Array();
    if (pathtm) {
        work_path = pathtm;
    }
    if (NAV_current_path == ["C"]) {
        updatePart("curdir", "C:↖");
    } else {
        for (i in work_path) {
            var cur = work_path[i];
            console.log("CURRENT!!", cur);
            paths.push(cur);

            if (cur == "contents") {
                //deb(`found 'contents' in path!`);
                var wook = copyArr(paths);
                //console.log("before pop", wook);
                wook.pop();
                //console.log("after pop", wook);
                var pat = eval(`system${parseToEval(wook)}`);
                //console.log("after eval'd", pat);
                var name = pat["name"];
                finalPath = `${finalPath}${name}↖`;
            }
        }

    }
    return finalPath
}

function navFolder(folder_id) {
    // go to a folder
    NAV_column1_page = 0;
    NAV_column2_page = 0;
    NAV_column3_page = 0;
    NAV_current_path.push("folders");
    NAV_current_path.push(folder_id);
    NAV_current_path.push("contents");
    updatePage();
    updatePart("curdir", parsePath());
    fileUpdateRequired();
}

function navBack() {
    if (NAV_current_path.length != 1) {
        NAV_column1_page = 0;
        NAV_column2_page = 0;
        NAV_column3_page = 0;
        for (var i of times(3)) {
            NAV_current_path.pop();
        }
        updatePage();
        updatePart("curdir", parsePath());
    }
}


function indexDir(path) {
    // index the current directory
    var seldir
    if (path) {
        seldir = path;                  // if a path is defined
    } else {
        seldir = NAV_current_path;      // if a path is not defined
    }
    
    //deb(`indexing path ${seldir.join("\\")}`, 'indexdir');  // fancy

    
    var dir = eval(`system${parseToEval(seldir)}`);               // eval() it because theres NO OTHER WAY THAT I CAN FIND AAAAA (and then it returns the correct directroy)

    //console.log(dir);
    var files = dir["files"];
    var folders = dir["folders"];

    var files_final = new Array();
    var folders_final = new Array();
    var final_col1 = new Array();
    var final_col2 = new Array();
    var final_col3 = new Array();
    

    for (i in files) {  // for every file
        var fi = files[i];
        var file_name = fi["name"];
        var file_ext = file_name.split(".")[1];
        var file_contents = fi["contents"].split("\n");
        var file_id = "";
        var file_info = "--FILE->";
        if (file_name == "../") {
            file_info = ">UP-FOL<";
        }

        if (file_ext == "txt") {                            // OPERATIONS FOR WHAT DIFFERENT FILES SHOULD DO
            file_id = "";
        } else if (file_ext == "exe") {
            file_id = fi["id"];
        } else if (file_ext == "ini") {
            file_id = fi["id"];
        }
        //debi(`selected file: ${file_name}, contents: ${file_contents}, info: ${file_info}, id: ${file_id}`);
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
        //debi(`selected file: ${folder_name}, contents: ${folder_contents}, info: ${folder_info}`);
        var checked = checkLen(folder_name, max_column1_len);
        final_col1.push(checked);
        final_col2.push(folder_info);
        final_col3.push(" ");
    }

    NAV_column_index[0] = final_col1;
    NAV_column_index[1] = final_col2;
    NAV_column_index[2] = final_col3;
}

function parseTxtFile() {
    var file = "s";
    var x_list = NAV_column1_page * 20 + NAV_column_select[1];
    //deb(x_list);
    var fileContentsPAth = parseToEval([...NAV_current_path, "files", x_list, "contents"]);
    var fileContentsPoop = parseToEval([...NAV_current_path, "files"]);
    //deb(fileContentsPAth);
    var contentExist = eval(`system${fileContentsPoop}.hasOwnProperty(${x_list})`);
    var content = "";
    if (contentExist == true) {
        content = eval(`system${fileContentsPAth}`);
    } else {
        content = " ";
    }
    //console.log(content);

    content = content.split("\n");

    var finalContent = new Array();

    for (i in content) {
        var enty = content[i];
        var final = enty.match(/.{1,32}/g)

        for (i in final) {
            var len = final[i].length;
            var diff = 32 - len;
            finalContent.push(` ${final[i]}${" ".repeat(diff)} `)
        }

    }
    
    return finalContent

}




function parseThirdColumn(txtparse) {
    var contents_index = txtparse
    var count = 0;
    var count2 = 0;
    //var count3 = 0;
    //var count4 = 0;
    //var work_col1 = new Array();
    //var work_col2 = new Array();
    var work_col3 = new Array();
    //var col1_fin = new Array();
    //var col2_fin = new Array();
    var col3_fin = new Array();
    for (i in contents_index) {
        //var entry = NAV_column_index[0][i];
        //var info = NAV_column_index[1][i];
        var contents = contents_index[i];
        //deb(`pushing entry: ${entry}, count: ${count}, count2: ${count2}`);
        if (count >= 20) {
            // new arr!!
            //console.log(work_col1)
            //col1_fin[count2] = work_col1;
            //work_col1 = new Array();
            //col2_fin[count2] = work_col2;
            //work_col2 = new Array();
            col3_fin[count2] = work_col3;
            work_col3 = new Array();
            
            //work_col1.push(entry);
            //work_col2.push(info);
            work_col3.push(contents);

            count2 += 1;
            count = 0;
        } else {
            //work_col1.push(entry);
            //work_col2.push(info);
            work_col3.push(contents);
        }

        count += 1;
    }
    //col1_fin[count2] = work_col1;
    //col2_fin[count2] = work_col2;
    col3_fin[count2] = work_col3;

    //console.log(col1_fin);
    //console.log(col2_fin);
    //console.log(col3_fin);

    var count1 = 0;
    var count2 = 0;


    NAV_column_display = [
        NAV_column_display[0],
        NAV_column_display[1],
        col3_fin
    ]
    //console.log(NAV_column_display);
}


function parseColumnDisplay() {
    var count = 0;
    var count2 = 0;
    //var count3 = 0;
    //var count4 = 0;
    var work_col1 = new Array();
    var work_col2 = new Array();
    //var work_col3 = new Array();
    var col1_fin = new Array();
    var col2_fin = new Array();
    //var col3_fin = new Array();
    for (i in NAV_column_index[0]) {
        var entry = NAV_column_index[0][i];
        var info = NAV_column_index[1][i];
        //var contents = NAV_column_index[2][i];
        //eb(`pushing entry: ${entry}, count: ${count}, count2: ${count2}`);
        if (count >= 20) {
            // new arr!!
            //console.log(work_col1)
            col1_fin[count2] = work_col1;
            work_col1 = new Array();
            col2_fin[count2] = work_col2;
            work_col2 = new Array();
            //col3_fin[count2] = work_col3;
            //work_col3 = new Array();
            
            work_col1.push(entry);
            work_col2.push(info);
            //work_col3.push(contents);

            count2 += 1;
            count = 0;
        } else {
            work_col1.push(entry);
            work_col2.push(info);
            //work_col3.push(contents);
        }

        count += 1;
    }
    col1_fin[count2] = work_col1;
    col2_fin[count2] = work_col2;
    //col3_fin[count2] = work_col3;

    //console.log(col1_fin);
    //console.log(col2_fin);
    //console.log(col3_fin);

    var count1 = 0;
    var count2 = 0;


    NAV_column_display = [
        col1_fin,
        col2_fin//,
        //col3_fin
    ]
}


function updatePart(part, value) {
    var part_time = document.getElementById("DOS-FLS-TIME");
    var part_curdir = document.getElementById("DOS-FLS-CURDIR");
    var part_version = document.getElementById("DOS-FLS-VER");
    // part is the part of the screen
    // value is the new value                         ↖

    // list of parts: all, time, curdir, version, files, content
    if (part == "all") {

    } else if (part == "time") {
        part_time.innerHTML = `${value}`;
    } else if (part == "curdir") {
        var width = 56;
        var in_len = value.length;
        var final = checkLen(value, width, true);
        
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
    } else if (part == "content") {
        for (i in max_column_height) {
            if (NAV_column_display[2][NAV_column3_page][i]) {
                document.getElementById(`DOS-FLS-SCREEN-${i}`).innerHTML = NAV_column_display[2][NAV_column3_page][i];
            } else {
                document.getElementById(`DOS-FLS-SCREEN-${i}`).innerHTML = "                                  ";
            }
            
        }
    }
}

updatePart("curdir", parsePath());

async function updatePage() {
    await indexDir();
    await parseColumnDisplay();
    await updatePart("files");
}



function changePage(columns, up) {
    parseThirdColumn(NAV_parsed_txtfile);
    var col1 = false;
    var col2 = false;
    var col3 = false;
    var col1_limit = NAV_column_display[0].length;
    var col2_limit = NAV_column_display[1].length;
    var col3_limit = NAV_column_display[2].length;
    var factor = 0;
    if (columns.indexOf(1) > -1) {
        col1 = true;
    }
    if (columns.indexOf(2) > -1) {
        col2 = true;
    }
    if (columns.indexOf(3) > -1) {
        col3 = true;
    }
    function ifup() {
        if (up == true) {
            return "up"
        } else {
            return "down"
        }
    }
    //deb(`scrolling ${ifup()}, col1: ${col1}, col2: ${col2}, col3: ${col3}`);
    //deb(`limits are: ${col1_limit}, ${col2_limit}, ${col3_limit}`)

    if (up == true) {
        factor = -1;
    } else if (up == false) {
        factor = 1;
    }

    //console.log(NAV_column1_page + factor);

    var returnValue = false;

    //deb(`col 1 page before: ${NAV_column1_page}`);

    if (col1 == true) {
        if (NAV_column1_page + factor < 0) {
            returnValue = false;
        } else if (NAV_column1_page + factor >= col1_limit) {    
            returnValue = false;
        } else {
            NAV_column1_page += factor;
            returnValue = true;
        }
    }

    //deb(`col 1 page after: ${NAV_column1_page}`);

    //deb(`col 2 page before: ${NAV_column2_page}`);
    if (col2 == true) {
        if (NAV_column2_page + factor < 0) {
            returnValue = false;
        } else if (NAV_column2_page + factor >= col2_limit) {
            returnValue = false;
        } else {
            NAV_column2_page += factor;
            returnValue = true;
        }
    }

    //deb(`col 2 page after: ${NAV_column2_page}`);

    //deb(`col 3 page before: ${NAV_column3_page}`);
    if (col3 == true) {
        if (NAV_column3_page + factor < 0) {
            returnValue = false;
        } else if (NAV_column3_page + factor >= col3_limit) {
            returnValue = false;
        } else {
            NAV_column3_page += factor;
            returnValue = true;
        }
    }

    //deb(`col 3 page after: ${NAV_column3_page}`);

    updatePage();
    return returnValue
}

function welcomeMessage() {
    navLock = true;
    welcomeLock = true;
    var rare = Math.floor(Math.random()* 50);    // 1 in 50 chance of getting a rare message
    var message = "something is broken /srs";
    if (rare == 1) {    // rare one
        message = getRandomFromArr(welcome_messages_rare);
    } else {            // basic one (ew)
        message = getRandomFromArr(welcome_messages);
    }
    
    var finalMessage = checkLen(message, 53, false);
    DOS_welcome_textbar.innerHTML = `${finalMessage}`;
}



async function animateTime(finalAnim, speed) {
    return new Promise((resolve,reject)=>{
        //here our function should be implemented 
        
        for (let i = 0; i < finalAnim.length + 1; i++) {
            //deb(finalAnim[i]);
            setTimeout(function timer() {
                updatePart("time", finalAnim[i]);
                if (i == 4) { 
                    resolve();
                    updatePart("time", time);
                }
            }, i * speed);
        }
    });
}

function transition(part) {
    if (SET_animations == true) {
        var finalAnim = new Array();
        var speed = 50;
        if (part == "time") {
            var text = time.split("");
            for (i in display_animation_length) {
                var charset = transition_text[i];
                finalAnim.push("");
                for (e in text) {
                    var letter = text[e];
                    var replace = getRandomFromArr(charset);

                    if (replace == " " || letter == " ") {
                        finalAnim[i] = `${finalAnim[i]}${letter}`;
                    } else {
                        finalAnim[i] = `${finalAnim[i]}${replace}`;
                    }


                }
            }
        }
        //console.log(finalAnim);
        animateTime(finalAnim, 70);
    }
}



// select colour: rgba(255, 0, 0, 0.8);

function updateSelect(new_sel) {   // updates where the selection cursor is
    var prefixes = ["DOS-FLS-FLIST-NAME-", "DOS-FLS-FLIST-TYPE-", "DOS-FLS-SCREEN-"];
    

    if (new_sel[0] < 3 && new_sel[0] > -1 && new_sel[1] < 20 && new_sel[1] > -1) {  //within the range
        NAV_prev_select = [...NAV_column_select];
        NAV_column_select = new_sel;
        var x_index = NAV_column_select[0];
        var y_index = NAV_column_select[1];
        var prev_x_index = NAV_prev_select[0];
        var prev_y_index = NAV_prev_select[1];
    
        //deb("index is within display limits!!!"); // previous selection
        var prefix_old = prefixes[prev_x_index]
        var id_old = `${prefix_old}${prev_y_index}`;
        var selected_old = document.getElementById(id_old);
        if (SET_postfx == true) {
            selected_old.classList.remove('highlighted-bloom');
        } else {
            selected_old.classList.remove('highlighted');
        }
        //deb(id);
    
        //deb("index is within display limits!!!"); // new selection
        var prefix_new = prefixes[x_index]
        var id_new = `${prefix_new}${y_index}`;
        var selected_new = document.getElementById(id_new);
        
        if (SET_postfx == true) {
            selected_new.classList.add('highlighted-bloom');
        } else {
            selected_new.classList.add('highlighted');
        }
        
        //deb(id);

        // rgba(255, 0, 0, 0.8)
    
    } else {
        deb("selection is outside of screen index range.", "updateSelect");
    }
}


function arrowPage(new_sel) {
    if (new_sel[0] == 0 || new_sel[0] == 1) {   // if it's on the first or second column
    
        //deb("AAAAA");

        if (new_sel[1] == 20 ) {  // if it's at the bottom of a page
            var hehe = changePage([1, 2], false);
            if (hehe == true) {
                updateSelect([new_sel[0], 0]);
                aud("kb2");
            } else {
                aud("beep");
            }
        } else if (new_sel[1] == -1) {  // if it's at the top
            var hehe = changePage([1, 2], true);
            if (hehe == true) {
                updateSelect([new_sel[0], 19]);
                aud("kb2");
            } else {
                aud("beep");
            }
        } else {
            updateSelect(new_sel);
            aud("beep");
        }

        NAV_column3_page = 0;
        NAV_parsed_txtfile = parseTxtFile();
        parseThirdColumn(NAV_parsed_txtfile);
        fileInfo(checkCurrentType());
        updatePart("content");

    } else if (new_sel[0] == 2) {       // if its on the third column
        if (new_sel[1] == 20 ) {  // if it's at the bottom of a page
            var hehe = changePage([3], false);
            if (hehe == true) {
                updatePart("content");
                updateSelect([new_sel[0], 0]);
                aud("kb2");
            } else {
                aud("beep");
            }
        } else if (new_sel[1] == -1) {  // if it's at the top
            var hehe = changePage([3], true);
            if (hehe == true) {
                updatePart("content");
                updateSelect([new_sel[0], 19]);
                aud("kb2");
            } else {
                aud("beep");
            }
        } else {
            updateSelect(new_sel);
            aud("beep");
        }
        
    } else {
        updateSelect(new_sel);
        aud("beep");
    }
}


// =============================================================================================================================================================================

// ==================+THIS IS WHERE YOU ADD SUPPORT FOR NEW FILE TYPES JESSE!!!!!!! FOR IT DETECTION FOR IT!!!! AAA !!  ========================================================

// =============================================================================================================================================================================


function checkCurrentType() {
    var type = document.getElementById(`DOS-FLS-FLIST-TYPE-${NAV_column_select[1]}`).innerHTML.replaceAll("&gt;", ">").replaceAll("&lt;", "<");
    var name = document.getElementById(`DOS-FLS-FLIST-NAME-${NAV_column_select[1]}`).innerHTML;
    var extension = name.split(".")[name.split(".").length - 1].replaceAll(" ", "");
    var out_type = null;
    if (type == ">FOLDER<") {           // its a folder
        out_type = "folder";
    } else if (type == ">UP-FOL<") {    // an up-folder
        out_type = "up-folder";
    } else if (extension == "exe") {    // executable
        out_type = "executable";
    } else if (extension == "ini") {    // configuration file
        out_type = "configuration";
    } else if (type == "--FILE->") {    // (INSERT STUFF BEFORE THIS LINE) general file
        out_type = "file";
    } else {
        out_type = "unknown";
    }

    var content = new Array();
    // getting json info

    var x_list = 0;
    if (type == "--FILE->") {   // if it's a file
        x_list = NAV_column1_page * 20 + NAV_column_select[1];
        
        //deb(x_list_folders);
        var fileContentsPAth = parseToEval([...NAV_current_path, "files", x_list]);
        var fileContentsPoop = parseToEval([...NAV_current_path, "files"]);
        var contentExist = eval(`system${fileContentsPoop}.hasOwnProperty(${x_list})`);
        //deb(`x-list: ${x_list}, path: ${fileContentsPAth}`);
        if (contentExist == true) {
            content = eval(`system${fileContentsPAth}`);
        } else {
            content = [];
        }
    } else if (type == ">FOLDER<") {   // if it's a folder
        x_list = NAV_column1_page * 20 + NAV_column_select[1] - ( eval(`system${parseToEval([...NAV_current_path, "files"])}`).length + 1 );
        //deb(x_list);
        var fileContentsPoop = parseToEval([...NAV_current_path, "folders"]);
        var fileContentsPAth = parseToEval([...NAV_current_path, "folders", x_list]);
        var contentExist = eval(`system${fileContentsPoop}.hasOwnProperty(${x_list})`);
        //deb(`x-list: ${x_list}, path: ${fileContentsPAth}`);
        if (contentExist == true) {
            content = eval(`system${fileContentsPAth}`);
        } else {
            content = [];
        }

        
    }
    SEL_file_info = {"type": out_type, "typename": type, "name": name, "extension": extension, "content": content, "xlist": x_list};
    return SEL_file_info
}

    

function fileInfo(info) {

    if (info["type"] == "folder") {
        var widy = 23;
        var chunk1 = ` ${checkLen(`directory: ${info["name"]}`, widy, false)}│${info["typename"]} `;


        parseThirdColumn([chunk1]);
        updatePart("content");
    }

}

function fileUpdateRequired() { // this function name is making fun of windows
    NAV_column3_page = 0;
    NAV_parsed_txtfile = parseTxtFile();
    parseThirdColumn(NAV_parsed_txtfile);
    fileInfo(checkCurrentType());
    updatePart("content");
}



function openFile() {
    var check = checkCurrentType();
    if (check.type == "folder") {   // selecting a folder
        navFolder(check.xlist);
        fileUpdateRequired();
        aud("kb1");
    } else if (check.type == "up-folder") {
        navBack();
        fileUpdateRequired();
        aud("kb2");
    } else if (check.type == "executable") {
        aud("kb2");
        eval(`${check["content"]["exec"]}`);
    } else {
        aud("kb1");
    }

}







DOS_welcome_text.style.display = "";
DOS_text.style.display = "none";

if (SET_postfx == true) {
    document.getElementById("jesus").classList.add('bloom');
} else {
    document.getElementById("jesus").classList.remove('bloom');
}

function pageStart() {
    welcome_user = false;
    welcomeLock = false;
    navLock = false;
    DOS_welcome_text.style.display = "none";
    DOS_text.style.display = "";
    swagDOS();
    upDATE();
    setInterval(upDATE, 15000);
    updatePage();
    background_audio();
    updateSelect([0,0]);
    NAV_column3_page = 0;
    NAV_parsed_txtfile = parseTxtFile();
    parseThirdColumn(NAV_parsed_txtfile);
    updatePart("content");
    updatePart("version", version);
}

if (welcome_user == false) {
    pageStart();
} else {
    welcomeMessage();
}


function keyParse(e, keycobe) {
    if (e == "") {
        keyCobe = keycobe;
    } else if (e != undefined || e != null || e != "") {
        keyCobe = e.keyCode;
    }
    

    if (inputlock == false) {
        if(keyCobe == 33) {           // page up
            if (scrollLock == false) {
                if (welcomeLock == false) {
                    if (NAV_column_select[0] == 2) {
                        changePage([3], true);
                        updatePart("content");
                    } else {
                        changePage([1, 2], true);
                        fileUpdateRequired();
                    }
                    aud("kb2");
                }
            }
        } else if(keyCobe == 34) {    // page down
            if (scrollLock == false) {
                if (welcomeLock == false) {
                    if (NAV_column_select[0] == 2) {
                        changePage([3], false);
                        updatePart("content");
                    } else {
                        changePage([1, 2], false);
                        fileUpdateRequired();
                    }
                    aud("kb2");
                }
            }
        } else if(keyCobe == 27) {    // escape key
            if (navLock == false) {
                if (welcomeLock == false) {
                    navBack();
                    fileUpdateRequired();
                    aud("kb2");
                }
            }
        } else if(keyCobe == 13) {    // enter key
            if (welcomeLock == true) {     // if it is on the welcome screen
                pageStart();
                aud("kb1");
            } else if (navLock == false) {
                openFile();

                
            } else {
                aud("kb1");
            }
        } else if(keyCobe == 37) {    // left arrow
            if (navLock == false) {
                var cur_x = NAV_column_select[0];
                var cur_y = NAV_column_select[1];
                var new_coords = [cur_x - 1, cur_y];
                //deb(new_coords);
                arrowPage(new_coords);
                aud("beep");
            }
        } else if(keyCobe == 38) {    // up arrow
            if (navLock == false) {
                var cur_x = NAV_column_select[0];
                var cur_y = NAV_column_select[1];
                var new_coords = [cur_x, cur_y - 1];
                //deb(new_coords);
                arrowPage(new_coords);
            }
        } else if(keyCobe == 39) {    // right arrow
            if (navLock == false) {
                var cur_x = NAV_column_select[0];
                var cur_y = NAV_column_select[1];
                var new_coords = [cur_x + 1, cur_y];
                //deb(new_coords);
                arrowPage(new_coords);
                aud("beep");
            }
        } else if(keyCobe == 40) {    // down arrow
            if (navLock == false) {
                var cur_x = NAV_column_select[0];
                var cur_y = NAV_column_select[1];
                var new_coords = [cur_x, cur_y + 1];
                //deb(new_coords);
                arrowPage(new_coords);
            }
        }
        

    }
}
    



var elem = document.getElementById("jesus");
    elem.onkeyup = keyParse;



