	/* all of the code here is probably really bad i'm sorry lmao */
// ALRIGHT NERDS. its time to put together the theme file

//Its time to update the colors but be WAY COOLER
//COLOR IDS will be in this format: [group][number]. 
//COLOR GROUPS: gui, bg, players, objs, bgs (aka the groups in the uh... uh the )

function RefreshColor(group,num){
    var col = document.getElementById(group + num).value;
    //Pull the ol' switcheroo based on what the color's group is
    switch (group){
        case "gui":
            themeStorage.gui[num] = col
            break;
        case "bg":
            themeStorage.bg[num] = col
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
    
    function CreateTheme(){
        /*Name the theme*/
        let text;
          let themename = prompt("Name your theme:",);
          if (themename == null || themename == "") {
            console.log("Invalid theme name - cancelled");
            return
        }
        /*put it together*/
        var theme = {
            /*In Project Arrhythmia, theme IDS are actually just random numbers with no significance whatsoever*/
        "id":Math.round(Math.random()*1000000),
            /* Now for the fun part of assembling the file. This could be done better but it isnt as bad as before at least*/
        "name":themename,
        "gui":(document.getElementById("col1text").innerHTML),
        "bg":(document.getElementById("col2text").innerHTML),
        "players":[(document.getElementById("col3text").innerHTML),(document.getElementById("col4text").innerHTML),(document.getElementById("col5text").innerHTML),(document.getElementById("col6text").innerHTML)],
        "objs":[(document.getElementById("col7text").innerHTML),(document.getElementById("col8text").innerHTML),(document.getElementById("col9text").innerHTML),(document.getElementById("col10text").innerHTML),(document.getElementById("col11text").innerHTML),(document.getElementById("col12text").innerHTML),(document.getElementById("col13text").innerHTML),(document.getElementById("col14text").innerHTML),(document.getElementById("col15text").innerHTML)],
        "bgs":[(document.getElementById("col16text").innerHTML),(document.getElementById("col17text").innerHTML),(document.getElementById("col18text").innerHTML),(document.getElementById("col19text").innerHTML),(document.getElementById("col20text").innerHTML),(document.getElementById("col21text").innerHTML),(document.getElementById("col22text").innerHTML),(document.getElementById("col23text").innerHTML),(document.getElementById("col24text").innerHTML)]};
        var themeJSON = JSON.stringify(theme);
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
    function loadTheme(){
        var lstfile = document.getElementById('lstupload');
        console.log(lstfile)
    }
// update colors on site load
    UpdateColors()