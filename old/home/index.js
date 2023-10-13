/*Made by Zoxplers*/

//Variables
subheaders = ["omgitsasubheader","verycoolsubheader","subheadergoeshere","justanotherpersonalsite"];
showHidden = false;
altColors = false;

//Parse URL
document.URL.split('?').forEach(function(i)
{
    if(i.toLowerCase() === "showhidden=true" || i.toLowerCase() === "showhidden")
    {
        showHidden = true;
    }
    else if(i.toLowerCase() === "altcolors=true" || i.toLowerCase() ==="altcolors")
    {
        altColors = true;
    }
});

//Generate subheader
document.getElementsByTagName("heading2")[0].innerHTML = subheaders[Math.floor(Math.random() * subheaders.length)]

//Tracker
document.getElementsByTagName("iframe")[0].onload = function() {document.getElementsByTagName("iframe")[0].remove();};

//Pages handler
Array.from(document.getElementsByTagName("pages")[0].children).forEach(page => {
    //Navbar buttons
    let button = document.createElement("a");
    button.onclick = function(){pageSelect(page, button);};
    button.innerHTML = "<span class = \"material-symbols-rounded\">" + page.getAttribute("icon") + "</span>\n<span>"+page.getAttribute("name") + "</span>";
    document.getElementsByTagName("navbar")[0].appendChild(button);

    //Page content
    page.innerHTML = "Unable to fetch data.";
    fetch("http://zoxplers.com/old/home/"+page.tagName.toLowerCase()).then(response => {
        response.text().then(content => {
            page.innerHTML = showHidden ? content.replace("<!--","").replace("-->","") : content;
            Array.from(page.getElementsByClassName("image")).forEach(element => {
                //fix line below
                element.style = "margin-top: 10px; height: 30px; padding: 3px 0 0 50px; display: inline-block; background: url(\"../images/"+element.id+"\") no-repeat;";
                element.style.backgroundSize = parseInt(element.style.paddingLeft)-20+"px";
            });
        })
    });
});

//Selection bar
function moveSelBar()
{
    document.getElementsByTagName("navbar")[0].style.setProperty("--selectBarX", selectedButton.getBoundingClientRect().left-3 + "px");
    document.getElementsByTagName("navbar")[0].style.setProperty("--selectBarY", selectedButton.getBoundingClientRect().bottom + "px");
    document.getElementsByTagName("navbar")[0].style.setProperty("--selectBarW", selectedButton.getBoundingClientRect().width+10 + "px");
    document.getElementsByTagName("navbar")[0].style.setProperty("--selectBarH", "1px");
}

function pageSelect(page, button)
{
    Array.from(document.getElementsByTagName("pages")[0].children).forEach(element => {
        element.style.display = "none";
    });
    Array.from(document.getElementsByTagName("navbar")[0].children).forEach(element => {
        element.style.color = null;
        
    });

    button.style.color = "var(--yuri)";
    button.style.textShadow = "unset";
    page.style.display = "initial";
    selectedButton = button;    
    moveSelBar();
}

pageSelect(document.getElementsByTagName("pages")[0].firstElementChild, document.getElementsByTagName("navbar")[0].firstElementChild);

//Resize function
window.onresize = function()
{
    moveSelBar();
};

//Load function
window.onload = function()
{
    moveSelBar();
};