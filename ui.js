
//│┴┬├─┤┼┌┐└┘
//┃┻┳┣━┫╋┏┓┗┛
//║╩╦╠═╣╬╔╗╚╝
// ╨╤╟ ╡╪╓╖╙╜
// ╧╥╞ ╢╫╒╕╘╛
//╿┸┯┞ ┦╀┍┑┖┚
//╽┷┰┟ ┧╁┎┒┕┙
// ┵┭┠╾┥┽╭╮╯╰
// ┶┮┝╼┨┾
// ┹┱┡ ┩╇
// ┺┲┢ ┪╈
//╹   ╸ ╃
//╻   ╺ ╄
//╵   ╴ ╅
//╷   ╶ ╆
//    ╳ ╉
//    ╱ ╊
//    ╲ ┿
//      ╂
//          ↖
//▓▒░
//▗▖▝▘▟▙▜▛▚▞█
//▉▊▋▌▍▎▏
//▇▆▅▄▃▂▁
//

// USE ↖ IN PLACE OF \ SO I CAN DRAW THE ASCII ART NICELY WITHOUT HAVING TO DOUBLE UP THE BACKSPACES!!

var transition_text = [
    [ "█", "▓", "▒", "░", "░", " ", " ", " ", " "],
    [ "▓", "▒", "░", "░", " ", " ", " ", " ", " "],
    [ "▒", "░", "░", " ", " ", " ", " ", " ", " ", " "],
    [ "▒", "░", " ", " ", " ", " ", " ", " ", " ", " "]
]




var superhot_main = `   ┌────────────┬────────┬───────────────────────────14:17──┐   
   │superhot.exe│--FILE->│ directory:APPS         |>FOLDER< │   
   │readme.txt  │--FILE->│                                  │   
   │replays.exe │--FILE->│                                  │   
   │quit.exe    │--FILE->│                                  │   
   │------------│--------│                                  │   
   │SETTINGS    │>FOLDER<│                                  │   
   │APPS        │>FOLDER<│                                  │   
   │DEMOS       │>FOLDER<│                                  │   
   │CELLULAR    │>FOLDER<│                                  │   
   │WIRES       │>FOLDER<│                                  │   
   │GAMES       │>FOLDER<│                                  │   
   │VR          │>FOLDER<│                                  │   
   │ART         │>FOLDER<│                                  │   
   │VIDEOS      │>FOLDER<│                                  │   
   │            │        │                                  │   
   │            │        │                                  │   
   │            │        │                                  │   
   │            │        │                                  │   
   │            │        │                                  │   
   │            │        │                                  │   
   ├────────────┴────────┴──────────────────────────────────┤   
   │C:↖                                                     │   
   └────────────────────────────────────Omni-piOS-v2.1.01p──┘`;

var superhot_app = `
┌──────sinus─2─app─by─3.14─────────────────────────────────────┐
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
└───────────────────────────────────────────press─ESC─to─quit──┘`;

//var filesystem_template = []

