/*Made by Zoxplers*/

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
    while ("../assets/logo"+randInt+".png" == document.getElementsByTagName("logo")[1].children.item(0).getAttribute("src"))
    {
        randInt = Math.ceil(Math.random() * logoAmount);
    }
    document.getElementsByTagName("logo")[1].children.item(0).setAttribute("src", "../assets/logo"+randInt+".png");
}

logoClick();

document.getElementsByTagName("logo")[0].onclick = logoClick;
//Logo End