/*Made by Zoxplers*/

//Background
document.body.style.animationDelay = Math.floor(Math.random() * -parseInt(getComputedStyle(document.body).animationDuration)) + "s";
document.body.style.background = "no-repeat linear-gradient(to bottom left, var(--nako), var(--chaeyeon), var(--chaewon), var(--yujin), var(--minju), var(--sakura), var(--hitomi), var(--yena), var(--yuri), var(--hyewon), var(--wonyoung), var(--eunbi), var(--eunbi),var(--wonyoung), var(--hyewon), var(--yuri), var(--yena), var(--hitomi), var(--sakura), var(--minju), var(--yujin), var(--chaewon), var(--chaeyeon), var(--nako), var(--nako), var(--chaeyeon), var(--chaewon), var(--yujin), var(--minju), var(--sakura), var(--hitomi), var(--yena), var(--yuri), var(--hyewon), var(--wonyoung), var(--eunbi))";
document.body.style.backgroundSize = "316% 316%"; //Random numbers?
//Background End

//Resize
resize = false;

function resizeBody()
{
    if(window.innerHeight > (window.innerWidth * 0.74))
    {
        Array.from(document.getElementsByTagName("main")).forEach(main => {
            main.className = "portrait";
        });
    }
    else
    {
        Array.from(document.getElementsByTagName("main")).forEach(main => {
            main.className = "landscape";
        });
    }
}
//Resize End

resizeBody();

window.addEventListener("resize", function()
{
    clearTimeout(resize);
    resize = setTimeout(resizeBody, 250);
});
//Resize End

//Title
if(window.location.protocol == "http:" || window.location.protocol == "https:")
{
    document.title = "Zoxplers - " + window.location.pathname.split("/")[1].charAt(0).toUpperCase() + window.location.pathname.split("/")[1].slice(1);
}
//Title End

//HomeButton
document.body.innerHTML = "<homebutton><span class=\"material-symbols-outlined\">House</span><a href=\"/\">       Home </a></homebutton>" + document.body.innerHTML;
//HomeButton End

//AssetsFix
function assetsFix()
{
    //if(window.location.protocol != "https:" || window.location.protocol != "http:")
    Array.from(document.body.getElementsByTagName("*")).forEach(element => {
        if(element.getAttribute("src") != null && element.getAttribute("src").substring(0, 8) == "/assets/")
        {
            element.setAttribute("src", "https://zoxplers.com" + element.getAttribute("src"));
        }
    });
}

function loadAssets()
{
    assetsFix();
}
//AssetsFix End