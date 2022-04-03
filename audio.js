// for audio handling

var aud_background = document.getElementById("aud_background_1");
var aud_keyboard_1 = document.getElementById("aud_keyboard_1");
var aud_keyboard_2 = document.getElementById("aud_keyboard_2");
var aud_beep = document.getElementById("aud_beep");



aud_background.loop = true;

aud_beep.muted = true;

//aud_beep.play();

var current_player = "a";
var background_a = document.getElementById("aud_background_1");
var background_b = document.getElementById("aud_background_2");

background_a.src = "assets/sounds/aud_background.mp3";
background_b.src = background_a.src;

function background_audio(){
    var player = null;

    if(current_player == "a") {
        player = background_b;
        current_player = "b";
    }
    else{
        player = background_a;
        current_player = "a";
    }

    player.play();

    setTimeout(background_audio, 11485); // 11.485 seconds long, this value shouold be in milliseconds
}

//document.getElementById("background_a").autoplay;
//background_audio();

