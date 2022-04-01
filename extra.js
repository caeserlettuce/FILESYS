// functions i may need to frankenstein later that i dont want to comment out


function updateFilescreen(part) {
    
    prev_filescreen = filescreen;
    prev_filescreen_info = filescreen_info;

    var UPD_time = false;
    var UPD_files = false;
    var UPD_dir = false;
    var UPD_all = false;


    updateFilescreenValues();

    var finalArr = new Array();

    finalArr.push(`┌────────────┬────────┬───────────────────────────${filescreen_info["time"]}──┐`);


    var filescreen = [
        [`┌────────────┬────────┬───────────────────────────${time}──┐`], // 0
        [`│superhot.exe│--FILE->│ directory:APPS         |>FOLDER< │`], // 1
        [`│            │        │                                  │`], // 2
        [`│------------│--------│                                  │`], // 3
        [`├────────────┴────────┴──────────────────────────────────┤`], // 4
        [`│C:↖                                                     │`], // 5
        [`└──────────────────────────────────────FILESYS─${version}──┘`] // 6
    ]
    
    return finalArr
                // WORK ON NAVIGATING THROUGH FILES FIRST!!!!!!!!
}


function setScreen(sceen) {
    var fiml = "";
    for (i in sceen) {
        var text = `${sceen[i]}`.replaceAll("↖", "\\");
        if (i == 0) {
            fiml = text;
        } else {
            fiml = `${fiml}\n${text}`;
        }
    }
    DOS_text.innerHTML = fiml;
}
