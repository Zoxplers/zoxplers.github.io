/*Made by Zoxplers*/

//DiscordInvites
document.getElementById("background").innerHTML = "";
let invites = ["NPmFdsn", "FaJmtnJ"];
let invitesRemaining = invites.length;


for(let i = 0; i < invites.length; i++)
{
    fetch("https://discordapp.com/api/v9/invites/" + invites[i])
    .then((response) => response.json())
    .then((data) => {
        document.getElementsByTagName("main")[0].innerHTML += "<a href=\"https://discord.com/invite/" + invites[i] + "\"><text>Join the </text><span>" + data.guild.name + "</span><text> discord.</text></a>";
        invitesRemaining--;
        if(invitesRemaining < 1)
        {
            document.getElementsByTagName("main")[0].innerHTML = "<div class=\"flexspacer\"></div>" + document.getElementsByTagName("main")[0].innerHTML;
            document.getElementsByTagName("main")[0].innerHTML += "<div class=\"flexspacer\"></div>";
            document.getElementsByTagName("main")[1].innerHTML = document.getElementsByTagName("main")[0].innerHTML;
        }
    });
}