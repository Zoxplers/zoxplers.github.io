/* Made by Zoxplers */

// Background
document.body.style.animationDelay = Math.floor(Math.random() * -parseInt(getComputedStyle(document.body).animationDuration)) + "s";
document.body.style.background = "no-repeat linear-gradient(to bottom left, var(--nako), var(--chaeyeon), var(--chaewon), var(--yujin), var(--minju), var(--sakura), var(--hitomi), var(--yena), var(--yuri), var(--hyewon), var(--wonyoung), var(--eunbi), var(--eunbi),var(--wonyoung), var(--hyewon), var(--yuri), var(--yena), var(--hitomi), var(--sakura), var(--minju), var(--yujin), var(--chaewon), var(--chaeyeon), var(--nako), var(--nako), var(--chaeyeon), var(--chaewon), var(--yujin), var(--minju), var(--sakura), var(--hitomi), var(--yena), var(--yuri), var(--hyewon), var(--wonyoung), var(--eunbi))";
document.body.style.backgroundSize = "316% 316%"; //Random numbers?
// Background End

// HomeButton
document.body.innerHTML = "<homebutton><span class=\"material-symbols-outlined\">House</span><a href=\"/\">Home</a></homebutton>" + document.body.innerHTML;
// HomeButton End

// Main
let background = document.getElementById("background");
let foreground = document.getElementById("foreground");
foreground.addEventListener("scroll", e => {
    background.scrollTop = foreground.scrollTop
    background.scrollLeft = foreground.scrollLeft
});
// Main End

// Resize
resize = false;
function resizeBody()
{
    if(window.innerHeight > (window.innerWidth * 0.74))
    {
        Array.from(document.getElementsByTagName("main")).forEach(main => {
            main.className = "portrait";
        });
        document.getElementsByTagName("homebutton")[0].style = "left: 1vw; top: 0;";
    }
    else
    {
        Array.from(document.getElementsByTagName("main")).forEach(main => {
            main.className = "landscape";
        });
        document.getElementsByTagName("homebutton")[0].style = "left: 0; top: 1vh;";
    }
}

resizeBody();

window.addEventListener("resize", function()
{
    clearTimeout(resize);
    resize = setTimeout(resizeBody, 250);
});
// Resize End

// Title
if(window.location.protocol == "http:" || window.location.protocol == "https:")
{
    document.title = "Zoxplers - " + window.location.pathname.split("/")[1].charAt(0).toUpperCase() + window.location.pathname.split("/")[1].slice(1);
}
// Title End

// Tooltips
function tooltip(obj, backgroundBool, text, align)
{
    var anim;
    let tooltipElem = document.createElement("tooltip");
    tooltipElem.innerHTML = text;
    (backgroundBool ? background : foreground).append(tooltipElem);

    function enableTooltip()
    {
        tooltipElem.classList.remove("hidden");
        objRect = obj.getBoundingClientRect();
        if(align == "left")
        {
            tooltipElem.style.setProperty("left", (objRect.left - tooltipElem.offsetWidth) + "px");
            tooltipElem.style.setProperty("top", objRect.top + "px");
        }
        else if(align == "right")
        {
            tooltipElem.style.setProperty("left", objRect.right + "px");
            tooltipElem.style.setProperty("top", objRect.top + "px");
        }
        else if(align == "top")
        {
            tooltipElem.style.setProperty("left", (objRect.left + objRect.width / 2 - tooltipElem.offsetWidth / 2) + "px");
            tooltipElem.style.setProperty("top", (objRect.top - tooltipElem.offsetHeight) + "px");
        }
        else if(align == "bottom")
        {
            tooltipElem.style.setProperty("left", (objRect.left + objRect.width / 2 - tooltipElem.offsetWidth / 2) + "px");
            tooltipElem.style.setProperty("top", objRect.bottom + "px");
        }
        else
        {
            tooltipElem.style.setProperty("left", objRect.left + "px");
            tooltipElem.style.setProperty("top", objRect.top + "px");
        }
        tooltipElem.style.setProperty("--visibility", "1");
        clearInterval(anim);
        anim = setInterval(animFunc, 5);
    }

    function disableTooltip()
    {
        tooltipElem.style.setProperty("--visibility", "0");
        clearInterval(anim);
        anim = setInterval(animFunc, 5);
    }

    function animFunc()
    {
        alpha = 0.2;
        opacity = Number(tooltipElem.style.getPropertyValue("opacity"));
        visibility = Number(tooltipElem.style.getPropertyValue("--visibility"));
        opacity = opacity + alpha * (visibility - opacity);
        tooltipElem.style.setProperty("opacity", opacity);
        if(opacity > 0.9 || opacity < 0.1)
        {
            tooltipElem.style.setProperty("opacity", visibility);
            if(opacity < 0.1)
            {
                tooltipElem.classList.add("hidden");
            }
            clearInterval(anim);
        }
    }

    obj.onmouseover = enableTooltip;
    obj.onfocus = enableTooltip;
    obj.onmouseout = disableTooltip;
    disableTooltip();
}
// Tooltips End