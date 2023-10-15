/*Made by Zoxplers*/

//URL Parse
showHidden = false;

document.URL.split('?').forEach(function(i)
{
    if(i.toLowerCase() === "showhidden=true" || i.toLowerCase() === "showhidden")
    {
        showHidden = true;
    }
});
//URL Parse End

//Tooltips
tooltipElem = document.getElementsByTagName("tooltip")[0];
enabledTooltips = [];
function tooltip(obj, text, align)
{
    function enableTooltip()
    {
        if(align == "right")
        {
            objRect = obj.getBoundingClientRect();
            tooltipElem.innerHTML = text;
            tooltipElem.style = "top: calc(" + (objRect.top + (objRect.bottom - objRect.top) /2) + "px - 7vh);";
        }
        else
        {
            objRect = obj.getBoundingClientRect();
            objRect.top = objRect.top < 0 ? 0 : objRect.top;
            tooltipElem.innerHTML = text;
            tooltipElem.style = "top: calc(" + objRect.top + "px - var(--fontSize) - 7vh); left: calc(" + (objRect.left - (tooltipElem.getBoundingClientRect().right - tooltipElem.getBoundingClientRect().left - (objRect.right - objRect.left)) / 2) + "px - 23vw);";
        }
    }

    obj.onmouseover = enableTooltip;
    obj.onfocus = enableTooltip;
    obj.onmouseout = function()
    {
        tooltipElem.innerHTML = "";
    }
}
tooltip(document.getElementById("midground").getElementsByTagName("heading")[0].getElementsByTagName("line")[0], "Welcome to my website!", "right");

//Tooltips End

//Resize
resize = false;

function resizeBody()
{
    if(window.innerHeight > window.innerWidth)
    {
        document.getElementsByTagName("mainbg")[0].className = "portrait";
        document.documentElement.style.setProperty("--headingSize", "10vw");
        document.documentElement.style.setProperty("--fontSize", "max(2.1vw, 2.15vh, 16px)");
    }
    else
    {
        document.getElementsByTagName("mainbg")[0].className = "landscape";
        document.documentElement.style.setProperty("--headingSize", "10vh");
        document.documentElement.style.setProperty("--fontSize", "max(1.1vw, 2.1vh, 22px)");
    }
}

resizeBody();

window.addEventListener("resize", function()
{
    clearTimeout(resize);
    resize = setTimeout(resizeBody, 250);
});
//Resize End

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

Array.from(document.getElementsByTagName("audio")).forEach(audio => 
{
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
//AudioEnd

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
        document.getElementById("midground").prepend(nameElem);
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
    while ("../assets/logo"+randInt+".png" == document.getElementsByTagName("logo")[1].children.item(0).getAttribute("src"))
    {
        randInt = Math.ceil(Math.random() * logoAmount);
    }
    document.getElementsByTagName("logo")[1].children.item(0).setAttribute("src", "../assets/logo"+randInt+".png");
}

logoClick();

document.getElementsByTagName("logo")[0].onclick = logoClick;
//Logo End

//Status
function updateStatus(data)
{
    if(data["discord_status"] == "online")
    {
        string = data["discord_status"];
        data["activities"].forEach(activity => string += " on " + activity.name);
        string = string == data["discord_status"] ? data["discord_status"] + " on Discord" : string;
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
document.getElementsByTagName("socials")[0].innerHTML = "Unable to fetch data.";

fetch("https://zoxplers.com/home/socials").then(response => {
    response.text().then(content => {
        document.getElementsByTagName("socials")[0].innerHTML = content;
        Array.from(document.getElementsByTagName("socials")[0].children).forEach(socialItem =>
        {
            socialImage = document.createElement("img");
            socialImage.setAttribute("src", "../assets/"+socialItem.getAttribute("src"));
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
                tooltip(socialItem, socialItem.getAttribute("text"));
            }
        })
    });
});
//Socials End