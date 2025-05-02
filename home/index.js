/*Made by Zoxplers*/

//Main Patch
foreground.innerHTML = background.innerHTML;

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
document.getElementsByTagName("topbar")[0].getElementsByTagName("img")[0].setAttribute("src", "/assets/home/logowhite.png");

function logoClick()
{
    randInt = Math.ceil(Math.random() * logoAmount);
    while ("/assets/home/logo"+randInt+".png" == document.getElementsByTagName("topbar")[1].getElementsByTagName("img")[0].getAttribute("src"))
    {
        randInt = Math.ceil(Math.random() * logoAmount);
    }
    document.getElementsByTagName("topbar")[1].getElementsByTagName("img")[0].setAttribute("src", "/assets/home/logo"+randInt+".png");
}

logoClick();

document.getElementsByTagName("topbar")[1].getElementsByTagName("img")[0].onclick = logoClick;
//Logo End

//NavItems
let navItems = Array.from(document.getElementsByTagName("navbar")[1].children);
for(let i = 0; i < navItems.length; i++)
{
    navItems[i].onmouseover = function()
    {
        document.getElementsByTagName("navbar")[0].children[i].classList.add("hover");
    }
    navItems[i].onmouseout = function()
    {
        document.getElementsByTagName("navbar")[0].children[i].classList.remove("hover");
    }
}
//NavItems End

//Status
function updateStatus(data)
{
    console.log(data);
    let twitch = false;
    let hasActivity = false;
    let string = "<text>";
    if(data["discord_status"] == "online")
    {
        document.documentElement.style.setProperty("--statusColor", "green");
        data["activities"].forEach(activity => {
            if(activity.name == "Twitch")
            {
                twitch = true;
                hasActivity = true;
                string += "Streaming " +  activity.state + " on Twitch: " + activity.details;
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
                    string += "Online on Discord: ";
                }
                if(activity.name == "Custom Status")
                {
                    
                    if(activity.hasOwnProperty("emoji"))
                    {
                        if(activity["emoji"].hasOwnProperty("id"))
                        {
                            string += "</text><img src=\"https://cdn.discordapp.com/emojis/" + activity["emoji"]["id"] + "?size=56\"\/><text>"
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
            string += data["discord_status"] + " on Discord";
        }
    }
    else if(data["discord_status"] == "dnd")
    {
        string += "Do Not Disturb";
        document.documentElement.style.setProperty("--statusColor", "red");
    }
    else
    {
        let status = data["discord_status"];
        string += status.charAt(0).toUpperCase() + status.slice(1);
        document.documentElement.style.setProperty("--statusColor", "white");
        if(status == "idle")
        {
            document.documentElement.style.setProperty("--statusColor", "orange");
        }
    }
    document.getElementsByTagName("statusbar")[0].getElementsByTagName("label")[0].innerHTML = string + "</text>";
    document.getElementsByTagName("statusbar")[1].getElementsByTagName("label")[0].innerHTML = string + "</text>";
}


lanyard(
{
    userId: "224288033950662656",
    socket: true,
    onPresenceUpdate: updateStatus
})
//Status End

//Socials
//Switch icons to npm package at some point
fetch("./socials.json").then(response => {
    response.json().then(content => {
        let socials = document.getElementsByTagName("socials")[1];
        socials.innerHTML = "";
        content["socialitems"].forEach(socialItem => {
            socials.innerHTML += 
            `<socialitem class="${socialItem["classlist"]}" href="${socialItem["href"]}" text="${socialItem["text"]}">
                ${socialItem["icon"] ? "<img src="+ socialItem["icon"] +" />" : socialItem}
            </socialitem>`;
        });

        Array.from(socials.children).forEach(socialItem => {
            if(showHidden)
            {
                socialItem.classList.remove("hidden");
            }
            if(socialItem.getAttribute("href") != null)
            {
                socialItem.onclick = function()
                {
                    window.open(socialItem.getAttribute("href"));
                }
            }
            tooltip(socialItem, background, `<span style = "top: -1vh; vertical-align: text-top;">${socialItem.getAttribute("text")} </span>`, "bottom");
        });
        document.getElementsByTagName("socials")[0].innerHTML = socials.innerHTML;
    });
})
//Socials End


//Tooltips
tooltip(document.getElementsByTagName("heading")[1].getElementsByTagName("span")[0], true, `<span style = "top: -0.3vh; left: 1vw;">Welcome to my website!</span>`, "right");
tooltip(document.getElementsByTagName("heading")[1].getElementsByTagName("span")[1], false, `<img style = "height: 18vh; left: 1vw; top: -9vh; border-radius: 50%; background: radial-gradient(#ffffff, #00000000 80%)" src="/assets/home/wave.png"/>`, "right");
//Tooltips End