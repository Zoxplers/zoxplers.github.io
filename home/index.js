/*Made by Zoxplers*/

//URL Parse
showHidden = false;
URLParams = document.URL.split("?")[1].replaceAll("?","&").split("&");
URLParams.forEach(function(i)
{
    if(i.toLowerCase() === "showhidden=true" || i.toLowerCase() === "showhidden")
    {
        showHidden = true;
    }
});
//URL Parse End

//Audio
audioAmount = 5;
audioArray = [];
currentAudio = 0;

while(audioArray.length < audioAmount)
{
    randInt = Math.ceil(Math.random() * audioAmount);
    if(!(randInt == 1 && audioArray.length == 0) && !audioArray.includes(document.getElementById("audio" + randInt)))
    {
        audioArray.push(document.getElementById("audio" + randInt));
    }
}

Array.from(document.getElementsByTagName("audio")).forEach(audio => {
    audio.volume = 0.2;
    audio.onended = function()
    {
        currentAudio++;
        if(currentAudio > audioArray.length)
        {
            currentAudio = 0;
        }
        playAudio();
    }
});

function playAudio()
{
    audioArray.at(currentAudio).play();
}

function stopAudio()
{
    Array.from(document.getElementsByTagName("audio")).forEach(audio => audio.pause());
}
//Audio End

//NameClick
nameToggle = true;
nameElem = document.getElementsByTagName("name")[0];

function nameClick()
{
    nameToggle = !nameToggle;
    if(nameToggle)
    {
        document.getElementById("foreground").prepend(nameElem);
        nameElem.style.removeProperty("text-shadow");
        nameElem.style.removeProperty("color");
        stopAudio();
    }
    else
    {
        document.getElementById("background").prepend(nameElem);
        nameElem.style.setProperty("text-shadow", "0 0 2px white");
        nameElem.style.setProperty("color", "white");
        playAudio();
    }
}

nameElem.onclick = nameClick;
//NameClick End

//Logo
logoAmount = 6;

function logoClick()
{
    randInt = Math.ceil(Math.random() * logoAmount);
    while ("/assets/logo"+randInt+".png" == document.getElementsByTagName("logo")[1].children.item(0).getAttribute("src"))
    {
        randInt = Math.ceil(Math.random() * logoAmount);
    }
    document.getElementsByTagName("logo")[1].children.item(0).setAttribute("src", "/assets/logo"+randInt+".png");
}

logoClick();

document.getElementsByTagName("logo")[0].onclick = logoClick;
//Logo End

//Tooltips
enabledTooltips = [];
function tooltip(obj, parent, text, align)
{
    let tooltipElem = document.createElement("tooltip");
    tooltipParent = parent;
    tooltipElem.innerHTML = text;
    tooltipParent.append(tooltipElem);
    function enableTooltip()
    {
        tooltipElem.classList.remove("invis");
        objRect = obj.getBoundingClientRect();
        if(align == "left")
        {
            tooltipElem.style.setProperty("left", (objRect.left - tooltipElem.offsetWidth) + "px");
            tooltipElem.style.setProperty("top", objRect.top + "px");
        }
        else if(align == "right")
        {
            tooltipElem.style.setProperty("left", objRect.right + "px");
            tooltipElem.style.setProperty("top", objRect.top + "px");
        }
        else if(align == "top")
        {
            tooltipElem.style.setProperty("left", (objRect.left + objRect.width / 2 - tooltipElem.offsetWidth / 2) + "px");
            tooltipElem.style.setProperty("top", (objRect.top - tooltipElem.offsetHeight) + "px");
        }
        else if(align == "bottom")
        {
            tooltipElem.style.setProperty("left", (objRect.left + objRect.width / 2 - tooltipElem.offsetWidth / 2) + "px");
            tooltipElem.style.setProperty("top", objRect.bottom + "px");
        }
        else
        {
            tooltipElem.style.setProperty("left", objRect.left + "px");
            tooltipElem.style.setProperty("top", objRect.top + "px");
        }
    }

    function disableTooltip()
    {
        tooltipElem.classList.add("invis");
    }

    obj.onmouseover = enableTooltip;
    obj.onfocus = enableTooltip;
    obj.onmouseout = disableTooltip;
    disableTooltip();
}
tooltip(document.getElementById("background").getElementsByTagName("heading")[0].getElementsByTagName("line")[0], document.getElementById("background"), "<span style = \"left: 1vw\">Welcome to my website!</span>", "right");
tooltip(document.getElementById("background").getElementsByTagName("heading")[0].getElementsByTagName("line")[1], document.getElementById("foreground"), "<img style = \"height: 18vh; left: 1vw; top: -9vh; border-radius: 50%; background: radial-gradient(#ffffff, #00000000 80%)\" src = \"/assets/wave.png\"/>", "right");
//Tooltips End

