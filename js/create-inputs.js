//Before we do anything, we need a way to keep track of the theme
const themeStorage = {
    "id": 971885,
    "name": "machine",
    "gui": "94d8db",
    "bg": "212121",
    "players": [
      "e57373",
      "64b5f6",
      "81c784",
      "ffb74d"
    ],
    "objs": [
      "c0ace1",
      "f17bb8",
      "2f426d",
      "1b1b1c",
      "efebef",
      "efebef",
      "efebef",
      "efebef",
      "efebef"
    ],
    "bgs": [
      "94d8db",
      "e57373",
      "d8ffe0",
      "f1ffc4",
      "fefec0",
      "f2c7b7",
      "f2c7b7",
      "f2c7b7",
      "f2c7b7"
    ]
  }
//SO. You have 24 lines of 24 <input>s in your html code. What do you do? 
//Answer: Try and probably fail to automate it. Let's go!!!!!!!
function CreateInputs(count,group,place){
    console.log("Creating inputs in group " + group + "...")
    for (let i = 0; i < count; i++) {
        // its time for the input!!!
        var input = document.createElement("input");
        // <input class="ThemeColor" type="color" onchange="Refresh([group])" id="col1picker" value="#94D8DB">
        input.className = "ThemeColor";
        input.type = "color";
        input.id = group + i;
        //switcheroo for the value!!
        switch (group){
            case "gui":
                basecolor =  themeStorage.gui
                break;
            case "bg":
                basecolor = themeStorage.bg
                break;
            case "players":
                basecolor =  themeStorage.players[i]
                break;
            case "objs":
                basecolor = themeStorage.objs[i] 
                break;
            case "bgs":
                basecolor = themeStorage.bgs[i]
                break;
        }
        input.setAttribute("value", "#" + basecolor);
        input.setAttribute("onchange", 'RefreshColor("' + group + '",' + i +')'); //" + group + "," + i + " // RefreshColor(players,3)

        //and now for the span (!!)
        var span = document.createElement("span");
        //<span id="col[x]text">C0ACE1</span>
        span.id = group + i + "text";
        span.innerHTML = basecolor
        //now we break it down 
        var br = document.createElement("br");
        // now...create the inputs. lets do this thing
        append = document.getElementById(place)
        append.appendChild(input);
        append.appendChild(span);
        append.appendChild(br);
        console.log(i + " - " + basecolor)
    }
    console.log("All done!")
}

//Create inputs on site load
CreateInputs(1,"gui","base")
CreateInputs(1,"bg","base")
CreateInputs(4,"players","players")
CreateInputs(9,"objs","objects")
CreateInputs(9,"bgs","bgobjects")