/*Made by Matthew Amurao*/
//Maybe add soundcloud and/or artstation? in projects
//Make website look better on phone with separate css activate via javascript and website useragent

//Change all id to tagname patch
document.body.querySelectorAll("*").forEach(function(node)
{
    node.id = node.tagName.toLowerCase();
});

//Variables
subheaders = ["omgitsasubheader","verycoolsubheader","subheadergoeshere","justanotherpersonalsite"];
page = 0;
cache = 0;
lockHeading = true, showHidden = false, altColors = false;

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

//Startup
if(lockHeading)
{
    document.body.insertBefore(document.getElementById("heading"), document.getElementById("main"));
    document.body.insertBefore(document.getElementById("navbar"), document.getElementById("main"));
}

if(altColors)
{
    document.getElementById("navmenu").style.backgroundColor = "var(--nakodark)";
    document.getElementById("navmenu").style.color = "var(--chaewon)";
}

document.getElementById("heading2").innerHTML = subheaders[Math.floor(Math.random() * subheaders.length)]
document.getElementById("iframe").onload = function() {document.getElementById("iframe").remove();};

//Handle pages
function loadPage(page, data)
{
    page.innerHTML = showHidden ? data.replace("<!--","").replace("-->","") : data;
    Array.from(page.getElementsByClassName("image")).forEach(element => {
        element.style = "margin: auto; height: 30px; padding: 3px 0 0 50px; display: inline-block; background: url(\"../images/"+element.id+"\") no-repeat;";
        element.style.backgroundSize = parseInt(element.style.paddingLeft)-20+"px";
    });
}

Array.from(document.getElementById("pages").children).forEach(element => {
    fetch(element.id).then(response => response.text()).then(textString => loadPage(element, textString)).catch(function() {
        fetch("http://zoxplers.com/home/"+element.id).then(response => response.text()).then(textString => loadPage(element, textString)).catch(function() {
            element.innerHTML = "Unable to fetch data.";
        });
    });
    page = document.createElement("a");
    page.onclick = function(){pageSelect(Array.from(document.getElementById("navbar").children).indexOf(this))};
    page.innerHTML = "<span style = \"padding: initial\" class = \"material-symbols-rounded\">" + element.getAttribute("icon") + "</span> " + element.getAttribute("name");
    document.getElementById("navbar").appendChild(page);
});

function pageSelect(page)
{
    Array.from(document.getElementById("navbar").children).forEach(element => {
        element.style.backgroundColor = "initial";
    });
    Array.from(document.getElementById("pages").children).forEach(element => {
        element.style.display = "none";
    });
    document.getElementById("pages").children.item(page).style.display = "initial";
    document.getElementById("navbar").children.item(page).style.backgroundColor = "var(--minjudarkT)";
}

pageSelect(page);

//Handle sites
async function loadSites()
{
    cache = await fetch("../zwebsite.json").then(response => response.json());
    try{
        cache.zwebsite.sites.forEach(site => {
            cache = document.createElement("a");
            cache.innerHTML = site;
            cache.style.display = "none";
            cache.onclick = function() {location.href = "../"+site.toLowerCase()};
            document.getElementById("navmenu").appendChild(cache);
        });
    }
    catch(err)
    {
        console.log(err);
    }
}
loadSites();

document.getElementById("navmenu").addEventListener("click", function() {
    this.classList.toggle("animate");
});