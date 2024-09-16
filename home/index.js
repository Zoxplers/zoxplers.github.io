/*Made by Zoxplers*/

//Main Patch
document.getElementById("foreground").innerHTML = document.getElementById("background") .innerHTML;

//URL Parse
showHidden = false;
URLParams = document.URL.includes("?") ? document.URL.substring(document.URL.indexOf("?")+1).replaceAll("?","&").split("&") : [];
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
nameToggle = false;
nameElem = document.getElementsByTagName("name")[1];
nameBackElem = document.getElementsByTagName("name")[0];

function nameClick()
{
    nameToggle = !nameToggle;
    if(nameToggle)
    {
        nameElem.style.setProperty("opacity", "0%");
        nameBackElem.style.setProperty("opacity", "100%");
        playAudio();
    }
    else
    {
        nameElem.style.setProperty("opacity", "100%");
        nameBackElem.style.setProperty("opacity", "0%");
        stopAudio();
    }
}

nameElem.onclick = nameClick;
//NameClick End

//Logo
logoAmount = 6;
document.getElementsByTagName("topbar")[0].getElementsByTagName("img")[0].setAttribute("src", "/assets/logowhite.png");

function logoClick()
{
    randInt = Math.ceil(Math.random() * logoAmount);
    while ("/assets/logo"+randInt+".png" == document.getElementsByTagName("topbar")[1].getElementsByTagName("img")[0].getAttribute("src"))
    {
        randInt = Math.ceil(Math.random() * logoAmount);
    }
    document.getElementsByTagName("topbar")[1].getElementsByTagName("img")[0].setAttribute("src", "/assets/logo"+randInt+".png");
}

logoClick();

document.getElementsByTagName("topbar")[1].getElementsByTagName("img")[0].onclick = logoClick;
//Logo End

//Tooltips
enabledTooltips = [];
function tooltip(obj, parent, text, align)
{
    var anim;
    let tooltipElem = document.createElement("tooltip");
    tooltipElem.innerHTML = text;
    parent.append(tooltipElem);

    function enableTooltip()
    {
        tooltipElem.classList.remove("hidden");
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
        tooltipElem.style.setProperty("--visibility", "1");
        clearInterval(anim);
        anim = setInterval(animFunc, 5);
    }

    function disableTooltip()
    {
        tooltipElem.style.setProperty("--visibility", "0");
        clearInterval(anim);
        anim = setInterval(animFunc, 5);
    }

    function animFunc()
    {
        alpha = 0.2;
        opacity = Number(tooltipElem.style.getPropertyValue("opacity"));
        visibility = Number(tooltipElem.style.getPropertyValue("--visibility"));
        opacity = opacity + alpha * (visibility - opacity);
        tooltipElem.style.setProperty("opacity", opacity);
        if(opacity > 0.9 || opacity < 0.1)
        {
            tooltipElem.style.setProperty("opacity", visibility);
            if(opacity < 0.1)
            {
                tooltipElem.classList.add("hidden");
            }
            clearInterval(anim);
        }
    }

    obj.onmouseover = enableTooltip;
    obj.onfocus = enableTooltip;
    obj.onmouseout = disableTooltip;
    disableTooltip();
}
tooltip(document.getElementsByTagName("heading")[1].getElementsByTagName("span")[0], document.getElementById("background"), "<span style = \"left: 1vw\">Welcome to my website!</span>", "right");
tooltip(document.getElementsByTagName("heading")[1].getElementsByTagName("span")[1], document.getElementById("foreground"), "<img style = \"height: 18vh; left: 1vw; top: -9vh; border-radius: 50%; background: radial-gradient(#ffffff, #00000000 80%)\" src = \"/assets/wave.png\"/>", "right");
//Tooltips End

//Status
function updateStatus(data)
{
    twitch = false;
    hasActivity = false;
    if(data["discord_status"] == "online")
    {
        document.documentElement.style.setProperty("--statusColor", "green");
        data["activities"].forEach(activity => {
            if(activity.name == "Twitch")
            {
                twitch = true;
                hasActivity = true;
                string = "Streaming " +  activity.state + " on Twitch: " + activity.details;
                document.documentElement.style.setProperty("--statusColor", "purple");
            }
            if(!twitch)
            {
                if(hasActivity)
                {
                    string += " and on ";
                }
                else
                {
                    hasActivity = true;
                    string = "Online on Discord: ";
                }
                if(activity.name == "Custom Status")
                {
                    
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
            }
        });
        if(!hasActivity)
        {
            string = data["discord_status"] + " on Discord";
        }
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
    document.getElementsByTagName("statusbar")[0].innerHTML = "<indicator></indicator><p>"+string.charAt(0).toUpperCase() + string.slice(1) + "</p>";
    document.getElementsByTagName("statusbar")[1].innerHTML = "<indicator></indicator><p>"+string.charAt(0).toUpperCase() + string.slice(1) + "</p>";
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
document.getElementsByTagName("socials")[1].innerHTML = "Unable to fetch data.";

fetch("https://zoxplers.com/home/socials").then(response => {
    response.text().then(content => {
        document.getElementsByTagName("socials")[1].innerHTML = content;
        Array.from(document.getElementsByTagName("socials")[1].children).forEach(socialItem => {
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

//Page
/*
current = 0;
function toggleItems()
{
    Array.from(document.getElementsByTagName("page")[0].children).forEach(item => {
        item.style.setProperty("opacity", "0%");
    });
    Array.from(document.getElementsByTagName("page")[1].children).forEach(item => {
        item.style.setProperty("opacity", "0%");
    });
    document.getElementsByTagName("page")[0].children[current].style.setProperty("opacity", "100%");
    document.getElementsByTagName("page")[1].children[current].style.setProperty("opacity", "100%");
    current++;
    if(current >= document.getElementsByTagName("page")[0].children.length)
    {
        current = 0;
    }
}

toggleItems();
setInterval(toggleItems, 6969);
*/
//Page End

//InfoItems
/*
for (i = 0; i < document.getElementsByTagName("infobar")[1].children.length; i++)
{
    document.getElementsByTagName("infobar")[1].children[i].onmouseover = function()
    {
        document.getElementsByTagName("infobar")[0].children.item(i).style.setProperty("hoverColor", white);
    }
}
*/

Array.from(document.getElementsByTagName("infobar")[1].children).forEach(infoItem => {
    infoItem.onmouseover = function()
    {
        document.getElementsByTagName("infobar")[0].children[Array.from(document.getElementsByTagName("infobar")[1].children).indexOf(infoItem)].style.setProperty("--hoverColor", "white");
    }
    infoItem.onmouseout = function()
    {
        document.getElementsByTagName("infobar")[0].children[Array.from(document.getElementsByTagName("infobar")[1].children).indexOf(infoItem)].style.setProperty("--hoverColor", "black");
    }
});
// InfoItems End