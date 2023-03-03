//SO. You have 24 lines of 24 <input>s in your html code. What do you do? 
//Answer: Try and probably fail to automate it. Let's go!!!!!!!
function CreateInputs(){
    for (let i = 1; i < 25; i++) {
        // its time for the input!!!
        var input = document.createElement("input");
        // <input class="ThemeColor" type="color" onchange="UpdateColors()" id="col[i]picker" value="[default value]">
        input.className = "ThemeColor";
        input.type = "color";
        input.id = "col" + i + "picker";
        input.value = "#000000"
        input.setAttribute("onchange", "UpdateColors()");

        //and now for the span (!!)
        var span = document.createElement("span");
        //<span id="col[x]text">C0ACE1</span>
        span.id = "col" + i + "text";
        span.innerHTML = "000000"
        //now we break it down 
        var br = document.createElement("br");
        // now...create the inputs. lets do this thing
        document.body.appendChild(input);
        document.body.appendChild(span);
        document.body.appendChild(br);
    }
}