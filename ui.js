//▓▒░
//▗▖▝▘▟▙▜▛▚▞█
//▉▊▋▌▍▎▏
//▇▆▅▄▃▂▁
//
//│┴┬├─┤┼┌┐└┘
//┃┻┳┣━┫╋┏┓┗┛
//║╩╦╠═╣╬╔╗╚╝
//
// USE ↖ IN PLACE OF \ SO I CAN DRAW THE ASCII ART NICELY WITHOUT HAVING TO DOUBLE UP THE BACKSPACES!!

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
                    {"name": "true", "do": "debugTrue();"},                                 // simple setting value. "do" should be the function that will be run when you apply the settings.
                    {"name": "false", "do": "debugFalse();"}                                // ^
                    ]
                }, 
                {"name": "postfx", "values": [
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
            {"name": "file2.txt", "contents": "foo bar"}
        ],
        "folders": [
            {"name": "folder1", "contents": {
                "files": [
                    {"name": "file3.txt", "contents": "hello, world again!"},
                    {"name": "file4.txt", "contents": "another foo bar"}
                ],
                "folders": [

                ]
            }},
            {"name": "folder2", "contents": {
                "files": [
                    {"name": "file5.txt", "contents": "never stop hello, world!"},
                    {"name": "file6.txt", "contents": "another foo bar is approaching!"}
                ],
                "folders": [

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