/*Made by Zoxplers*/

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
Array.from(document.getElementsByTagName("audio")).forEach(audio => audio.volume = 0.2);
function playAudio()
{
    document.getElementById("audio3").play();
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


lanyard({
    userId: "224288033950662656",
    socket: true,
    onPresenceUpdate: updateStatus
})
//Status End