// for audio handling

//var aud_background = document.getElementById("aud_background_1");
var aud_keyboard_1 = document.getElementById("aud_keyboard_1");
var aud_keyboard_2 = document.getElementById("aud_keyboard_2");
var aud_beep = document.getElementById("aud_beep");
var aud_anne = document.getElementById("aud_anne");

function doublePlay(curplayer, a, b){
    var player = null;
    if(curplayer == "a") {
        player = b;
        curplayer = "b";
    }
    else {
        player = a;
        curplayer = "a";
    }
    player.play();
}


function snd_key1() {
    aud_keyboard_1.currentTime = 0;
    aud_keyboard_1.play();
}
    
function snd_key2() {
    aud_keyboard_2.currentTime = 0;
    aud_keyboard_2.play();
}
function snd_beep() {
    aud_beep.currentTime = 0;
    aud_beep.play();
}

//aud_beep.play();

var beep_current_player = "a";
var beep_a = document.getElementById("aud_beep_a");
var beep_b = document.getElementById("aud_beep_b");


var background_current_player = "a";
var background_a = document.getElementById("aud_background_a");
var background_b = document.getElementById("aud_background_b");

function background_audio(){
    var player = null;

    if(background_current_player == "a") {
        player = background_b;
        background_current_player = "b";
    }
    else{
        player = background_a;
        background_current_player = "a";
    }

    player.play();

    setTimeout(background_audio, 11485); // 11.485 seconds long, this value shouold be in milliseconds
}

//document.getElementById("background_a").autoplay;


