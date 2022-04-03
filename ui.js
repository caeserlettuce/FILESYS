//▓▒░
//▗▖▝▘▟▙▜▛▚▞█
//▉▊▋▌▍▎▏
//▇▆▅▄▃▂▁
//
//│┴┬├─┤┼┌┐└┘
//┃┻┳┣━┫╋┏┓┗┛
//║╩╦╠═╣╬╔╗╚╝
//       ╒
//
//
//
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
// USE ↖ IN PLACE OF \ SO I CAN DRAW THE ASCII ART NICELY WITHOUT HAVING TO DOUBLE UP THE BACKSPACES!!
					

═	║		╓	╔	╕	╖	╗	╘	╙	╚	╛	╜	╝	╞	╟   ╠	╡	╢	╣	╤	╥	╦	╧	╨	╩	╪	╫	╬	
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



// system is structured like this:

var template_system = {             // DONT EDIT
    "C": {                                                                      // the drive
        "files": [                                                                  // list of all the files in the current folder, if there are none, just leave it empty. the system knows what type of file it is by it's extension (e.g. .txt .exe) if no extension is set, the system will think it's a folder and will freak out or smth idk
            {"name": "file.txt", "contents": "hello, gordon!"},                         // setup a simple text file. if you want a new line, use "\n"
            {"name": "start.exe", "contents": "startExecutable();", "id": "4975"},      // setup a simple executable file. the value for "contents" will be run using eval() when the file is executed.
            {"name": "setup.ini", "contents": [                                         // setup of a simple config file. contents should contain a list of all the settings in the file
                {"name": "debug", "values": [                                               // define a setting. values should be a list of all the values you can select for the setting.
                    {"name": "../", "contents": "GO UP"},                                   // for going up
                    {"name": "true", "do": "debugTrue();"},                                 // simple setting value. "do" should be the function that will be run when you apply the settings.
                    {"name": "false", "do": "debugFalse();"}                                // ^
                    ]
                }, 
                {"name": "postfx", "values": [
                    {"name": "../", "contents": "GO UP"},
                    {"name": "true", "do": "pfxTrue();"},
                    {"name": "false", "do": "pfxFalse();"}
                    ]
                }
                ], "id": "4976"                                                             // id is the file id it'll show on the selection info (ont actually important internally)
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
            {"name": "folder1", "contents": {
                "files": [
                    {"name": "../", "contents": "GO UP"},
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
                    {"name": "../", "contents": "GO UP"},
                    {"name": "file5.txt", "contents": "never stop hello, world!"},
                    {"name": "file6.txt", "contents": "another foo bar is approaching!"}
                ],
                "folders": [
                    {"name": "dont look", "contents": {
                        "files": [
                            {"name": "../", "contents": "GO UP"},
                            {"name": "file5.txt", "contents": "never stop hello, world!"},
                            {"name": "file6.txt", "contents": "another foo bar is approaching!"}
                        ],
                        "folders": [
                            {"name": "seriously this is a secret", "contents": {
                                "files": [
                                    {"name": "../", "contents": "GO UP"},
                                    {"name": "file5.txt", "contents": "never stop hello, world!"},
                                    {"name": "file6.txt", "contents": "another foo bar is approaching!"}
                                ],
                                "folders": [
                                    {"name": "bruh", "contents": {
                                        "files": [
                                            {"name": "../", "contents": "GO UP"},
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