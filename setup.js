// this is for important info about this thing, these variables get launched before any other

var version = "v0.1.01a";


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

function checkLen(value, len, beginning) {
    var in_len = value.length;
    var final = "";
    if (in_len == len) {                      // if length of file tree is exactly the width of the space
        final = `${value}`;
    } else if (in_len < len) {                // if the file tree is shorter than the width of the space
        var diff = len - in_len;
        final = `${value}${" ".repeat(diff)}`;
    } else if (in_len > len) {                // if the file tree is wider than the width of the space
        var diff = in_len - len;
        if (beginning == true) {
            final = `...${value.substring(diff + 3)}`;
        } else {
            final = `${value.substring(0, in_len - (diff + 3))}...`;
        }
    }
    return final;
}

function arrDim(arr) {
    return [ arr.length, arr[0].length ];
}


function copyArr(array) {
    return [...array]
}

function parseToEval(array) {
    var finalJsonPath = ``;                                 // setup variable
    for (i in array) {                                     // for i in path segments
        var add = array[i];
        if (typeof add === 'string') { // if string is number
            finalJsonPath = `${finalJsonPath}["${add}"]`; // add it to a string version of json notation
        } else {
            finalJsonPath = `${finalJsonPath}[${add}]`; // add it to a string version of json notation
        }
        
    }
    //deb(`getting contents of path ${finalJsonPath}`, 'indexdir');
    return finalJsonPath
}

function* times(x) {
    for (var i = 0; i < x; i++)
        yield i;
}

function getRandomFromArr(inArray) {
    // gets random element from array
    var hehe = inArray[Math.floor(Math.random()* inArray.length)];
    return hehe
}