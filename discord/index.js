/*Made by Zoxplers*/

//DiscordInvites
background.innerHTML = "";
let invites = ["NPmFdsn", "FaJmtnJ"];
let invitesRemaining = invites.length;


for(let i = 0; i < invites.length; i++)
{
    fetch("https://discordapp.com/api/v9/invites/" + invites[i])
    .then((response) => response.json())
    .then((data) => {
        background.innerHTML += "<a href=\"https://discord.com/invite/" + invites[i] + "\"><text>Join the </text><span>" + data.guild.name + "</span><text> discord.</text></a>";
        invitesRemaining--;
        if(invitesRemaining < 1)
        {
            background.innerHTML = "<div class=\"flexspacer\"></div>" + background.innerHTML;
            background.innerHTML += "<div class=\"flexspacer\"></div>";
            foreground.innerHTML = background.innerHTML;
        }
    });
}