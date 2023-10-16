	/* all of the code here is probably really bad i'm sorry lmao */
// ALRIGHT NERDS. its time to put together the theme file

//Its time to update the colors but be WAY COOLER
//COLOR IDS will be in this format: [group][number]. 
//COLOR GROUPS: gui, bg, players, objs, bgs (aka the groups in the uh... uh the )
let inputTheme = null // declare input theme variable

function RefreshColor(group,num){ // Update color in JSON and on the page
    const col = document.getElementById(group + num).value.replace("#","");//PA theme files don't store the # in the hex code
    switch (group){
        case "gui":
            themeStorage.gui = col
            break;
        case "bg":
            themeStorage.bg = col
            break;
        case "players":
            themeStorage.players[num] = col
            break;
        case "objs":
            themeStorage.objs[num] = col
            break;
        case "bgs":
            themeStorage.bgs[num] = col
            break;
    }
    document.getElementById(group + num + "text").innerHTML = col;
    console.log(`Color ${group} ${num} set to ${col}!`)
}

   
function CreateTheme(){
    //Get theme values
    InpThemeDisplay = document.getElementById("InpThemeDisplay").value
    InpThemeID = document.getElementById("InpThemeID").value
        // Name the theme
        let text;
          let themename = document.getElementById("InpThemeName").value; 
          if (themename == null || themename == "") {
            console.log("Invalid theme name - cancelled");
            alert("You need a proper theme name!")
            return
        }
        // Update all of the background colors if background hide is on 
        if (document.getElementById("hideBGs").checked == true) {
            console.log("Removing background...")
            for (let i = 0; i < 9; i++){ // all 9 theme colors
                themeStorage.bgs[i] = themeStorage.bg;
            } 
        }
        // Check if a display name exists - use if it does
        if (InpThemeDisplay == null || InpThemeDisplay == ""){
            console.log("No theme display name - using file name!")
            themeStorage.name = themename
        } else { 
            themeStorage.name = InpThemeDisplay
        }
        // PA theme IDS are actually just random numbers with no significance whatsoever
        //we need to check if it's a number we can use (is an actual number, is whole)
        if (InpThemeID == null || InpThemeID == "" || isNaN(InpThemeID) == true || (InpThemeID - Math.floor(InpThemeID)) !== 0){
            console.log("Invalid theme ID, using random (theme ID must be a whole number!)");
            themeStorage.id = Math.round(Math.random()*1000000);
        } else {
            themeStorage.id = InpThemeID;
        }

        /*Now download it*/
        download(`${themename}.lst`, JSON.stringify(themeStorage));
    } 
function download(filename, text){
        const element = document.createElement('a');
        element.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download',filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
function storeTheme(){
    input = document.getElementById('themeupload');
    let file = input.files[0]; 
    let fileReader = new FileReader(); 
    fileReader.readAsText(file); 
    fileReader.onload = function() {
        inputTheme = fileReader.result
        document.getElementById('LoadButton').innerHTML = "LOAD THEME"
        }; 
    fileReader.onerror = function() {
          alert(fileReader.error);
    }
}
function loadTheme() {
    if (inputTheme == null){
        console.log("Loading default theme...")
        AssembleInputs()
        return
    } else {
        inputTheme = JSON.parse(inputTheme)
        themeStorage.gui = inputTheme.gui
        themeStorage.bg = inputTheme.bg
        for (let i = 0; i < 4; i++) {
        themeStorage.players[i] = inputTheme.players[i]
        }
        for (let i = 0; i < 9; i++) {
            themeStorage.objs[i] = inputTheme.objs[i]
        }
        for (let i = 0; i < 9; i++) {
            themeStorage.bgs[i] = inputTheme.bgs[i]
        }
        //set values of theme info inputs
        document.getElementById("InpThemeName").setAttribute("value", inputTheme.name);
        document.getElementById("InpThemeDisplay").setAttribute("value", inputTheme.name);
        document.getElementById("InpThemeID").setAttribute("value", inputTheme.id)
        AssembleInputs()
    }
}
//hide background

function hideBackground() {
    bgcheck = document.getElementById("hideBGs")
    if (bgcheck.checked == true) {
        console.log("gaming");
        document.getElementById("bgobjects").style.opacity = 0.15
        const bgob = document.getElementsByClassName("bgscolor");
        for (let i = 0; i < bgob.length; i++) {
            bgob[i].setAttribute("disabled", "true")
        }
        //set inputs as inactive
    } else {
        console.log("gaming 2");
        document.getElementById("bgobjects").style.opacity = 1;
        //set inputs as active
        const bgob2 = document.getElementsByClassName("bgscolor");
        for (let i = 0; i < bgob2.length; i++) {
            bgob2[i].removeAttribute("disabled")
        }
    }
    /* no wait this is actually REALLY STUPID PLEASE REWORK THIS
    -ok so here's the problem this overwrites background files 
    -we need it to just remove them from the output
    -so that means changing the function to download themes
    -just make this change transparency
    // make the check the check
    bgcheck = document.getElementById("hideBGs")
    if (bgcheck.checked == true) {
    for (let i = 0; i < 9; i++){ // all 9 theme colors
    themeStorage.bgs[i] = themeStorage.bg; // set them to the theme color
    // now update
    console.log("bgs" + i + "text")
    document.getElementById("bgs" + i + "text").innerHTML = themeStorage.bg;
    document.getElementById("bgs" + i + "text").innerHTML = themeStorage.bg;
    document.getElementById("bgs" + i).setAttribute("value", "#" + themeStorage.bg);
   // RefreshColor("bgs",i) // then reload those colors
    }
    } else {
    console.log("nah nvm")
    }
    */
}