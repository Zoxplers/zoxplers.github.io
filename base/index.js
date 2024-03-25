/*Made by Zoxplers*/

//Background
document.body.style.animationDelay = Math.floor(Math.random() * -parseInt(getComputedStyle(document.body).animationDuration)) + "s";
document.body.style.background = "no-repeat linear-gradient(to bottom left, var(--nako), var(--chaeyeon), var(--chaewon), var(--yujin), var(--minju), var(--sakura), var(--hitomi), var(--yena), var(--yuri), var(--hyewon), var(--wonyoung), var(--eunbi), var(--eunbi),var(--wonyoung), var(--hyewon), var(--yuri), var(--yena), var(--hitomi), var(--sakura), var(--minju), var(--yujin), var(--chaewon), var(--chaeyeon), var(--nako), var(--nako), var(--chaeyeon), var(--chaewon), var(--yujin), var(--minju), var(--sakura), var(--hitomi), var(--yena), var(--yuri), var(--hyewon), var(--wonyoung), var(--eunbi))";
document.body.style.backgroundSize = "316% 316%"; //Random numbers?

//Resize
resize = false;

function resizeBody()
{
    if(window.innerHeight > window.innerWidth)
    {
        Array.from(document.getElementsByTagName("main")).forEach(main =>
        {
            main.className = "portrait";
        });
    }
    else
    {
        Array.from(document.getElementsByTagName("main")).forEach(main =>
        {
            main.className = "landscape";
        });
    }
}

resizeBody();

window.addEventListener("resize", function()
{
    clearTimeout(resize);
    resize = setTimeout(resizeBody, 250);
});
//Resize End