var welcome_messages = [
    "FILESYS WELCOMES YOU!",
    "FILESYS!",
    "FILESYS, lemon demon approved!",
    "FILESYS",
    "FILESYS, definitely not a copy of superhot's menu",
    "FILESYS - hello, i'm here, i'm living in the wall",
    "FILESUS WELCOMES YOU!",
    "FILESUS!",
    "FILESYS - add console.log() until it works...",
    "FILESYS - coded in javascript",
    "FILESYS - i want to murder the creator of javascript",
    "FILESYS - there are definitely no secrets",
    "FILESYS - haha funny",
    "FILESYS - twitter.com was a mistake",
    "FILESYS - let's eat children in the dinosaurchestra",
    "FILESYS - let's rock out in the dinosaurchestra",
    "FILESYS - let's all shout in the dinosaurchestra",
    "FILESYS - let's have fun in the dinosaurchestra",
    "FILESYS - salem is an insane cat",
    "FILESYS - grain the block johnson",
    "FILESYS - this weekend?",
    "FILESYS - LAWNMOWER",
    "we've been trying to reach you about your car's extended warrany",
    "FILESYS - this is the ultimate showdown!",
    "FILESYS - mr. rogers in a bloodstained sweater",
    "FILESYS - what kind of milk were you?",
    "FILESYS - im in spain without the a",
    "FILESYS - i dont wanna go to brazil :sob:",
    "FILESYS - hip hurrah for the dinosaurchestra",
    "FILESYS - we wanna be your imaginary friend",
    "FILESYS - love yourself <3",
    "FILESYS - you are loved <3",
    "FILESYS - ur mom",
    "FILESYS - your mother",
    "FILESYS - among us",
    "FILESYS - everyone is here",
    "FILESYS - the fitness gram pacer test is a multi-stage aerobic capacity test that progressively gets more difficult as it continues",
    "FILESYS - do u know da wae?",
    "FILESYS - BEES! BEES! BEES! BEES!",
    "cover yourself in oil, you'll fly in the rain",
    "FILESYS - i'll cover you in honey",
    "FILESYS - 42",
    "FILESYS - if the court has no objections",
    "FILESYS - neil has been in a skull for 10 years now",
    "FILESYS - 'memory hoarder' out now!",
    "FILESYS - blame the man in the chicken costume",
    "FILESYS - this sentence is false",
    "FILESYS - *crab rave*",
    "FILESYS - omg!!!!!!!!!!",
    "FILESYS - EVERYBODY LOVES RAYMOND",
    "FILESYS - mt. saint helens is about to blow up",
    "FILESYS - adrien brody adrien brody adrien brody adrien brody",
    "FILESYS - you're at the party",
    "FILESYS - 24-hour pizza pie power",
    "FILESYS - LGBTQ+ rights are human rights",
    "FILESYS - you are not alone",
    "FILESYS - look behind you.",
    "FILESYS - there's weeping from the attic",
    "FILESYS - IT'S COMING IT'S COMING IT'S COMING IT'S COMING it'S COMING",
    "FILESYS - insert facebook minion meme",
    "FILESYS - but look, i made you some content!",
    "FILESYS - it's a beautiful day to stay inside",
    "FILESYS - imma facetime with my mom tonight",
    "FILESYS - linux moment",
    "FILESYS - we think we know you",
    "FILESYS - that is how the world works!",
    "FILESYS - hey! it's sock-o!",
    "FILESYS - benson my beloved <3",
    "FILESYS - please know you are loved <3",
    "FILESYS - read a book or something i dont know",
    '"i was just trying to become a better person"',
    "FILESYS - this is text! on a computer screen!",
    "FILESYS - an avocado!",
    "FILESYS - D'oh!",
    "FILESYS - dream is overrated",
    "FILESYS - TECHNOBLADE NEVER DIES!!!",
    "i drop kicked that child in self defense!",
    "FILESYS - a goat cheese salad",
    "FILESYS - according to youtube statistics, only 50% of people are actually subscribed",
    "FILESYS - unpaid intern, WAHDAHDAHDAH!!",
    "barely people, somehow legal, unpaid interns",
    "ceo, entrepreneur, born in 1964, jeffery bezos!",
    "FILESYS - can one be funny when stuck in a room?",
    "FILESYS - well, well, look who's inside again",
    "FILESYS - L + ratio + u fell off + walk the plank + you have scurvy + no parrots + poly does not want a cracker + both legs + no hook + ",
    "FILESYS - I'M, TURNING, 30!",
    "FILESYS - welcome to the internet!",
    "FILESYS - from wikipedia, the FREE encyclopedia",
    "how we feelin out there tonight? i'm not feeling good",
    "FILESYS - dog",
    "FILESYS - please take care of yourself <3",
    "if jesus can walk on water, can he swim on land?",
    "just nod or shake your head and we'll do the rest",
    "which power ranger are you? take this quirky quiz!",
    "could i interest you in anything, all of the time?",
    "and if we stick together, who knows what we'll do?",
    "FILESYS - mwahahhahaha, MWHAHAHWHAHAHHAHAAHAHHA!!!!!",
    "FILESYS - apathy's a tradgedy, and boredom's a crime!",
    "FILESYS - jeffery bezos, jeffery bezos, you did it!",
    "FILESYS - you are strong <3",
    "are you feeling nervous? are you having fun?",
    "FILESYS - prolongued eye contact.",
    "FILESYS - funny space rock!!!!",
    "FILESYS - i promise to never go outside again!",
    "FILESYS - so this is how it ends?",
    "FILESYS - bo likes to dance like this",
    "FILESYS - bo wants to make you feel comfortable",
    "FILESYS - do you wanna see a maigic trick?",
    "FILESYS - MAGIC ISN'T REAL! or is it?",
    "FILESYS - what are you doing?",
    "FILESYS - you are valid <3",
    "FILESYS - and the pentacorn spoke thus:",
    "FILESYS - he was safe. for now...",
    "FILESYS - it's hard to be a lizard!",
    "FILESYS - consider this a threat",
    "FILESYS - naturally good!",
    "FILESYS - san francisco!!!!",
    "FILESYS - HE MEANT TO KNOCK THE WATER OVER!!",
    "i hate catchy choruses, and i'm a hypocrite",
    "FILESYS - eating a clock is time consuming",
    "FILESYS - taco bell",
    "FILESYS - java exploit found..."
]
var welcome_messages_rare = [
    "no thank you",
    "this has a 1 in 100 chance of showing up!"
]

