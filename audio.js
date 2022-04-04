// audio framework

var SET_ambient_vol = 1;
var SET_fx_vol = 1;
var SET_music_vol = 0.1;



var sounds = {
    "kb1": {
        "url": "assets/sounds/aud_keyboard_1.mp3",
        "vol": SET_fx_vol
    },
    "kb2": {
        "url": "assets/sounds/aud_keyboard_2.mp3",
        "vol": SET_fx_vol
    },
    "beep": {
        "url": "assets/sounds/aud_beep.mp3",
        "vol": SET_fx_vol
    },
    "buzz": {
        "url": "assets/sounds/aud_buzz.mp3",
        "vol": SET_fx_vol
    },
    "anne": {
        "url": "assets/sounds/aud_anne.mp3",
        "vol": SET_music_vol
    },
    "background": {
        "url": "assets/sounds/aud_background.mp3",
        "vol": SET_ambient_vol
    },
}

function aud(audio, playover) {
    if (sounds[audio]) {                            // audio exists!!
        if (playover == true) {                     // audio should play over the last one
            var i_hate_you = new Audio(`${sounds[audio]["url"]}`);
            i_hate_you.volume = sounds[audio]["vol"];
            i_hate_you.play();
        } else {                                    // audio will pause over its last playing audio
            var use_var = `AUD_${audio}`.replace(" ", "_");
            if (eval(`if (typeof ${use_var} !== 'undefined') {true} else {false}`) == true) {
                eval(`${use_var}.currentTime = 0`);
                eval(`${use_var}.play()`);
                eval(`${use_var}.volume = ${sounds[audio]["vol"]}`);
            } else {
                eval(`${use_var} = new Audio("${sounds[audio]["url"]}")`);
                eval(`${use_var}.volume = ${sounds[audio]["vol"]}`);
                eval(`${use_var}.play()`);
            }
        }        
    } else {
        console.log(`[AUDIO FRAMEWORK (tm)]: the audio "${audio}" doesn't exist.`);
    }
}



function background_audio(){
    aud("background");
    setTimeout(background_audio, 11485); // 11.485 seconds long, this value shouold be in milliseconds
}