//Status
function updateStatus(data)
{
    hasActivity = false;
    if(data["discord_status"] == "online")
    {
        string = data["discord_status"];
        data["activities"].forEach(activity => {
            if(hasActivity)
            {
                string += " and on ";
            }
            else
            {
                hasActivity = true;
                string += " on ";
            }
            if(activity.name == "Custom Status")
            {
                string += "Discord: "
                if(activity.hasOwnProperty("emoji"))
                {
                    if(activity["emoji"].hasOwnProperty("id"))
                    {
                        string += "<img src=\"https://cdn.discordapp.com/emojis/" + activity["emoji"]["id"] + "?size=56\">"
                    }
                    else
                    {
                        string += activity["emoji"]["name"];
                    }                    
                }
                string = activity.hasOwnProperty("state") ? string + " " + activity["state"] : string;
            }
            else if(activity.name == "Hang Status")
            {
                string += "Discord: "
                if(activity.state == "custom")
                {
                    string = activity.hasOwnProperty("details") ? string + " " + activity["details"] : string;
                }
                else
                {
                    string += " " + activity["state"];
                }
            }
            else
            {
                string += activity.name;
            }
        });
        if(!hasActivity)
        {
            string = data["discord_status"] + " on Discord";
        }
        document.documentElement.style.setProperty("--statusColor", "green");
    }
    else if(data["discord_status"] == "dnd")
    {
        string = "Do Not Disturb";
        document.documentElement.style.setProperty("--statusColor", "red");
    }
    else
    {
        string = data["discord_status"];
        document.documentElement.style.setProperty("--statusColor", "white");
        if(string == "idle")
        {
            document.documentElement.style.setProperty("--statusColor", "orange");
        }
    }
    document.getElementsByTagName("footer")[0].innerHTML = "<indicator></indicator><p>"+string.charAt(0).toUpperCase() + string.slice(1) + "</p>";
}


lanyard(
{
    userId: "224288033950662656",
    socket: true,
    onPresenceUpdate: updateStatus
})
//Status End

//Socials
//make socials jump randomly
document.getElementsByTagName("socials")[0].innerHTML = "Unable to fetch data.";

fetch("https://zoxplers.com/home/socials").then(response => {
    document.getElementsByTagName("socials")[0].style.setProperty("transition", "2s");
    document.getElementsByTagName("socials")[0].style.setProperty("height", "120%");
    response.text().then(content => {
        document.getElementsByTagName("socials")[0].innerHTML = content;
        Array.from(document.getElementsByTagName("socials")[0].children).forEach(socialItem => {
            socialImage = document.createElement("img");
            socialImage.setAttribute("src", "/assets/"+socialItem.getAttribute("src"));
            socialItem.appendChild(socialImage);
            if(showHidden)
            {
                socialItem.classList.remove("hidden");
            }
            if(socialItem.getAttribute("href") != null)
            {
                socialItem.onclick = function()
                {
                    window.open(socialItem.getAttribute("href"));
                };
                tooltip(socialItem, document.getElementById("background"), "<span style = \"top: -1.5vh; vertical-align: text-top;\">" + socialItem.getAttribute("text") + "</span>", "bottom");
            }
        })
    });
});
//Socials End