// system is structured like this:

var template_system = {             // DONT EDIT
    "C": {                                                                                                  // the drive
        "files": [                                                                                                  // list of all the files in the current folder, if there are none, just leave it empty. the system knows what type of file it is by it's extension (e.g. .txt .exe) if no extension is set, the system will think it's a folder and will freak out or smth idk
            {"name": "file.txt", "contents": "hello, gordon!"},                                                         // setup a simple text file. if you want a new line, use "\n"
            {"name": "start.exe", "contents": "app:superhot.exe     |--FILE->9749", "exec": "startExecutable();"},      // setup a simple executable file. the value for "exec" will be run using eval() when the file is executed. "contents" is the file informationé
            {"name": "setup.ini", "contents": [                                                                         // setup of a simple config file. contents should contain a list of all the settings in the file
                {"name": "debug", "values": [                                                                           // define a setting. values should be a list of all the values you can select for the setting.
                    {"name": "../", "contents": "directory: GO UP"},                                                    // for going up
                    {"name": "true", "do": "debugTrue();"},                                                             // simple setting value. "do" should be the function that will be run when you apply the settings.
                    {"name": "false", "do": "debugFalse();"}                                                            // ^
                    ]
                }, 
                {"name": "postfx", "values": [
                    {"name": "../", "contents": "directory: GO UP"},
                    {"name": "true", "do": "pfxTrue();"},
                    {"name": "false", "do": "pfxFalse();"}
                    ]
                }
                ]                                                                // id is the file id it'll show on the selection info (ont actually important internally)
            }
        ],
        "folders": [                                                    // list of all the folders in the current directory. if there are none, just leave it empty.
            {"name": "music", "contents": {                             // the same as the main C drive
                "files": [
                ],
                "folders": [
                ]
            }}
        ]
    }
}


