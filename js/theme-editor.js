	/* all of the code here is probably really bad i'm sorry lmao */
// ALRIGHT NERDS. its time to put together the theme file

//Its time to update the colors but be WAY COOLER
//COLOR IDS will be in this format: [group][number]. 
//COLOR GROUPS: gui, bg, players, objs, bgs (aka the groups in the uh... uh the )

function RefreshColor(group,num){
    var col = document.getElementById(group + num).value;
    //get that #### out of here
    col = col.replace("#","");
    //Pull the ol' switcheroo based on what the color's group is
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
    console.log("Color " + group + num + " set to " + col + "!")
}


/* (original function to) update the colors !! */
//This isn't as good as the new one because it isn't nearly as flexible
function UpdateColors(){
        // ready the canvas
        var canvas = document.getElementById("themePreview");
        var ctx = canvas.getContext("2d");
        
        /* Using the magic of iteration we can go through each theme input and update their respective values on the page*/
        for (let i = 1; i < 25; i++) {
            var col = document.getElementById("col" +i +"picker").value;
            //apply new color
            ctx.fillStyle = col;
            // fill rectangle based on iteration
            console.log("Color " + i + " added at " + (i-1)*25)
            ctx.fillRect((i-1)*25,0,25,25);
            //make colors better
            var col = col.replace("#","")		
            if (col == document.getElementById("col" +i + "text").innerHTML){
                /* console.log("Color " + i +" not changed.");*/
            } else {
                console.log("Color " + i +" set to " + col);
                document.getElementById("col" +i + "text").innerHTML = col;
            }
        }
    }
//make the theme! woohoo!    
function CreateTheme(){
        /*Name the theme*/
        let text;
          let themename = prompt("Name your theme:",);
          if (themename == null || themename == "") {
            console.log("Invalid theme name - cancelled");
            return
        }
        themeStorage.name = themename
        /*In Project Arrhythmia, theme IDS are actually just random numbers with no significance whatsoever*/
        themeStorage.id = Math.round(Math.random()*1000000);
        var themeJSON = JSON.stringify(themeStorage);
        /*Now download it*/
        download(themename + ".lst", themeJSON)
    } 
function download(filename, text){
        var element = document.createElement('a');
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
        document.getElementById('storage').innerHTML = fileReader.result
        //yeah, im storing it like that. you have full permission to mock me for this. i couldnt get anything else to work :(
        document.getElementById('LoadButton').innerHTML = "LOAD THEME"
        }; 
    fileReader.onerror = function() {
          alert(fileReader.error);
    }
}
function loadTheme() {
    inputTheme = document.getElementById('storage').innerHTML 
    if (inputTheme == ""){
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
        AssembleInputs()
    }
}
//load the theme