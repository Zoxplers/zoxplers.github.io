/*Made by Zoxplers*/

//DiscordInvites
document.getElementById("background").innerHTML = "";
inviteCodes = ["NPmFdsn", "FaJmtnJ"];
backgroundElems = [];
foregroundElems = [];
inviteCodes.forEach(invite => {
    fetch("https://discordapp.com/api/v9/invites/" + invite)
    .then((response) => response.json())
    .then((data) => 
    {
        backgroundElems[inviteCodes.indexOf(invite)] = "<br/> " + data.guild.name + "<br/>";
        foregroundElems[inviteCodes.indexOf(invite)] = "<br/><a href=\"https://discord.com/invite/" + invite + "\"> Join the <span>" + data.guild.name + "</span> Discord </a><br/>";
    });
});

backgroundElems.forEach(backgroundElem => {
    document.getElementById("background").innerHTML += backgroundElem;
});

foregroundElem.forEach(foregroundElem => {
    document.getElementById("foreground").innerHTML += foregroundElem;
});
//DiscordInvites End