var system = {
    "C": {
        "files": [
            {"name": "file1.txt", "contents": `hello, world!
hello, gordon!
hello, gordon!
hello, gordonAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!
hello, gordon!
hello, gordon!
hello, gordon!
hello, gordon!
hello, gordon!
hello, gordon!
hello, you!
hello, you!
hello, you!
hello, you!
hello, you!
hello, you!
hello, you!
hello, you!
hello, you!
hello, you!
hello, you!
hello, you!
hello, you!`},
            {"name": "file2.txt", "contents": "foo bar"},
            {"name": "file3.txt", "contents": "foo bar"},
            {"name": "file4.txt", "contents": "foo bar"},
            {"name": "file5.txt", "contents": "foo bar"},
            {"name": "file6.txt", "contents": "foo bar"},
            {"name": "file7.txt", "contents": "foo bar"},
            {"name": "file8.txt", "contents": "foo bar"},
            {"name": "file9.txt", "contents": "foo bar"},
            {"name": "file10.txt", "contents": "foo bar"},
            {"name": "file11.txt", "contents": "hello, world!"},
            {"name": "file12.txt", "contents": "foo bar"},
            {"name": "file13.txt", "contents": "foo bar"},
            {"name": "file14.txt", "contents": "foo bar"},
            {"name": "file15.txt", "contents": "foo bar"},
            {"name": "file16.txt", "contents": "foo bar"},
            {"name": "file17.txt", "contents": "foo bar"},
            {"name": "file18.txt", "contents": "foo bar"},
            {"name": "file19.txt", "contents": "foo bar"},
            {"name": "file20.txt", "contents": "foo bar"},
            {"name": "file21.txt", "contents": "hello, world!"},
            {"name": "file22.txt", "contents": "foo bar"},
            {"name": "file23.txt", "contents": "foo bar"},
            {"name": "file24.txt", "contents": "foo bar"},
            {"name": "file25.txt", "contents": "foo bar"},
            {"name": "file26.txt", "contents": "foo bar"},
            {"name": "file27.txt", "contents": "foo bar"},
            {"name": "file28.txt", "contents": "foo bar"},
            {"name": "file29.txt", "contents": "foo bar"},
            {"name": "file30.txt", "contents": "foo bar"},
            {"name": "file31.txt", "contents": "hello, world!"},
            {"name": "file32.txt", "contents": "foo bar"},
            {"name": "file33.txt", "contents": "foo bar"},
            {"name": "file34.txt", "contents": "foo bar"},
            {"name": "file35.txt", "contents": "foo bar"},
            {"name": "file36.txt", "contents": "foo bar"},
            {"name": "file37.txt", "contents": "foo bar"},
            {"name": "file38.txt", "contents": "foo bar"},
            {"name": "file39.txt", "contents": "foo bar"},
            {"name": "file40.txt", "contents": "foo bar"},
            {"name": "file41.txt", "contents": "hello, world!"},
            {"name": "file42.txt", "contents": "foo bar"},
            {"name": "file43.txt", "contents": "foo bar"},
            {"name": "file44.txt", "contents": "foo bar"},
            {"name": "file45.txt", "contents": "foo bar"},
            {"name": "file46.txt", "contents": "foo bar"},
            {"name": "file47.txt", "contents": "foo bar"},
            {"name": "file48.txt", "contents": "foo bar"},
            {"name": "file49.txt", "contents": "foo bar"},
            {"name": "file50.txt", "contents": "foo bar"},
            {"name": "file51.txt", "contents": "hello, world!"},
            {"name": "file52.txt", "contents": "foo bar"},
            {"name": "file53.txt", "contents": "foo bar"},
            {"name": "file54.txt", "contents": "foo bar"},
            {"name": "file55.txt", "contents": "foo bar"},
            {"name": "file56.txt", "contents": "foo bar"},
            {"name": "file57.txt", "contents": "foo bar"},
            {"name": "file58.txt", "contents": "foo bar"},
            {"name": "file59.txt", "contents": "foo bar"},
            {"name": "file60.txt", "contents": "foo bar"},
        ],
        "folders": [
            {"name": "folder1", "contents": {
                "files": [
                    {"name": "../", "contents": "directory: GO UP"},
                    {"name": "file1.txt", "contents": "hello, world!"},
                    {"name": "file2.txt", "contents": "foo bar"},
                    {"name": "file3.txt", "contents": "foo bar"},
                    {"name": "file4.txt", "contents": "foo bar"},
                    {"name": "file5.txt", "contents": "foo bar"},
                    {"name": "file6.txt", "contents": "foo bar"},
                    {"name": "file7.txt", "contents": "foo bar"},
                    {"name": "file8.txt", "contents": "foo bar"},
                    {"name": "file9.txt", "contents": "foo bar"},
                    {"name": "file10.txt", "contents": "foo bar"},
                    {"name": "file11.txt", "contents": "hello, world!"},
                    {"name": "file12.txt", "contents": "foo bar"},
                    {"name": "file13.txt", "contents": "foo bar"},
                    {"name": "file14.txt", "contents": "foo bar"},
                    {"name": "file15.txt", "contents": "foo bar"},
                    {"name": "file16.txt", "contents": "foo bar"},
                    {"name": "file17.txt", "contents": "foo bar"},
                    {"name": "file18.txt", "contents": "foo bar"},
                    {"name": "file19.txt", "contents": "foo bar"},
                    {"name": "file20.txt", "contents": "foo bar"},
                    {"name": "file21.txt", "contents": "hello, world!"},
                    {"name": "file22.txt", "contents": "foo bar"},
                    {"name": "file23.txt", "contents": "foo bar"},
                    {"name": "file24.txt", "contents": "foo bar"},
                    {"name": "file25.txt", "contents": "foo bar"},
                    {"name": "file26.txt", "contents": "foo bar"},
                    {"name": "file27.txt", "contents": "foo bar"},
                    {"name": "file28.txt", "contents": "foo bar"},
                    {"name": "file29.txt", "contents": "foo bar"},
                    {"name": "file30.txt", "contents": "foo bar"},
                    {"name": "file31.txt", "contents": "hello, world!"},
                    {"name": "file32.txt", "contents": "foo bar"},
                    {"name": "file33.txt", "contents": "foo bar"},
                    {"name": "file34.txt", "contents": "foo bar"},
                    {"name": "file35.txt", "contents": "foo bar"},
                    {"name": "file36.txt", "contents": "foo bar"},
                    {"name": "file37.txt", "contents": "foo bar"},
                    {"name": "file38.txt", "contents": "foo bar"},
                    {"name": "file39.txt", "contents": "foo bar"},
                    {"name": "file40.txt", "contents": "foo bar"},
                    {"name": "file41.txt", "contents": "hello, world!"},
                    {"name": "file42.txt", "contents": "foo bar"},
                    {"name": "file43.txt", "contents": "foo bar"},
                    {"name": "file44.txt", "contents": "foo bar"},
                    {"name": "file45.txt", "contents": "foo bar"},
                    {"name": "file46.txt", "contents": "foo bar"},
                    {"name": "file47.txt", "contents": "foo bar"},
                    {"name": "file48.txt", "contents": "foo bar"},
                    {"name": "file49.txt", "contents": "foo bar"},
                    {"name": "file50.txt", "contents": "foo bar"},
                    {"name": "file51.txt", "contents": "hello, world!"},
                    {"name": "file52.txt", "contents": "foo bar"},
                    {"name": "file53.txt", "contents": "foo bar"},
                    {"name": "file54.txt", "contents": "foo bar"},
                    {"name": "file55.txt", "contents": "foo bar"},
                    {"name": "file56.txt", "contents": "foo bar"},
                    {"name": "file57.txt", "contents": "foo bar"},
                    {"name": "file58.txt", "contents": "foo bar"},
                    {"name": "file59.txt", "contents": "foo bar"},
                    {"name": "file60.txt", "contents": "foo bar"},
                ],
                "folders": [
                    {"name": "folder", "contents": {}}
                ]
            }},
            {"name": "folder2", "contents": {
                "files": [
                    {"name": "../", "contents": "directory: GO UP"},
                    {"name": "file5.txt", "contents": "never stop hello, world!"},
                    {"name": "file6.txt", "contents": "another foo bar is approaching!"}
                ],
                "folders": [
                    {"name": "dont look", "contents": {
                        "files": [
                            {"name": "../", "contents": "directory: GO UP"},
                            {"name": "file5.txt", "contents": "never stop hello, world!"},
                            {"name": "file6.txt", "contents": "another foo bar is approaching!"}
                        ],
                        "folders": [
                            {"name": "seriously this is a secret", "contents": {
                                "files": [
                                    {"name": "../", "contents": "directory: GO UP"},
                                    {"name": "file5.txt", "contents": "never stop hello, world!"},
                                    {"name": "file6.txt", "contents": "another foo bar is approaching!"}
                                ],
                                "folders": [
                                    {"name": "bruh", "contents": {
                                        "files": [
                                            {"name": "../", "contents": "directory: GO UP"},
                                            {"name": "file5.txt", "contents": "never stop hello, world!"},
                                            {"name": "file6.txt", "contents": "another foo bar is approaching!"}
                                        ],
                                        "folders": [
                                            
                                        ]
                                    }}
                                ]
                            }}
                        ]
                    }}
                ]
            }}
        ]
    }
}


var superhot_main = [
[`┌────────────┬────────┬───────────────────────────14:17──┐`],
[`│superhot.exe│--FILE->│ directory:APPS         |>FOLDER< │`],
[`│            │        │                                  │`],
[`│------------│--------│                                  │`],
[`├────────────┴────────┴──────────────────────────────────┤`],
[`│C:↖                                                     │`],
[`└──────────────────────────────────────FILESYS─${version}──┘`]
];