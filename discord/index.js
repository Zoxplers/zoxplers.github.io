/*Made by Zoxplers*/

//DiscordInvites

document.getElementById("background").innerHTML = "";
inviteCodes = ["NPmFdsn", "FaJmtnJ"];
invitesRemaining = inviteCodes.length;
backgroundElems = [];
foregroundElems = [];

function finishedLoading()
{
    backgroundElems.forEach(backgroundElem => {
        document.getElementById("background").innerHTML += backgroundElem;
    });

    foregroundElems.forEach(foregroundElem => {
        document.getElementById("foreground").innerHTML += foregroundElem;
    });
}

inviteCodes.forEach(invite => {
    fetch("https://discordapp.com/api/v9/invites/" + invite)
    .then((response) => response.json())
    .then((data) => 
    {
        backgroundElems[inviteCodes.indexOf(invite)] = "<br/> " + data.guild.name + "<br/>";
        foregroundElems[inviteCodes.indexOf(invite)] = "<br/><a href=\"https://discord.com/invite/" + invite + "\"> Join the <span>" + data.guild.name + "</span> Discord </a><br/>";
        invitesRemaining -= 1;
        if(invitesRemaining == 0)
        {
            finishedLoading();
        }
    });
});


//DiscordInvites End