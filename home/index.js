/*Made by Matthew Amurao*/

//Change all id to tagname patch
zwebsite = 
import("../zwebsite.json").then(dialog => dialog.show()).catch(err => console.log(err));

document.body.querySelectorAll("*").forEach(function(node)
{
    node.id = node.tagName.toLowerCase();
});

subheaders = ["omgitsasubheader","verycoolsubheader","subheadergoeshere","justanotherpersonalsite"];
page = 0;
cache = 0;
lockHeading = true;

if(lockHeading)
{
    document.body.insertBefore(document.getElementById("heading"), document.getElementById("main"));
    document.body.insertBefore(document.getElementById("navbar"), document.getElementById("main"));
}

document.getElementById("heading2").innerHTML = subheaders[Math.floor(Math.random() * subheaders.length)]

//Handle pages
function loadPage(page, data)
{
    page.innerHTML = data;
    Array.from(page.getElementsByClassName("image")).forEach(element => {
        element.style = "font-size: initial; text-align: right; padding-left: 40px; display: inline-block; background: url(\"../images/"+element.id+"\") no-repeat;";
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
try{
    sites.forEach(site => {
        cache = document.createElement("a");
        cache.innerHTML = site;
        cache.style.display = "none";
        document.getElementById("navmenu").appendChild(cache);
    });
}
catch(err)
{
    console.log(err);
}

document.getElementById("navmenu").addEventListener("click", function() {
    this.classList.toggle("animate");
});


/*
Array.from(document.getElementById("navmenu").children).forEach(element => {
    element.style.display = "none";
})
document.getElementById("titlebar").style.display = null;

function siteSelect(site)
{

}

document.getElementById("navmenu").addEventListener("click", function() {
    Array.from(document.getElementById("navmenu").children).forEach(element => {
        element.style.display = element.style.display == "none" ? null : "none";
    })
});
*/