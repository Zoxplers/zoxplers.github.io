/*Made by Zoxplers*/

document.getElementById("background").innerHTML = "";
inviteCodes = ["NPmFdsn", "FaJmtnJ"];
inviteCodes.forEach(invite => {
    fetch("https://discordapp.com/api/v9/invites/" + invite)
    .then((response) => response.json())
    .then((data) => 
    {
        document.getElementById("background").innerHTML += "<br/> " + data.guild.name + "<br/>";
        document.getElementById("foreground").innerHTML += "<br/><a href=\"https://discord.com/invite/" + invite + "\"> Join the <span>" + data.guild.name + "</span> Discord </a><br/>";
    });
});