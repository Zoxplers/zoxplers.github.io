/*Made by Zoxplers*/
resize = false;
toggles = [];
logoAmount = 6;

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
        document.getElementsByTagName("name")[0].onresize = function()
        {
            console.log("A");
        }
    }
};

resizeBody();

window.addEventListener("resize", function()
{
    clearTimeout(resize);
    resize = setTimeout(resizeBody, 250);
});

document.getElementsByTagName("text")[0].onclick = function()
{
    if(toggles.includes(document.getElementsByTagName("text")[0]))
    {
        document.getElementsByTagName("name")[0].style.removeProperty("mix-blend-mode");
        document.getElementsByTagName("text")[0].style.removeProperty("text-shadow");
        document.getElementsByTagName("text")[0].style.removeProperty("color");
        toggles.splice(toggles.indexOf(document.getElementsByTagName("text")[0]));
    }
    else
    {
        document.getElementsByTagName("name")[0].style.setProperty("mix-blend-mode", "multiply");
        document.getElementsByTagName("text")[0].style.setProperty("text-shadow", "0 0 3px white");
        document.getElementsByTagName("text")[0].style.setProperty("color", "white");
        toggles.push(document.getElementsByTagName("text")[0])
    }
};

document.getElementsByTagName("logo")[0].children.item(1).setAttribute("src", "../assets/logo"+Math.ceil(Math.random() * logoAmount)+".png");