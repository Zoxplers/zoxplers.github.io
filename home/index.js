/*Made by Zoxplers*/

//Resize
resize = false;

function resizeBody()
{
    if(window.innerHeight > window.innerWidth)
    {
        document.getElementsByTagName("mainbg")[0].className = "portrait";
        document.documentElement.style.setProperty("--headingSize", "10vw");
        document.documentElement.style.setProperty("font-size", "max(2vw, 2vh)");
    }
    else
    {
        document.getElementsByTagName("mainbg")[0].className = "landscape";
        document.documentElement.style.setProperty("--headingSize", "10vh");
        document.documentElement.style.setProperty("font-size", "max(1vw, 1.5vh)");
    }
}

resizeBody();

window.addEventListener("resize", function()
{
    clearTimeout(resize);
    resize = setTimeout(resizeBody, 250);
});
//Resize End

//NameClick
nameToggle = true;
nameElem = document.getElementsByTagName("name")[0];

function nameClick()
{
    nameToggle = !nameToggle;
    if(nameToggle)
    {
        document.getElementById("foreground").appendChild(nameElem).onclick = nameClick;
        nameElem.style.removeProperty("text-shadow");
        nameElem.style.removeProperty("color");
    }
    else
    {
        document.getElementById("midground").appendChild(nameElem).onclick = nameClick;
        nameElem.style.setProperty("text-shadow", "0 0 3px white");
        nameElem.style.setProperty("color", "white");
    }
}

nameElem.onclick = nameClick;
//NameClick End

//Logo
logoAmount = 6;

function logoClick()
{
    document.getElementsByTagName("logo")[1].children.item(0).setAttribute("src", "../assets/logo"+Math.ceil(Math.random() * logoAmount)+".png");
}

logoClick();

document.getElementsByTagName("logo")[0].onclick = logoClick;
//Logo End